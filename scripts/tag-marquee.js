/* Skill tags on a phone.
 *
 * At 375px the four skill groups wrap into three or four rows each and the
 * block runs 747px tall — most of a screen spent on a list nobody reads top
 * to bottom. Below 600px each group becomes a single row that moves on its
 * own instead.
 *
 * This runs as an enhancement, not a requirement: with the script blocked the
 * groups wrap exactly as they do today, which is the state this replaces, not
 * a broken one. Nothing here writes to the HTML files.
 *
 * Two modes, chosen by the visitor's own motion setting:
 *
 *   animated — the track carries the tags twice, the copy hidden from
 *     assistive tech, and travels exactly one set's width. The loop closes on
 *     an identical frame, so there is no jump. It stops while a finger or a
 *     pointer is on it.
 *
 *   still — no copy, no animation, just one row the visitor swipes. This is
 *     what prefers-reduced-motion gets. It solves the same stacking problem
 *     without anything moving by itself.
 *
 * The gap between tags is carried by a margin on each tag rather than by the
 * flex `gap`, because the animation travels one set's width: a trailing
 * margin makes that distance land the copy's first tag exactly where the
 * original's first tag was. A `gap` would leave the loop half a gap short.
 */
(function () {
  'use strict';

  var PHONE = '(max-width: 600px)';
  var STILL = '(prefers-reduced-motion: reduce)';
  var PX_PER_SECOND = 32;

  var phone = window.matchMedia(PHONE);
  var still = window.matchMedia(STILL);
  var groups = Array.prototype.slice.call(
    document.querySelectorAll('.skill-tags')
  );
  if (!groups.length) return;

  function build(group) {
    if (group.dataset.marquee) return;

    var track = document.createElement('div');
    track.className = 'skill-tags-track';
    while (group.firstChild) track.appendChild(group.firstChild);
    group.appendChild(track);

    group.dataset.marquee = still.matches ? 'still' : 'animated';

    if (still.matches) return;

    // One set's width, measured before the copy goes in.
    var width = track.scrollWidth;
    var copy = document.createDocumentFragment();
    for (var i = 0, tags = track.children; i < tags.length; i++) {
      var clone = tags[i].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      copy.appendChild(clone);
    }
    track.appendChild(copy);

    track.style.setProperty('--marquee-w', width + 'px');
    track.style.setProperty(
      '--marquee-dur',
      Math.round(width / PX_PER_SECOND) + 's'
    );
  }

  function tear(group) {
    if (!group.dataset.marquee) return;
    var track = group.firstElementChild;
    if (track && track.className === 'skill-tags-track') {
      for (var i = track.children.length - 1; i >= 0; i--) {
        if (track.children[i].getAttribute('aria-hidden') === 'true') {
          track.removeChild(track.children[i]);
        }
      }
      while (track.firstChild) group.insertBefore(track.firstChild, track);
      group.removeChild(track);
    }
    delete group.dataset.marquee;
  }

  /* WCAG 2.2.2 wants moving content the visitor can stop. Hover covers a
     mouse, and a finger down covers the phone this is actually built for —
     which is also the gesture someone makes to read one tag. */
  function holdToPause(group) {
    var pause = function () { group.dataset.held = ''; };
    var release = function () { delete group.dataset.held; };
    group.addEventListener('pointerdown', pause);
    group.addEventListener('pointerup', release);
    group.addEventListener('pointercancel', release);
    group.addEventListener('pointerleave', release);
  }

  groups.forEach(holdToPause);

  function sync() {
    groups.forEach(phone.matches ? build : tear);
  }

  sync();

  // Safari below 14 has addListener but not addEventListener here.
  ['change'].forEach(function (e) {
    if (phone.addEventListener) {
      phone.addEventListener(e, sync);
      still.addEventListener(e, function () {
        groups.forEach(tear);
        sync();
      });
    } else if (phone.addListener) {
      phone.addListener(sync);
      still.addListener(sync);
    }
  });
})();
