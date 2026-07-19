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
  initSlider();
  initReactiveMascots();
});

// Field Notes Slider
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  document.getElementById('prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('next')?.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));
}

// Mascots react to the column the reader is on — the thesis, demonstrated
function initReactiveMascots() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('.slide').forEach(slide => {
    const mascot = slide.querySelector('.slide-mascot');
    if (!mascot) return;

    // Preload so the swap never flashes
    Object.values(mascot.dataset).forEach(src => { new Image().src = src; });

    const setMood = mood => {
      const src = mascot.dataset[mood];
      if (src && mascot.getAttribute('src') !== src) mascot.setAttribute('src', src);
      mascot.classList.toggle('is-reacting', mood !== 'idle');
    };

    slide.querySelectorAll('[data-mood]').forEach(col => {
      col.addEventListener('mouseenter', () => setMood(col.dataset.mood));
      col.addEventListener('mouseleave', () => setMood('idle'));
    });
  });
}

