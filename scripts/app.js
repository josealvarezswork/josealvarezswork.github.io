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
    renderProjects(data.projects, container);
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = '<p class="error">Error loading projects</p>';
  }
}

function renderProjects(projects, container) {
  container.innerHTML = projects.map((project, i) => `
    <article class="case">
      <div class="case-body">
        <p class="case-meta">${project.meta}</p>
        <h3 class="case-title">${project.title}</h3>
        <p class="case-desc">${project.description}</p>

        <ul class="case-tags">
          ${project.tags.map(t => `<li>${t}</li>`).join('')}
        </ul>

        <div class="case-links">
          <a class="case-link primary" href="${project.link}">View case study ↗</a>
          ${project.systemLink ? `<a class="case-link" href="${project.systemLink}">Design system ↗</a>` : ''}
        </div>
      </div>

      <a class="case-visual case-visual--${project.tint} is-${project.fit}" href="${project.link}" tabindex="-1" aria-hidden="true">
        <img src="${project.image}" alt="${project.imageAlt}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
      </a>
    </article>
  `).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initEsaStates();
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
  const tabs = [...document.querySelectorAll('.esa-tab')];
  if (!tabs.length) return;

  const imgCuak = document.getElementById('esa-img-cuak');
  const imgDuogit = document.getElementById('esa-img-duogit');
  const trigger = document.getElementById('esa-trigger');
  const text = document.getElementById('esa-text');
  const mech = document.getElementById('esa-mech');

  Object.values(ESA_STATES).forEach(s => {
    new Image().src = s.cuak;
    new Image().src = s.duogit;
  });

  function select(name) {
    const s = ESA_STATES[name];
    if (!s) return;

    imgCuak.src = s.cuak;
    imgDuogit.src = s.duogit;
    trigger.textContent = s.trigger;
    text.textContent = s.text;
    mech.textContent = s.mech;

    tabs.forEach(t => {
      const on = t.dataset.state === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => select(tab.dataset.state));
    tab.addEventListener('mouseenter', () => select(tab.dataset.state));
  });
}

