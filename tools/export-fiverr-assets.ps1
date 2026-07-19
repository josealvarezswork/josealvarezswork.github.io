$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Html = Join-Path $Root "fiverr-portfolio-assets.html"
$OutDir = Join-Path $Root "exports\fiverr-portfolio-assets"

New-Item -ItemType Directory -Force $OutDir | Out-Null

$Slides = @(
  "bymakers-01",
  "bymakers-02",
  "bymakers-03",
  "uxgen-01",
  "uxgen-02",
  "uxgen-03",
  "duogit-01",
  "duogit-02",
  "duogit-03"
)

$HtmlUrl = ([System.Uri]$Html).AbsoluteUri

foreach ($Slide in $Slides) {
  $Output = Join-Path $OutDir "$Slide.png"
  $Url = "$HtmlUrl`?slide=$Slide"
  npx playwright screenshot --viewport-size=1024,768 $Url $Output | Out-Host
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to export $Slide"
  }
}

Write-Host "Exported $($Slides.Count) Fiverr portfolio assets to:"
Write-Host $OutDir
