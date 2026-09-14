/* The Ø mark draws itself on load and again on hover.
   CSS alone cannot replay a finished animation, so the drawn state is the
   default and the class below is what runs the sequence. Removing it,
   forcing a reflow, and adding it back is what restarts the keyframes. */
(function () {
  var logo = document.querySelector('.brand-logo');
  if (!logo) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timer;

  function play() {
    if (reduced.matches) return;
    clearTimeout(timer);
    logo.classList.remove('is-drawing');
    void logo.offsetWidth;              // reflow, so the class re-add counts
    logo.classList.add('is-drawing');
    timer = setTimeout(function () {
      logo.classList.remove('is-drawing');
    }, 1500);                           // must outlast the longest delay+duration
  }

  play();
  var trigger = logo.closest('.brand') || logo;
  trigger.addEventListener('mouseenter', play);
  trigger.addEventListener('focus', play);
})();
