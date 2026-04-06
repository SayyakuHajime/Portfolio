(function () {
  function initNotesToc() {
    var links = Array.from(document.querySelectorAll('.notes-toc-item[href^="#"]'));
    if (!links.length) {
      return;
    }

    var sections = links
      .map(function (link) {
        var href = link.getAttribute('href');
        if (!href || href.length < 2) {
          return null;
        }
        return document.getElementById(href.slice(1));
      })
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    var lastActiveId = '';

    var setActive = function (id) {
      if (!id || id === lastActiveId) {
        return;
      }

      lastActiveId = id;
      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    var getActiveSectionId = function () {
      var marker = Math.max(96, window.innerHeight * 0.26);

      for (var i = sections.length - 1; i >= 0; i -= 1) {
        if (sections[i].getBoundingClientRect().top <= marker) {
          return sections[i].id;
        }
      }

      return sections[0].id;
    };

    var ticking = false;
    var updateActiveFromScroll = function () {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(function () {
        setActive(getActiveSectionId());
        ticking = false;
      });
    };

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var href = link.getAttribute('href');
        if (href && href.length > 1) {
          setActive(href.slice(1));
        }
      });
    });

    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll, { passive: true });
    window.addEventListener('hashchange', updateActiveFromScroll);

    updateActiveFromScroll();
  }

  function initReadingProgress() {
    var bar = document.getElementById('readingProgress');
    if (!bar) {
      return;
    }

    var update = function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        bar.style.width = '0%';
        return;
      }

      var scrolled = window.scrollY || document.documentElement.scrollTop || 0;
      var width = Math.min(100, Math.max(0, (scrolled / total) * 100));
      bar.style.width = width + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function initTocDrawer() {
    var sidebar = document.querySelector('.sidebar-right');
    var tocList = document.querySelector('.notes-toc-list');

    if (!sidebar || !tocList) {
      return;
    }

    var existingTrigger = document.querySelector('.notes-toc-trigger');
    var trigger = existingTrigger || document.createElement('button');
    if (!existingTrigger) {
      trigger.className = 'notes-toc-trigger';
      trigger.type = 'button';
      trigger.setAttribute('aria-label', 'Open table of contents');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg><span class="notes-toc-trigger-label">Contents</span>';
      document.body.appendChild(trigger);
    }

    var existingOverlay = document.querySelector('.notes-toc-overlay');
    var overlay = existingOverlay || document.createElement('div');
    if (!existingOverlay) {
      overlay.className = 'notes-toc-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }

    var mobileQuery = window.matchMedia('(max-width: 1100px)');

    var closeDrawer = function () {
      document.body.classList.remove('toc-drawer-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    var openDrawer = function () {
      if (!mobileQuery.matches) {
        return;
      }
      document.body.classList.remove('drawer-open');
      document.body.classList.add('toc-drawer-open');
      trigger.setAttribute('aria-expanded', 'true');
    };

    trigger.addEventListener('click', function () {
      if (document.body.classList.contains('toc-drawer-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    });

    tocList.querySelectorAll('.notes-toc-item').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    var handleMediaChange = function () {
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

  function initPointerTrail() {
    var toggleBtn = document.getElementById('cursorToggleBtn');
    var pointer = document.getElementById('cursorPointer');
    var trailCanvas = document.getElementById('cursorTrailCanvas');

    if (!toggleBtn || !pointer || !trailCanvas) {
      return;
    }

    var ctx = trailCanvas.getContext('2d', { alpha: true });
    if (!ctx) {
      return;
    }

    var state = {
      enabled: false,
      points: [],
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    var MAX_POINTS = 52;

    function resizeCanvas() {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    }

    function updateToggleUI() {
      toggleBtn.classList.toggle('is-on', state.enabled);
      toggleBtn.setAttribute('aria-pressed', String(state.enabled));
      document.body.classList.toggle('cursor-mode-on', state.enabled);
    }

    function addPoint(x, y) {
      state.points.push({ x: x, y: y });
      if (state.points.length > MAX_POINTS) {
        state.points.splice(0, state.points.length - MAX_POINTS);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

      if (state.points.length > 1) {
        for (var i = 1; i < state.points.length; i += 1) {
          var prev = state.points[i - 1];
          var cur = state.points[i];
          var t = i / state.points.length;
          var alphaGlow = 0.04 + 0.22 * t;
          var alphaCore = 0.18 + 0.58 * t;
          var glowWidth = 0.9 + 1.3 * t;
          var coreWidth = 0.28 + 0.62 * t;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(cur.x, cur.y);
          ctx.lineWidth = glowWidth;
          ctx.lineCap = 'round';
          ctx.strokeStyle = 'rgba(255,24,24,' + alphaGlow + ')';
          ctx.shadowBlur = 6 + 7 * t;
          ctx.shadowColor = 'rgba(255,24,24,0.45)';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(cur.x, cur.y);
          ctx.lineWidth = coreWidth;
          ctx.strokeStyle = 'rgba(255,68,68,' + alphaCore + ')';
          ctx.shadowBlur = 0;
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      }

      state.points.splice(0, 1);
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', function (event) {
      state.x = event.clientX;
      state.y = event.clientY;
      pointer.style.left = state.x + 'px';
      pointer.style.top = state.y + 'px';

      if (state.enabled) {
        addPoint(state.x, state.y);
      }
    });

    toggleBtn.addEventListener('click', function () {
      state.enabled = !state.enabled;

      if (!state.enabled) {
        state.points.length = 0;
        ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      }

      updateToggleUI();
    });

    resizeCanvas();
    updateToggleUI();
    draw();
  }

  initNotesToc();
  initTocDrawer();
  initReadingProgress();
  initPointerTrail();
})();
