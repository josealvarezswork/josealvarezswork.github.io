/* Slot reveal.
 *
 * A slot is a named hole in a page: it states what has not been produced yet
 * and what it has to be. Visitors never see one. Slots appear only while
 * <html> carries data-slots="draft", which this sets.
 *
 *   <page>.html?draft=1   turn it on, and this machine remembers
 *   <page>.html?draft=0   forget it
 *
 * Load it in <head> WITHOUT defer, so a draft session never paints the live
 * page first and then pop the slots in. Every branch is wrapped: with storage
 * blocked — a private window, a locked-down browser — the page is simply the
 * live one, which is the correct failure.
 *
 * A visitor cannot reach the draft view by accident, and an empty slot is
 * never in the live layout's way: slots.css keeps them display:none.
 */
(function () {
  'use strict';
  try {
    var q = new URLSearchParams(location.search);
    if (q.has('draft')) {
      if (q.get('draft') === '0') localStorage.removeItem('jaDraft');
      else localStorage.setItem('jaDraft', '1');
    }
    if (localStorage.getItem('jaDraft')) {
      document.documentElement.setAttribute('data-slots', 'draft');
    }
  } catch (e) { /* no storage — stay live */ }
})();
