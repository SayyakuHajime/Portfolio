/* Synchronous theme bootstrap — must load in <head> before CSS renders. */
(function () {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var t = (stored === 'dark' || stored === 'light')
      ? stored
      : (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add('theme-' + t);
  } catch (_e) {}
}());
