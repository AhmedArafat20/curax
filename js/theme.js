/* ==========================================================================
   CURAX — THEME.JS
   Applies the "Main" (dark) / "Light" theme toggle. The initial theme is
   already set by an inline snippet in <head> (before paint, to avoid a
   flash of the wrong theme) — this file only wires up the toggle buttons.
   ========================================================================== */

(function () {
  'use strict';
  const STORAGE_KEY = 'curax-theme';

  function applyTheme(theme) {
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'main';
        applyTheme(current === 'light' ? 'main' : 'light');
      });
    });
  });
})();
