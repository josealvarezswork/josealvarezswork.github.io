/**
 * Portfolio Projects Loader
 * Carga proyectos desde projects.json y los renderiza dinámicamente
 */

async function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  try {
    // The Spanish home lives one level down in /es/, so the data file and
    // the links inside it come from the container instead of being fixed here.
    const src = container.dataset.src || './data/projects.json';
    const response = await fetch(src);
    if (!response.ok) throw new Error('Failed to load projects');

    const data = await response.json();
    // Archived projects stay in the file but off the page.
    renderProjects(data.projects.filter(p => !p.archived), container);
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = '<p class="error">Error loading projects</p>';
  }
}

function renderProjects(projects, container) {
  container.innerHTML = projects.map((project, i) => {
    /* The icon sprite lives at the site root, but this template is rendered
       from two depths: index.html and es/index.html. A hardcoded './assets/…'
       resolved to /es/assets/icons.svg on the Spanish home and 404'd, so the
       card links there drew no icon. Each project's own image path already
       carries the right depth, so the sprite follows it. */
    const base = (project.image || '').startsWith('../') ? '../' : './';
    return `
    <div class="case-wrap taped">
      <article class="case">
        <div class="case-body">
          <p class="case-meta">${project.meta}</p>
          <h3 class="case-title">${project.title}</h3>
          <p class="case-desc">${project.description}</p>

          <ul class="case-tags">
            ${project.tags.map(t => `<li>${t}</li>`).join('')}
          </ul>

          <div class="case-links">
            <a class="case-link primary" href="${project.link}" ${project.target ? `target="${project.target}" rel="noreferrer"` : ''}><svg class="ico" aria-hidden="true"><use href="${base}assets/img/icons.svg#i-view"/></svg>${project.linkText || 'View case study'}</a>
            ${project.systemLink ? `<a class="case-link" href="${project.systemLink}" ${project.target ? `target="${project.target}" rel="noreferrer"` : ''}><svg class="ico" aria-hidden="true"><use href="${base}assets/img/icons.svg#i-system"/></svg>${project.systemLinkText || 'Design system'}</a>` : ''}
          </div>
        </div>

        <a class="case-visual well case-visual--${project.tint} is-${project.fit}" href="${project.link}" ${project.target ? `target="${project.target}" rel="noreferrer"` : ''} tabindex="-1" aria-hidden="true">
          <img src="${project.image}" alt="${project.imageAlt}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
        </a>
      </article>

    </div>
  `;
  }).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initEsaStates();
  initHeroMatSpotlight();
  initPaperStack();
});

/**
 * ESA states — both mascots react to the selected state at once, so the
 * framework is shown working across two products instead of described.
 */
const ESA_STATES = {
  waiting: {
    cuak: './assets/img/cuak/cuak-esperando.png',
    duogit: './assets/img/duogit/cat-neutral.png',
    trigger: 'Trigger — day start, no activity',
    text: 'Pure potential. The day begins without pressure. An expectant posture: the mascot waits, it doesn’t judge.',
    mech: 'Anthropomorphism · Epley, Waytz & Cacioppo'
  },
  happy: {
    cuak: './assets/img/cuak/cuak-feliz.png',
    duogit: './assets/img/duogit/cat-happy.png',
    trigger: 'Trigger — 3+ day streak, or a healthy metric',
    text: 'Positive reinforcement after consistent behaviour. Intense glow, lit eyes. The system celebrates the streak instead of just recording it.',
    mech: 'Variable reward · operant conditioning'
  },
  worried: {
    cuak: './assets/img/cuak/cuak-preocupado.png',
    duogit: './assets/img/duogit/cat-worried.png',
    trigger: 'Trigger — inactivity, or a threshold approaching',
    text: 'Loss aversion, activated. The mascot’s distress makes the risk visible and empathetic rather than punitive. The strongest retention state of the four.',
    mech: 'Prospect Theory · Kahneman & Tversky (Nobel, 2002)'
  },
  broken: {
    cuak: './assets/img/cuak/cuak-alerta.png',
    duogit: './assets/img/duogit/cat-sad.png',
    trigger: 'Trigger — streak broken, or threshold crossed',
    text: 'The emotional cost of loss, followed by resilience. The system mourns with the user, then invites them back without shame.',
    mech: 'Nudge Theory · Thaler & Sunstein (Nobel, 2017)'
  }
};

function initEsaStates() {
  const cards = [...document.querySelectorAll('.esa-card')];
  if (!cards.length) return;

  // The pill strip and the four state cards are two views of the same
  // selection, so they're driven by one select() instead of two handlers.
  const tabs = [...document.querySelectorAll('.esa-tab')];
  const trigger = document.getElementById('esa-trigger');
  const text = document.getElementById('esa-text');
  const mech = document.getElementById('esa-mech');

  function select(name) {
    const s = ESA_STATES[name];
    if (!s) return;

    trigger.textContent = s.trigger;
    text.textContent = s.text;
    mech.textContent = s.mech;

    [...cards, ...tabs].forEach(el => {
      const on = el.dataset.state === name;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', String(on));
    });
  }

  cards.forEach(card => {
    card.addEventListener('click', () => select(card.dataset.state));
    card.addEventListener('mouseenter', () => select(card.dataset.state));
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => select(tab.dataset.state));
  });
}

/**
 * Studio Desk Spotlight (Hero Mat Lamp)
 * Lámpara de escritorio interactiva con inercia física de muelle (lerp).
 * Sigue el cursor sobre el tapete de corte verde (#hero-mat) e ilumina
 * la cuadrícula y las marcas de corte de manera orgánica y sutil.
 */
