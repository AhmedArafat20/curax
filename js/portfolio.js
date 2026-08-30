/* ==========================================================================
   CURAX — PORTFOLIO.JS
   Client-side filtering for the Our Work grid.
   ========================================================================== */

(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.querySelector('.filter-bar');
    const rows = document.querySelectorAll('.project-row');
    if (!bar || !rows.length) return;

    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      bar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      rows.forEach((row) => {
        const cats = (row.dataset.category || '').split(' ');
        const match = filter === 'all' || cats.includes(filter);
        if (window.gsap && !(window.CURAX && window.CURAX.prefersReducedMotion)) {
          gsap.to(row, {
            opacity: match ? 1 : 0,
            duration: 0.25,
            onComplete: () => { row.classList.toggle('hidden', !match); if (match) gsap.set(row, { opacity: 1 }); },
          });
        } else {
          row.classList.toggle('hidden', !match);
        }
      });
    });
  });
})();
