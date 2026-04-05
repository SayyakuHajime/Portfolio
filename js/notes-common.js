(function () {
  function initNotesToc() {
    var links = Array.from(document.querySelectorAll('.notes-toc-item[href^="#"]'));
    if (!links.length || typeof IntersectionObserver === 'undefined') {
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

    var setActive = function (id) {
      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    var obs = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });

        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach(function (section) {
      obs.observe(section);
    });

    if (sections[0]) {
      setActive(sections[0].id);
    }
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
  initReadingProgress();
  initPointerTrail();
})();
