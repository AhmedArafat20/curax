/* ==========================================================================
   CURAX — THREE-BG.JS
   Subtle Three.js hero background: one floating geometric object + a
   light particle field. Disabled on mobile / reduced-motion for performance.
   ========================================================================== */

(function () {
  'use strict';
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduced = window.CURAX && window.CURAX.prefersReducedMotion;
  const isSmall = window.innerWidth < 760;
  if (reduced) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1 : 1.6));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  /* Floating geometric object: icosahedron wireframe, brand blue */
  const geo = new THREE.IcosahedronGeometry(2.4, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0x1677ff, wireframe: true, transparent: true, opacity: 0.55 });
  const shape = new THREE.Mesh(geo, mat);
  shape.position.set(2.4, 0.2, 0);
  scene.add(shape);

  const innerGeo = new THREE.IcosahedronGeometry(1.5, 0);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0x3ea2ff, wireframe: true, transparent: true, opacity: 0.3 });
  const innerShape = new THREE.Mesh(innerGeo, innerMat);
  innerShape.position.copy(shape.position);
  scene.add(innerShape);

  /* Particle field */
  const particleCount = isSmall ? 90 : 260;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xa7afbd, size: 0.035, transparent: true, opacity: 0.5 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    shape.rotation.x = t * 0.08;
    shape.rotation.y = t * 0.12;
    innerShape.rotation.x = -t * 0.1;
    innerShape.rotation.y = -t * 0.06;
    particles.rotation.y = t * 0.01;

    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  /* Pause rendering when hero is off-screen for performance */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { renderer.domElement.style.visibility = e.isIntersecting ? 'visible' : 'hidden'; });
  });
  io.observe(canvas);
})();
