/* ============================================================
   SAYYAKU PORTFOLIO — APP SCRIPT
   ============================================================ */

const THEME_STORAGE_KEY = 'portfolio-theme';

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (_err) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
  document.body.classList.toggle('theme-light', !isDark);
  document.documentElement.classList.toggle('theme-dark', isDark);
  document.documentElement.classList.toggle('theme-light', !isDark);

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

// ── MOBILE NAV DRAWER ──────────────────────────────────
function initMobileDrawer() {
  const sidebar = document.querySelector('.sidebar-left');
  if (!sidebar) {
    return;
  }

  const existingTrigger = document.querySelector('.mobile-nav-trigger');
  const trigger = existingTrigger || document.createElement('button');
  if (!existingTrigger) {
    trigger.className = 'mobile-nav-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Open navigation menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    document.body.appendChild(trigger);
  }

  const existingOverlay = document.querySelector('.mobile-nav-overlay');
  const overlay = existingOverlay || document.createElement('div');
  if (!existingOverlay) {
    overlay.className = 'mobile-nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  const mobileQuery = window.matchMedia('(max-width: 1100px)');

  const closeDrawer = () => {
    document.body.classList.remove('drawer-open');
    trigger.setAttribute('aria-expanded', 'false');
  };

  const openDrawer = () => {
    if (!mobileQuery.matches) {
      return;
    }
    document.body.classList.remove('toc-drawer-open');
    document.body.classList.add('drawer-open');
    trigger.setAttribute('aria-expanded', 'true');
  };

  trigger.addEventListener('click', () => {
    if (document.body.classList.contains('drawer-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDrawer();
    }
  });

  sidebar.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  const handleMediaChange = () => {
    if (!mobileQuery.matches) {
      closeDrawer();
    }
  };

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', handleMediaChange);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(handleMediaChange);
  }
}

// ── NAV ACTIVE STATE ─────────────────────────────────────
function setActiveNav() {
  const pathname = window.location.pathname || '';
  const page = pathname.split('/').pop() || 'index.html';
  const isNotesRoute = pathname.includes('/notes/') || page === 'notes.html';

  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    const navTarget = el.dataset.page;
    const isActive = navTarget === page || (navTarget === 'notes' && isNotesRoute);
    el.classList.toggle('active', isActive);
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

// ── COLLAPSIBLE SIDEBAR ──────────────────────────────────
function initSidebarCollapse() {
  const sidebar = document.querySelector('.sidebar-left');
  if (!sidebar) return;
  try {
    if (localStorage.getItem('sidebar-collapsed') === 'true') sidebar.classList.add('sidebar-collapsed');
  } catch (_e) {}
  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle sidebar');
  // panel-left toggle icon: vertical bar + two horizontal lines
  btn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="1" y="1" width="14" height="14" rx="2"/><line x1="5" y1="1" x2="5" y2="15"/></svg>';
  const logo = sidebar.querySelector('.sidebar-logo');
  if (logo) {
    logo.appendChild(btn);
  } else {
    sidebar.appendChild(btn);
  }
  btn.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('sidebar-collapsed');
    try { localStorage.setItem('sidebar-collapsed', collapsed); } catch (_e) {}
  });
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileDrawer();
  setActiveNav();
  initTabs();
  initScrollAnimations();
  initSidebarCollapse();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = window.__PORTFOLIO_BASE__ || '';
    navigator.serviceWorker.register(base + '/sw.js', { scope: base + '/' }).catch(() => {});
  });
}
