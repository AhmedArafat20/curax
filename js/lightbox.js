/* ==========================================================================
   CURAX — LIGHTBOX.JS
   Lightweight "View Project" detail modal for the portfolio grid. Reads
   data attributes already present on each .project-row, so no separate
   content duplication is needed in the HTML.
   ========================================================================== */

(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.project-row');
    if (!rows.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-panel">
        <div class="lightbox-media"><img alt=""></div>
        <div class="lightbox-body">
          <button class="lightbox-close" aria-label="Close">&times;</button>
          <div class="lightbox-cat"></div>
          <h3></h3>
          <p></p>
        </div>
      </div>`;
    document.body.appendChild(lightbox);

    const imgEl = lightbox.querySelector('img');
    const catEl = lightbox.querySelector('.lightbox-cat');
    const titleEl = lightbox.querySelector('h3');
    const descEl = lightbox.querySelector('p');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    function open(row) {
      const img = row.querySelector('.project-media img');
      const title = row.querySelector('.project-info h3');
      const desc = row.querySelector('.project-desc');
      const tags = row.querySelectorAll('.project-meta span');

      imgEl.src = img ? img.src : '';
      imgEl.alt = img ? img.alt : '';
      titleEl.textContent = title ? title.textContent : '';
      descEl.textContent = desc ? desc.textContent : '';
      catEl.innerHTML = '';
      tags.forEach((t) => {
        const span = document.createElement('span');
        span.textContent = t.textContent;
        catEl.appendChild(span);
      });

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    rows.forEach((row) => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // don't hijack real links inside a row
        open(row);
      });
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  });
})();