function initHeroMatSpotlight() {
  const mat = document.getElementById('hero-mat');
  if (!mat) return;

  const lamp = mat.querySelector('.mat-lamp');
  if (!lamp) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let rect = mat.getBoundingClientRect();
  // Posición de reposo: destacando suavemente el área de trabajo / stack
  let restX = rect.width * 0.68;
  let restY = rect.height * 0.46;

  let currentX = restX;
  let currentY = restY;
  let targetX = restX;
  let targetY = restY;
  let isHovered = false;
  let rafId = null;

  lamp.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

  function updateBounds() {
    rect = mat.getBoundingClientRect();
    restX = rect.width * 0.68;
    restY = rect.height * 0.46;
    if (!isHovered) {
      targetX = restX;
      targetY = restY;
      ensureLoop();
    }
  }

  window.addEventListener('resize', updateBounds, { passive: true });

  function tick() {
    // Inercia de muelle equilibrado (lerp 0.10)
    currentX += (targetX - currentX) * 0.10;
    currentY += (targetY - currentY) * 0.10;

    lamp.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

    const dist = Math.hypot(targetX - currentX, targetY - currentY);
    if (!isHovered && dist < 0.2) {
      currentX = targetX;
      currentY = targetY;
      lamp.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      rafId = null;
      return; // Pausa el loop en reposo para 0% consumo de CPU
    }

    rafId = requestAnimationFrame(tick);
  }

  function ensureLoop() {
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  }

  mat.addEventListener('pointerenter', (e) => {
    isHovered = true;
    rect = mat.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    ensureLoop();
  });

  mat.addEventListener('pointermove', (e) => {
    isHovered = true;
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    ensureLoop();
  }, { passive: true });

  mat.addEventListener('pointerleave', () => {
    isHovered = false;
    // La lámpara conserva la posición exacta donde el puntero la dejó (memoria espacial)
    // El loop se pausa automáticamente al alcanzar la coordenada para 0% CPU.
  });
}

/**
 * The Paper Stack & Workbench Stationery — static layout
 *
 * Lays the project sheets and the hero cards out on the green cutting mat at
 * fixed angles and depths. Nothing here moves.
 *
 * It used to be drag and drop: every sheet and card could be dragged anywhere
 * on the mat, lifted on pointerdown, settled on release, and auto-tidied 4.5s
 * after the cursor left. It was removed because it cost more than it gave.
 *
 * The cards carried `touch-action: none`, which tells the browser to handle no
 * touch gesture on that element at all — scrolling and pinch-zoom included. On
 * a 375px screen the three hero cards covered 40% of the first viewport, from
 * y=157 to y=601: the middle band, exactly where a thumb lands. A visitor
 * opening the site on a phone and swiping where it is natural to swipe got a
 * page that did not move. The first interaction with the portfolio was a dead
 * gesture, on the screen that decides whether there is a second one.
 *
 * Fixing it by allowing vertical panning was possible, but the feature did not
 * earn the complication: rearranging stationery is not something anyone came
 * here to do, and the desk reads as a desk whether or not the paper moves.
 */
function initPaperStack() {
  const stack = document.querySelector('.paper-stack');

  const sheets = stack ? [
    stack.querySelector('.sheet--pos-0'),
    stack.querySelector('.sheet--pos-1'),
    stack.querySelector('.sheet--pos-2')
  ].filter(Boolean) : [];

  const deskCards = [...document.querySelectorAll('.hero-desk-notes .desk-card')];
  if (!sheets.length && !deskCards.length) return;

  // Project sheets print onto a .sheet-face, so the fold and its shadow can be
  // drawn over the printed side rather than under it.
  sheets.forEach(sheet => {
    sheet.classList.remove('paper-surface');
    sheet.querySelectorAll('.sheet-curl-flap, .sheet-fold-shine, .sheet-flap, .sheet-shade').forEach(el => el.remove());

    if (!sheet.querySelector('.sheet-face')) {
      const face = document.createElement('div');
      face.className = 'sheet-face paper-surface';
      const body = sheet.querySelector('.sheet-body');
      if (body) face.appendChild(body);
      sheet.appendChild(face);
    }
  });

  // Fanned out, as they sit in the studio reference. The offsets are what the
  // drag version used as each sheet's resting place, so the mat looks the same
  // as it did before the dragging came out.
  const SHEET_LAYOUT = {
    'sheet--pos-1': { x: -24,  y: -36, rot: -1.6, z: 12 },  // front: Fail State as Loop
    'sheet--pos-2': { x: -176, y: 18,  rot: 2.2,  z: 8 },   // left:  State First, Data Second
    'sheet--pos-0': { x: 146,  y: 42,  rot: 4.2,  z: 5 }    // right: Emotional State Architecture
  };

  sheets.forEach(sheet => {
    const key = Object.keys(SHEET_LAYOUT).find(k => sheet.classList.contains(k)) || 'sheet--pos-0';
    const { x, y, rot, z } = SHEET_LAYOUT[key];
    sheet.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    sheet.style.zIndex = z;
  });

  // The hero cards are already placed by the stylesheet; they only need the
  // slight rotation that keeps them from reading as a stack of rectangles.
  deskCards.forEach(card => {
    const isTag = card.classList.contains('desk-card--tag');
    const isTitle = card.classList.contains('desk-card--title');

    const rot = isTag ? -1.5 : isTitle ? 0.6 : -0.8;
    const z = isTag ? 5 : isTitle ? 8 : 10;

    card.style.transform = `rotate(${rot}deg)`;
    card.style.zIndex = z;
  });
}
