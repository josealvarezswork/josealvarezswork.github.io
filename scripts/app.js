/**
 * Portfolio Projects Loader
 * Carga proyectos desde projects.json y los renderiza dinámicamente
 */

async function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  try {
    const response = await fetch('./data/projects.json');
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
  container.innerHTML = projects.map((project, i) => `
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
            <a class="case-link primary" href="${project.link}" ${project.target ? `target="${project.target}" rel="noreferrer"` : ''}><svg class="ico" aria-hidden="true"><use href="./assets/img/icons.svg#i-view"/></svg>${project.linkText || 'View case study'}</a>
            ${project.systemLink ? `<a class="case-link" href="${project.systemLink}" ${project.target ? `target="${project.target}" rel="noreferrer"` : ''}><svg class="ico" aria-hidden="true"><use href="./assets/img/icons.svg#i-system"/></svg>${project.systemLinkText || 'Design system'}</a>` : ''}
          </div>
        </div>

        <a class="case-visual well case-visual--${project.tint} is-${project.fit}" href="${project.link}" ${project.target ? `target="${project.target}" rel="noreferrer"` : ''} tabindex="-1" aria-hidden="true">
          <img src="${project.image}" alt="${project.imageAlt}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
        </a>
      </article>

    </div>
  `).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initEsaStates();
  initHeroBoard();
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
 * Hero corkboard — sticky notes shift slightly with the cursor, like they're
 * pinned to a board with a little depth instead of flat on the page.
 */
function initHeroBoard() {
  const board = document.getElementById('hero-board');
  if (!board) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Each item's rotation lives in CSS; capture it once so the mousemove
  // handler can layer a translate on top instead of fighting the cascade.
  const items = board.querySelectorAll('.board-item');
  const baseTransforms = new Map();
  items.forEach(item => baseTransforms.set(item, getComputedStyle(item).transform));

  board.addEventListener('mousemove', (e) => {
    const rect = board.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    items.forEach((item, i) => {
      const depth = 6 + (i % 3) * 4;
      const base = baseTransforms.get(item);
      const baseFn = base && base !== 'none' ? `${base} ` : '';
      item.style.transform = `${baseFn}translate(${(px * depth).toFixed(1)}px, ${(py * depth).toFixed(1)}px)`;
    });
  });

  board.addEventListener('mouseleave', () => {
    items.forEach(item => {
      const base = baseTransforms.get(item);
      item.style.transform = base && base !== 'none' ? base : '';
    });
  });
}

/**
 * The paper stack — hovering turns the top sheet to the next subject.
 * The first entry mirrors what's already in the markup, so the swap never
 * flashes different content on load.
 */
const SHEETS = [
  {
    kicker: 'The framework behind both projects',
    title: '<span class="sel">Emotional</span> <span class="hl">State</span> Architecture',
    list: ['Trigger', 'State Machine', 'Feedback', 'Progression', 'Presentation'],
    tape: 'State changes everything →'
  },
  {
    kicker: 'Case study — progression & feedback',
    title: '<span class="sel">Fail</span> <span class="hl">State</span> as Loop',
    list: ['Streak recovery', 'XP economy', 'League ranking', 'Widget family', 'UI style guide'],
    tape: 'Data is the conversation →'
  },
  {
    kicker: 'Case study — character-driven UI',
    title: '<span class="sel">State</span> First, <span class="hl">Data</span> Second',
    list: ['60/40 layout', 'Progression tiers', 'Feedback states', 'Spend simulator', 'Playtested ×5'],
    tape: 'Am I okay? →'
  }
];

function initPaperStack() {
  const stack = document.querySelector('.paper-stack');
  if (!stack) return;

  const front = stack.querySelector('.sheet--front');
  const kicker = front.querySelector('.sheet-kicker');
  const title = front.querySelector('.sheet-title');
  const list = front.querySelector('.sheet-list');
  const tape = front.querySelector('.sheet-tape');
  if (!front || !title) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;
  let turning = false;

  function render(n) {
    const s = SHEETS[n];
    kicker.textContent = s.kicker;
    title.innerHTML = s.title;
    list.innerHTML = s.list
      .map(item => `<li>${item}</li>`)
      .join('');
    tape.textContent = s.tape;
  }

  function turn() {
    if (turning) return;
    turning = true;
    i = (i + 1) % SHEETS.length;

    // Reduced motion still gets the content, just not the throw.
    if (reduce) {
      render(i);
      turning = false;
      return;
    }

    front.classList.add('is-turning');
    setTimeout(() => {
      render(i);
      front.classList.remove('is-turning');
      setTimeout(() => { turning = false; }, 240);
    }, 200);
  }

  stack.addEventListener('mouseenter', turn);
  // Touch has no hover, and the stack is the only way to reach these subjects.
  stack.addEventListener('click', turn);
}
