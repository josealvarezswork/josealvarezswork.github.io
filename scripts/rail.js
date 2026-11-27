/* The project row on the home. It scrolls on its own without this file; the
   script only adds the two arrows and the line that shows where you are. */
(() => {
  const rail = document.querySelector('.rail');
  if (!rail) return;
  const track = rail.querySelector('.rail-track');
  const controls = rail.querySelector('.rail-controls');
  const line = rail.querySelector('.rail-line');
  const thumb = rail.querySelector('.rail-thumb');
  const [prev, next] = rail.querySelectorAll('.rail-btn');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  const update = () => {
    const room = track.scrollWidth - track.clientWidth;
    const fits = room <= 1;
    controls.hidden = fits;
    line.hidden = fits;
    if (fits) return;
    const size = track.clientWidth / track.scrollWidth;
    thumb.style.width = `${size * 100}%`;
    thumb.style.left = `${(track.scrollLeft / room) * (1 - size) * 100}%`;
    // aria-disabled, not disabled: a disabled button drops keyboard focus.
    prev.setAttribute('aria-disabled', String(track.scrollLeft <= 1));
    next.setAttribute('aria-disabled', String(track.scrollLeft >= room - 1));
  };

  rail.querySelectorAll('.rail-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-disabled') === 'true') return;
      const card = track.querySelector('.rail-card');
      const step = card.getBoundingClientRect().width + 24;
      track.scrollBy({ left: step * Number(button.dataset.rail), behavior: calm.matches ? 'auto' : 'smooth' });
    });
  });

  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
