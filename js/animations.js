/* ==========================================================================
   CURAX — ANIMATIONS.JS
   GSAP + ScrollTrigger choreography: text reveals, fades, funnel,
   process timeline, eco diagram, portfolio hover tilt.
   ========================================================================== */

(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;
  const reduced = window.CURAX && window.CURAX.prefersReducedMotion;
  if (reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener('DOMContentLoaded', () => {
    splitLines();
    heroIntro();
    heroParallax();
    fadeUps();
    staggerGroups();
    funnelSteps();
    processTimeline();
    ecoDiagram();
    aiOrbits();
    projectTilt();
    serviceParallax();
  });

  /* Wrap words in reveal-lines containers into spans for line reveal */
  function splitLines() {
    document.querySelectorAll('.reveal-lines').forEach((el) => {
      el.querySelectorAll('.line').forEach((line) => {
        const text = line.textContent;
        line.innerHTML = `<span>${text}</span>`;
      });
    });
  }

  function heroIntro() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero .reveal-lines .line span', {
      y: 0, duration: 1, ease: 'power4.out', stagger: 0.08,
    })
      .to('.hero-sub, .hero-actions, .hero-scroll', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, '-=0.5')
      .fromTo('.hero-sub, .hero-actions, .hero-scroll', { y: 20 }, { y: 0, duration: 0.01 }, 0);
  }

  function heroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    gsap.to('.hero-inner', {
      y: 80, opacity: 0.4, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('#hero-canvas', {
      y: 60, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  function fadeUps() {
    document.querySelectorAll('[data-fade-up]').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
    document.querySelectorAll('[data-fade]').forEach((el) => {
      gsap.to(el, {
        opacity: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });
    document.querySelectorAll('.reveal-lines:not(.hero .reveal-lines)').forEach((el) => {
      gsap.to(el.querySelectorAll('.line span'), {
        y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }

  function staggerGroups() {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      gsap.to(group.children, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%' },
      });
    });
  }

  function funnelSteps() {
    document.querySelectorAll('.funnel').forEach((funnel) => {
      gsap.to(funnel.querySelectorAll('.funnel-step'), {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: funnel, start: 'top 80%' },
      });
    });
  }

  function processTimeline() {
    const track = document.querySelector('.process-track');
    if (!track) return;
    const steps = track.querySelectorAll('.process-step');
    const fill = track.querySelector('.process-line-fill');

    ScrollTrigger.create({
      trigger: track,
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 0.4,
      onUpdate: (self) => {
        if (fill) fill.style.height = (self.progress * 100) + '%';
        const activeIndex = Math.floor(self.progress * steps.length);
        steps.forEach((s, i) => s.classList.toggle('active', i <= activeIndex));
      },
    });
  }

  function ecoDiagram() {
    const wrap = document.querySelector('.eco-wrap');
    if (!wrap) return;
    const center = wrap.querySelector('.eco-center');
    const nodes = wrap.querySelectorAll('.eco-node');
    const radius = Math.min(wrap.clientWidth, wrap.clientHeight) * 0.38;
    const cx = wrap.clientWidth / 2;
    const cy = wrap.clientHeight / 2;

    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      node.style.left = x + 'px';
      node.style.top = y + 'px';
      node.style.transform = 'translate(-50%,-50%)';

      const line = document.createElement('div');
      line.className = 'eco-line';
      const dx = x - cx, dy = y - cy;
      const len = Math.sqrt(dx * dx + dy * dy);
      const ang = Math.atan2(dy, dx) * (180 / Math.PI);
      line.style.width = len + 'px';
      line.style.left = cx + 'px';
      line.style.top = cy + 'px';
      line.style.transform = `rotate(${ang}deg)`;
      wrap.prepend(line);

      gsap.to(node, {
        y: '+=10', duration: 2.4 + i * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    });

    gsap.fromTo([center, ...nodes], { opacity: 0, scale: 0.7 }, {
      opacity: 1, scale: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: wrap, start: 'top 75%' },
    });
  }

  function aiOrbits() {
    document.querySelectorAll('.ai-core').forEach((core) => {
      core.querySelectorAll('.ai-orbit').forEach((orbit, i) => {
        gsap.to(orbit, {
          rotation: 360, duration: 14 + i * 6, ease: 'none', repeat: -1, transformOrigin: '50% 50%',
        });
      });
      gsap.fromTo(core.querySelector('.ai-core-center'), { scale: 0.6, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: core, start: 'top 80%' },
      });
    });
  }

  function serviceParallax() {
    document.querySelectorAll('.service-visual').forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -30 : 30, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }

  function projectTilt() {
    if (window.CURAX && window.CURAX.isTouch) return;
    document.querySelectorAll('.project-media').forEach((media) => {
      media.addEventListener('mousemove', (e) => {
        const r = media.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(media.querySelector('img'), { rotateX: py * -6, rotateY: px * 6, duration: 0.4, ease: 'power2.out', transformPerspective: 600 });
      });
      media.addEventListener('mouseleave', () => {
        gsap.to(media.querySelector('img'), { rotateX: 0, rotateY: 0, duration: 0.5 });
      });
    });
  }
})();
