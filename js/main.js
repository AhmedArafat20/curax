/* ==========================================================================
   CURAX — MAIN.JS
   Core UI behavior: nav, mobile menu, custom cursor, smooth scroll,
   counters, magnetic buttons, scroll progress.
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
  window.CURAX = { prefersReducedMotion, isTouch };

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMobileMenu();
    if (!isTouch && !prefersReducedMotion) initCursor();
    initSmoothScroll();
    initCounters();
    initMagnetic();
    initScrollProgress();
  });

  /* ---------------- Navigation ---------------- */
  function initNav() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Mobile menu ---------------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- Custom cursor ---------------- */
  function initCursor() {
    document.body.classList.add('has-cursor');
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.innerHTML = '<span class="cursor-label">VIEW</span>';
    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, .filter-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover-link'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover-link'));
    });
    document.querySelectorAll('[data-cursor-view]').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover-view'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover-view'));
    });
  }

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  function initSmoothScroll() {
    if (isTouch || prefersReducedMotion || typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (window.gsap && window.gsap.ticker) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window.curaxLenis = lenis;
  }

  /* ---------------- Counters ---------------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = el.dataset.counter;
        if (!target || target.includes('[')) { observer.unobserve(el); return; }
        const end = parseInt(target, 10);
        if (isNaN(end)) { observer.unobserve(el); return; }
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = prefix + Math.floor(p * end) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + end + suffix;
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
  }

  /* ---------------- Magnetic buttons ---------------- */
  function initMagnetic() {
    if (isTouch || prefersReducedMotion) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---------------- Scroll progress bar ---------------- */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }
})();
