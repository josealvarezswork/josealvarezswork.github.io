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
 * The Paper Stack & Workbench Stationery — Drag & Drop
 * Permite arrastrar libremente las hojas de proyectos y las tarjetas de presentación
 * por todo el tapete de corte verde (#hero-mat).
 * - Cada tarjeta se eleva con sombra de profundidad física al ser tomada.
 * - Al soltarla, se posa suavemente sobre el tapete y se queda en su sitio.
 * - Al hacer clic/tocar cualquier tarjeta, pasa al frente del tapete.
 * - Auto-reordenado: después de 4.5s con el cursor fuera del tapete, se reorganizan solas.
 */
function initPaperStack() {
  const mat = document.getElementById('hero-mat');
  const stack = document.querySelector('.paper-stack');

  const sheets = stack ? [
    stack.querySelector('.sheet--pos-0'),
    stack.querySelector('.sheet--pos-1'),
    stack.querySelector('.sheet--pos-2')
  ].filter(Boolean) : [];

  const deskCards = [...document.querySelectorAll('.hero-desk-notes .desk-card')];
  const allCards = [...sheets, ...deskCards];

  if (!allCards.length) return;

  // Asegurar estructura con .sheet-face en las hojas de proyectos
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

  // Estados iniciales de cada tarjeta en el tapete
  const cardStates = new Map();
  let topZIndex = 14;

  // 1. Inicializar hojas de proyectos en disposición fanned-out (según la vista de estudio)
  sheets.forEach((sheet) => {
    let baseX, baseY, baseRot, baseZ;

    if (sheet.classList.contains('sheet--pos-1')) {
      // Centro al frente: Fail State as Loop
      baseX = -24;
      baseY = -36;
      baseRot = -1.6;
      baseZ = 12;
    } else if (sheet.classList.contains('sheet--pos-2')) {
      // Izquierda: State First, Data Second
      baseX = -176;
      baseY = 18;
      baseRot = 2.2;
      baseZ = 8;
    } else {
      // Derecha: Emotional State Architecture (sheet--pos-0)
      baseX = 146;
      baseY = 42;
      baseRot = 4.2;
      baseZ = 5;
    }

    cardStates.set(sheet, {
      x: baseX,
      y: baseY,
      rot: baseRot,
      baseX,
      baseY,
      baseRot,
      baseZ,
      z: baseZ,
      hasMoved: false
    });

    sheet.style.transform = `translate(${baseX}px, ${baseY}px) rotate(${baseRot}deg)`;
    sheet.style.zIndex = baseZ;
  });

  // 2. Inicializar tarjetas de presentación (hero desk notes)
  deskCards.forEach((card) => {
    const isTag = card.classList.contains('desk-card--tag');
    const isTitle = card.classList.contains('desk-card--title');

    const baseRot = isTag ? -1.5 : isTitle ? 0.6 : -0.8;
    const baseZ = isTag ? 5 : isTitle ? 8 : 10;

    cardStates.set(card, {
      x: 0,
      y: 0,
      rot: baseRot,
      baseX: 0,
      baseY: 0,
      baseRot,
      baseZ,
      z: baseZ,
      hasMoved: false
    });

    card.style.transform = `translate(0px, 0px) rotate(${baseRot}deg)`;
    card.style.zIndex = baseZ;
  });

  let activeCard = null;
  let activePointerId = null;
  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let initialCardX = 0;
  let initialCardY = 0;
  let hasMovedFar = false;
  let lastDx = 0;

  function onPointerDown(e) {
    if (e.button !== 0) return; // Solo clic primario
    if (e.target.closest('a, button')) return; // Clics directos en enlaces/botones navegan sin interferencia

    const card = e.target.closest('.sheet, .desk-card');
    if (!card || !cardStates.has(card)) return;

    activeCard = card;
    activePointerId = e.pointerId;
    isDragging = true;
    hasMovedFar = false;
    lastDx = 0;

    startPointerX = e.clientX;
    startPointerY = e.clientY;

    const state = cardStates.get(card);
    initialCardX = state.x;
    initialCardY = state.y;

    // Elevar la tarjeta seleccionada al frente
    topZIndex += 2;
    state.z = topZIndex;
    card.style.zIndex = topZIndex;

    card.classList.add('is-dragging');
    if (stack) stack.classList.add('is-dragging');

    try {
      card.setPointerCapture(activePointerId);
    } catch (_) {}

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging || e.pointerId !== activePointerId || !activeCard) return;

    const dx = e.clientX - startPointerX;
    const dy = e.clientY - startPointerY;

    if (!hasMovedFar && Math.hypot(dx, dy) > 4) {
      hasMovedFar = true;
    }

    const state = cardStates.get(activeCard);
    let proposedX = initialCardX + dx;
    let proposedY = initialCardY + dy;

    // Delimitar permitiendo que las tarjetas puedan salirse holgadamente del tapete
    // y suavizando el impacto en los bordes con resistencia elástica (rubber-banding)
    if (mat) {
      const matRect = mat.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      const parentRect = activeCard.parentElement.getBoundingClientRect();

      // Permitir que las tarjetas se asomen solo un poco fuera del tapete (un borde sutil):
      // ~24px en horizontal y ~16px en vertical
      const overhangX = 24;
      const overhangY = 16;

      const minX = -overhangX - (parentRect.left - matRect.left);
      const maxX = (matRect.width - cardRect.width + overhangX) - (parentRect.left - matRect.left);
      const minY = -overhangY - (parentRect.top - matRect.top);
      const maxY = (matRect.height - cardRect.height + overhangY) - (parentRect.top - matRect.top);

      // Suavizado elástico progresivo (amortigua el golpe al llegar al límite):
      // En vez de frenar en seco, cede suavemente con una amortiguación elástica sutil (~16px)
      function softClamp(val, min, max, elasticRange) {
        if (val < min) {
          const diff = min - val;
          return min - elasticRange * Math.tanh(diff / elasticRange);
        }
        if (val > max) {
          const diff = val - max;
          return max + elasticRange * Math.tanh(diff / elasticRange);
        }
        return val;
      }

      proposedX = softClamp(proposedX, minX, maxX, 16);
      proposedY = softClamp(proposedY, minY, maxY, 12);

      state._limitBounds = { minX, maxX, minY, maxY };
    }

    // Leve rotación física según movimiento horizontal
    const deltaMove = dx - lastDx;
    lastDx = dx;
    const tilt = Math.max(-14, Math.min(14, deltaMove * 0.3));
    const dynamicRot = Math.max(-18, Math.min(18, state.rot + tilt));

    activeCard.style.transform = `translate(${proposedX.toFixed(1)}px, ${proposedY.toFixed(1)}px) rotate(${dynamicRot.toFixed(2)}deg)`;

    state.currentDragX = proposedX;
    state.currentDragY = proposedY;
    state.currentDragRot = dynamicRot;

    if (hasMovedFar && e.cancelable) {
      e.preventDefault();
    }
  }

  function onPointerUp(e) {
    if (!isDragging || e.pointerId !== activePointerId || !activeCard) return;

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    const card = activeCard;
    const state = cardStates.get(card);

    isDragging = false;
    card.classList.remove('is-dragging');
    if (stack) stack.classList.remove('is-dragging');

    try {
      card.releasePointerCapture(activePointerId);
    } catch (_) {}

    if (hasMovedFar && state.currentDragX !== undefined) {
      // Guardar posición permanente en el tapete
      // Si la tarjeta quedó dentro de la zona elástica extendida,
      // se asienta suavemente ("snap-settle") en el límite permitido de reposo
      let finalX = state.currentDragX;
      let finalY = state.currentDragY;

      if (state._limitBounds) {
        finalX = Math.max(state._limitBounds.minX, Math.min(state._limitBounds.maxX, finalX));
        finalY = Math.max(state._limitBounds.minY, Math.min(state._limitBounds.maxY, finalY));
      }

      state.x = finalX;
      state.y = finalY;
      state.rot = Math.max(-8, Math.min(8, state.currentDragRot || state.rot));
      state.hasMoved = true;
      card.classList.add('has-moved');

      card.classList.add('is-settling');
      card.style.transform = `translate(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px) rotate(${state.rot.toFixed(2)}deg)`;
      setTimeout(() => {
        card.classList.remove('is-settling');
      }, 300);
    }

    activeCard = null;
    activePointerId = null;
  }

  // Función para reordenar la mesa y juntar todas las tarjetas en sus lugares
  function tidyDesk() {
    allCards.forEach((card, i) => {
      const state = cardStates.get(card);
      if (!state) return;
      state.x = state.baseX;
      state.y = state.baseY;
      state.rot = state.baseRot;
      state.hasMoved = false;
      card.classList.remove('has-moved');

      const delay = (i % 3) * 60; // Stagger suave
      setTimeout(() => {
        card.classList.add('is-tidying');
        card.style.zIndex = state.baseZ;
        card.style.transform = `translate(${state.baseX}px, ${state.baseY}px) rotate(${state.baseRot}deg)`;

        setTimeout(() => {
          card.classList.remove('is-tidying');
        }, 620);
      }, delay);
    });
    topZIndex = 14;
  }

  let autoTidyTimer = null;
  const AUTO_TIDY_DELAY = 4500; // 4.5 segundos con el mouse fuera del tapete para reordenar

  function scheduleAutoTidy() {
    cancelAutoTidy();
    const anyMoved = allCards.some(c => cardStates.get(c)?.hasMoved);
    if (!anyMoved || isDragging) return;

    autoTidyTimer = setTimeout(() => {
      tidyDesk();
    }, AUTO_TIDY_DELAY);
  }

  function cancelAutoTidy() {
    if (autoTidyTimer) {
      clearTimeout(autoTidyTimer);
      autoTidyTimer = null;
    }
  }

  // Delegación de eventos en el tapete
  if (mat) {
    mat.addEventListener('pointerdown', (e) => {
      cancelAutoTidy();
      onPointerDown(e);
    });

    mat.addEventListener('pointerleave', scheduleAutoTidy);
    mat.addEventListener('pointerenter', cancelAutoTidy);
    mat.addEventListener('dblclick', tidyDesk);
  }

  // Atajo de teclado: presionar 'R' reordena las hojas
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'r' || e.key === 'R') && !e.target.matches('input, textarea')) {
      tidyDesk();
    }
  });
}
