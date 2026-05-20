/**
 * Portfolio Projects Loader
 * Carga proyectos desde projects.json y los renderiza dinámicamente
 */

const COLOR_MAP = {
  green: '#4f7c63',
  orange: '#ff6a2d',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  pink: '#ec4899'
};

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
  container.innerHTML = projects.map(project => `
    <a class="card" href="${project.link}" style="background: ${COLOR_MAP[project.color] || project.color}">
      <div class="card-image">
        <div class="card-mockup">
          ${project.images.length > 0
      ? project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')
      : ''
    }
        </div>
        ${project.inDevelopment ? '<div class="card-dev-overlay"><span>IN ACTIVE DEVELOPMENT</span></div>' : ''}
      </div>
      <div class="card-inner">
        <div class="card-meta">
          <span class="pill">${project.category}</span>
          <span class="pill pill--ghost">${project.year}</span>
        </div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>
      </div>
    </a>
  `).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initSlider();
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

