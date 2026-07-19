# Optimize portfolio images:
# - PNG > 500KB without real transparency -> JPEG q82 (max 1600px wide), delete PNG, update refs
# - PNG > 500KB with transparency -> resize to max 1000px wide, keep PNG
# - JPG > 400KB -> re-encode q82 (max 1600px wide) in place
# Run from repo root: powershell -File tools\optimize-images.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$imgRoot = Join-Path $root 'assets\img'

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

function Test-HasAlpha([System.Drawing.Bitmap]$bmp) {
  if (-not [System.Drawing.Image]::IsAlphaPixelFormat($bmp.PixelFormat)) { return $false }
  $stepX = [Math]::Max(1, [int][Math]::Floor($bmp.Width / 60))
  $stepY = [Math]::Max(1, [int][Math]::Floor($bmp.Height / 60))
  for ($y = 0; $y -lt $bmp.Height; $y += $stepY) {
    for ($x = 0; $x -lt $bmp.Width; $x += $stepX) {
      if ($bmp.GetPixel($x, $y).A -lt 250) { return $true }
    }
  }
  return $false
}

function New-ScaledBitmap([System.Drawing.Bitmap]$src, [int]$maxW, [bool]$opaque) {
  $w = $src.Width; $h = $src.Height
  if ($w -gt $maxW) { $h = [int][Math]::Round($h * ($maxW / $w)); $w = $maxW }
  $fmt = if ($opaque) { [System.Drawing.Imaging.PixelFormat]::Format24bppRgb } else { [System.Drawing.Imaging.PixelFormat]::Format32bppArgb }
  $dst = New-Object System.Drawing.Bitmap($w, $h, $fmt)
  $g = [System.Drawing.Graphics]::FromImage($dst)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  if ($opaque) { $g.Clear([System.Drawing.Color]::White) }
  $g.DrawImage($src, 0, 0, $w, $h)
  $g.Dispose()
  return $dst
}

$renames = @()
$savedTotal = 0

$pngs = Get-ChildItem $imgRoot -Recurse -Filter *.png |
  Where-Object { $_.Length -gt 500KB -and $_.FullName -notmatch 'duogit_backup' }

foreach ($f in $pngs) {
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $ms = New-Object System.IO.MemoryStream(,$bytes)
  $bmp = New-Object System.Drawing.Bitmap($ms)
  $hasAlpha = Test-HasAlpha $bmp
  $oldSize = $f.Length

  if (-not $hasAlpha) {
    $out = New-ScaledBitmap $bmp 1600 $true
    $newPath = [System.IO.Path]::ChangeExtension($f.FullName, '.jpg')
    $out.Save($newPath, $jpegCodec, $encParams)
    $out.Dispose(); $bmp.Dispose(); $ms.Dispose()
    Remove-Item $f.FullName -Force
    $rel = $f.FullName.Substring($imgRoot.Length + 1).Replace('\', '/')
    $renames += [pscustomobject]@{ Old = "img/$rel"; New = "img/$($rel -replace '\.png$', '.jpg')" }
    $newSize = (Get-Item $newPath).Length
    "{0}  PNG->JPG  {1:n0} KB -> {2:n0} KB" -f $rel, ($oldSize/1KB), ($newSize/1KB)
  }
  else {
    $out = New-ScaledBitmap $bmp 1000 $false
    $bmp.Dispose(); $ms.Dispose()
    $out.Save($f.FullName, [System.Drawing.Imaging.ImageFormat]::Png)
    $out.Dispose()
    $newSize = (Get-Item $f.FullName).Length
    $rel = $f.FullName.Substring($imgRoot.Length + 1).Replace('\', '/')
    "{0}  PNG resized  {1:n0} KB -> {2:n0} KB" -f $rel, ($oldSize/1KB), ($newSize/1KB)
  }
  $savedTotal += ($oldSize - $newSize)
}

$jpgs = Get-ChildItem $imgRoot -Recurse -Include *.jpg, *.jpeg -File |
  Where-Object { $_.Length -gt 400KB -and $_.FullName -notmatch 'duogit_backup' }

foreach ($f in $jpgs) {
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $ms = New-Object System.IO.MemoryStream(,$bytes)
  $bmp = New-Object System.Drawing.Bitmap($ms)
  $oldSize = $f.Length
  $out = New-ScaledBitmap $bmp 1600 $true
  $bmp.Dispose(); $ms.Dispose()
  $out.Save($f.FullName, $jpegCodec, $encParams)
  $out.Dispose()
  $newSize = (Get-Item $f.FullName).Length
  $rel = $f.FullName.Substring($imgRoot.Length + 1).Replace('\', '/')
  "{0}  JPG re-encoded  {1:n0} KB -> {2:n0} KB" -f $rel, ($oldSize/1KB), ($newSize/1KB)
  $savedTotal += ($oldSize - $newSize)
}

# Update references in html/json/js for renamed files
if ($renames.Count -gt 0) {
  $textFiles = Get-ChildItem $root -Recurse -Include *.html, *.json, *.js -File |
    Where-Object { $_.FullName -notmatch '\\\.git\\' }
  foreach ($tf in $textFiles) {
    $content = [System.IO.File]::ReadAllText($tf.FullName)
    $orig = $content
    foreach ($r in $renames) { $content = $content.Replace($r.Old, $r.New) }
    if ($content -ne $orig) {
      [System.IO.File]::WriteAllText($tf.FullName, $content)
      "refs updated: $($tf.FullName.Substring($root.Length + 1))"
    }
  }
}

""
"Total saved: {0:n1} MB" -f ($savedTotal/1MB)
