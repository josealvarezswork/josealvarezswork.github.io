/* The four ESA states advance on their own. On a phone they are one row that
   moves; on a wider screen all four stay in view and only the selection moves.
   Selecting is still app.js's job: this file presses the same cards. */
(() => {
  const track = document.querySelector('.esa-cycle');
  const panel = document.querySelector('.esa-panel');
  const cards = track ? [...track.querySelectorAll('.esa-card')] : [];
  if (!panel || cards.length < 2) return;

  const WAIT = 10000;           // one state takes about this long to read
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const spanish = document.documentElement.lang.startsWith('es');
  const words = spanish
    ? { play: 'Reproducir', pause: 'Pausar', show: 'Ver estado' }
    : { play: 'Play', pause: 'Pause', show: 'Show state' };

  const controls = document.createElement('div');
  controls.className = 'esa-controls';
  controls.innerHTML = '<div class="esa-dots"></div><button type="button" class="esa-play"></button>';
  track.after(controls);
  const play = controls.querySelector('.esa-play');
  const dots = cards.map((card, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'esa-dot';
    dot.dataset.state = card.dataset.state;
    dot.setAttribute('aria-label', `${words.show}: ${card.querySelector('.esa-caption').textContent.trim()}`);
    dot.addEventListener('click', () => { stop(); go(i); });
    controls.querySelector('.esa-dots').append(dot);
    return dot;
  });

  let current = Math.max(0, cards.findIndex((card) => card.classList.contains('is-active')));
  let stopped = calm.matches;   // by the visitor, or by their motion setting
  let hovered = false;
  let focused = false;
  let visible = false;
  let touched = false;
  let timer = null;
  let settle = null;

  const slides = () => track.scrollWidth > track.clientWidth + 1;

  const mark = (i) => {
    current = i;
    dots.forEach((dot, n) => dot.setAttribute('aria-current', String(n === i)));
  };

  const centre = (card, smooth) => {
    if (!slides()) return;
    const t = track.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    track.scrollTo({
      left: track.scrollLeft + (c.left - t.left) - (t.width - c.width) / 2,
      behavior: smooth && !calm.matches ? 'smooth' : 'auto',
    });
  };

  function go(i, move = true) {
    cards[i].click();
    mark(i);
    if (move) centre(cards[i], true);
  }

  function schedule() {
    clearTimeout(timer);
    const running = !stopped && !hovered && !focused && visible && !document.hidden;
    // A panel that changes by itself must not talk over a screen reader.
    panel.setAttribute('aria-live', stopped ? 'polite' : 'off');
    play.textContent = stopped ? words.play : words.pause;
    if (running) timer = setTimeout(() => { go((current + 1) % cards.length); schedule(); }, WAIT);
  }

  function stop() { stopped = true; schedule(); }

  play.addEventListener('click', () => { stopped = !stopped; touched = false; schedule(); });

  // A real press hands the row to the visitor. card.click() above is not trusted.
  cards.forEach((card, i) => card.addEventListener('click', (event) => {
    if (!event.isTrusted) return;
    mark(i);
    stop();
    centre(card, true);
  }));
  // app.js also selects on hover; the dots and the next step follow it.
  cards.forEach((card, i) => card.addEventListener('mouseenter', () => { mark(i); schedule(); }));

  // Only a sideways swipe takes the row over. A finger that lands on a card to
  // scroll the page down leaves it running.
  let start = null;
  track.addEventListener('touchstart', (event) => {
    start = event.touches[0];
  }, { passive: true });
  track.addEventListener('touchmove', (event) => {
    if (!start || !slides()) return;
    const dx = Math.abs(event.touches[0].clientX - start.clientX);
    const dy = Math.abs(event.touches[0].clientY - start.clientY);
    if (dx > 10 && dx > dy) { start = null; touched = true; stop(); }
    else if (dy > 10) start = null;
  }, { passive: true });
  track.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && slides()) { touched = true; stop(); }
  }, { passive: true });

  // After a swipe, the card in the middle becomes the selected one.
  track.addEventListener('scroll', () => {
    if (!touched) return;
    clearTimeout(settle);
    settle = setTimeout(() => {
      const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
      const far = cards.map((card) => {
        const r = card.getBoundingClientRect();
        return Math.abs(r.left + r.width / 2 - mid);
      });
      go(far.indexOf(Math.min(...far)), false);
    }, 140);
  }, { passive: true });

  [track, panel].forEach((el) => {
    el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovered = true; schedule(); } });
    el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hovered = false; schedule(); } });
    el.addEventListener('focusin', () => { focused = true; schedule(); });
    el.addEventListener('focusout', () => { focused = false; schedule(); });
  });

  // Keep the panel as tall as its longest state, so the page below never jumps.
  const steady = () => {
    const keep = current;
    panel.style.minHeight = '';
    const tallest = Math.max(...cards.map((card) => { card.click(); return panel.offsetHeight; }));
    cards[keep].click();
    panel.style.minHeight = `${tallest}px`;
    centre(cards[keep], false);
  };
  let width = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === width) return;   // phone toolbars resize height only
    width = window.innerWidth;
    steady();
  });

  document.addEventListener('visibilitychange', schedule);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: 0.35 }).observe(track);

  // app.js loads the same states; wait for its listeners before pressing cards.
  window.addEventListener('load', () => { steady(); mark(current); schedule(); });
})();
