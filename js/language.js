/* ==========================================================================
   CURAX — LANGUAGE.JS
   Adds a short fade transition when switching between the English and
   Arabic versions of the site (separate static pages under /ar/).
   ========================================================================== */

(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('[data-lang-link]');
    if (!links.length) return;
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || link.classList.contains('active')) return;
        if (window.CURAX && window.CURAX.prefersReducedMotion) return; // let default nav happen instantly
        e.preventDefault();
        document.body.style.transition = 'opacity .35s ease';
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 320);
      });
    });
  });
})();
