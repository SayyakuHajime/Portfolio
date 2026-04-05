/* ============================================================
   SAYYAKU PORTFOLIO — APP SCRIPT
   ============================================================ */

const THEME_STORAGE_KEY = 'portfolio-theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch (_err) {
    return 'light';
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (_err) {
    // Ignore storage errors and keep runtime behavior.
  }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);

  const toggle = document.getElementById('theme-toggle');
  if (!toggle) {
    return;
  }

  toggle.setAttribute('aria-pressed', String(isDark));

  const icon = toggle.querySelector('.theme-toggle-icon');
  const label = toggle.querySelector('.theme-toggle-label');

  if (icon) {
    icon.textContent = isDark ? '\u263D' : '\u2600';
  }

  if (label) {
    label.textContent = isDark ? 'Dark' : 'Light';
  }
}

function initThemeToggle() {
  applyTheme(getStoredTheme());

  const toggle = document.getElementById('theme-toggle');
  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
  });
}

// ── NAV ACTIVE STATE ─────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

// ── TAB SWITCHING ────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel, [data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.tab;
        if (!panels.length) {
          return;
        }

        const hasMatchingPanel = Array.from(panels).some(p => p.dataset.panel === target);
        if (!hasMatchingPanel) {
          return;
        }

        panels.forEach(p => {
          p.style.display = p.dataset.panel === target ? 'block' : 'none';
        });
      });
    });
  });
}

// ── READING TIME ─────────────────────────────────────────
function calcReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ── ANIMATE ON SCROLL ────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  setActiveNav();
  initTabs();
  initScrollAnimations();
});
