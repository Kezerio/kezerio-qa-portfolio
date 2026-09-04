(function () {
  'use strict';

  var motionQuery = window.matchMedia('(min-width: 1001px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!motionQuery.matches) return;

  var body = document.body;
  var cursor = document.createElement('div');
  var glow = document.createElement('div');
  var pointerX = -200;
  var pointerY = -200;
  var cursorX = pointerX;
  var cursorY = pointerY;
  var glowX = pointerX;
  var glowY = pointerY;
  var frameRequested = false;

  cursor.className = 'motion-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  glow.className = 'motion-glow';
  glow.setAttribute('aria-hidden', 'true');
  body.appendChild(glow);
  body.appendChild(cursor);
  body.classList.add('has-desktop-motion');

  function renderPointer() {
    cursorX += (pointerX - cursorX) * 0.34;
    cursorY += (pointerY - cursorY) * 0.34;
    glowX += (pointerX - glowX) * 0.08;
    glowY += (pointerY - glowY) * 0.08;
    cursor.style.setProperty('--cursor-x', cursorX.toFixed(2) + 'px');
    cursor.style.setProperty('--cursor-y', cursorY.toFixed(2) + 'px');
    glow.style.setProperty('--glow-x', glowX.toFixed(2) + 'px');
    glow.style.setProperty('--glow-y', glowY.toFixed(2) + 'px');

    if (Math.abs(pointerX - cursorX) > 0.1 || Math.abs(pointerY - cursorY) > 0.1) {
      window.requestAnimationFrame(renderPointer);
    } else {
      frameRequested = false;
    }
  }

  function requestPointerFrame() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(renderPointer);
  }

  function setLayerMotion(event) {
    var nx = event.clientX / window.innerWidth - 0.5;
    var ny = event.clientY / window.innerHeight - 0.5;
    var hero = document.querySelector('.fusion-hero, .cases-hero');
    if (hero) {
      hero.style.setProperty('--hero-ambient-x', (nx * 42).toFixed(2) + 'px');
      hero.style.setProperty('--hero-ambient-y', (ny * 28).toFixed(2) + 'px');
      hero.style.setProperty('--hero-ambient-rotate', (nx * 4).toFixed(2) + 'deg');
    }

    document.querySelectorAll('.fusion-word, .cases-title-word').forEach(function (word, index) {
      var depth = 7 + index * 3;
      word.style.setProperty('--layer-x', (nx * depth).toFixed(2) + 'px');
      word.style.setProperty('--layer-y', (ny * depth * .7).toFixed(2) + 'px');
      word.style.setProperty('--layer-rotate', (nx * (index % 2 ? -1 : 1) * .8).toFixed(2) + 'deg');
    });

    var portrait = document.querySelector('.fusion-hero__portrait');
    if (portrait) {
      portrait.style.setProperty('--portrait-x', (nx * 18).toFixed(2) + 'px');
      portrait.style.setProperty('--portrait-y', (ny * 12).toFixed(2) + 'px');
      portrait.style.setProperty('--portrait-rotate', (nx * 1.5).toFixed(2) + 'deg');
    }

    var aside = document.querySelector('.cases-hero__aside');
    if (aside) {
      aside.style.setProperty('--aside-x', (nx * 16).toFixed(2) + 'px');
      aside.style.setProperty('--aside-y', (ny * 10).toFixed(2) + 'px');
      aside.style.setProperty('--aside-rotate', (nx * 1.4).toFixed(2) + 'deg');
    }
  }

  document.addEventListener('pointermove', function (event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    body.classList.add('motion-pointer-visible');
    setLayerMotion(event);
    requestPointerFrame();
  }, { passive: true });

  document.addEventListener('pointerleave', function () {
    body.classList.remove('motion-pointer-visible', 'motion-pointer-active');
  });

  document.addEventListener('pointerover', function (event) {
    if (event.target.closest('a, button, summary, .motion-tilt')) body.classList.add('motion-pointer-active');
  });

  document.addEventListener('pointerout', function (event) {
    if (!event.relatedTarget || !event.relatedTarget.closest || !event.relatedTarget.closest('a, button, summary, .motion-tilt')) {
      body.classList.remove('motion-pointer-active');
    }
  });

  function bindTilt(element) {
    if (element.dataset.motionTiltBound) return;
    element.dataset.motionTiltBound = 'true';
    element.classList.add('motion-tilt');

    element.addEventListener('pointermove', function (event) {
      var rect = element.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      element.style.setProperty('--tilt-x', ((.5 - y) * 5).toFixed(2) + 'deg');
      element.style.setProperty('--tilt-y', ((x - .5) * 5).toFixed(2) + 'deg');
      element.style.setProperty('--spot-x', (x * 100).toFixed(1) + '%');
      element.style.setProperty('--spot-y', (y * 100).toFixed(1) + '%');
    }, { passive: true });

    element.addEventListener('pointerleave', function () {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--spot-x', '50%');
      element.style.setProperty('--spot-y', '50%');
    });
  }

  function bindMagnetic(element) {
    if (element.dataset.motionMagneticBound) return;
    element.dataset.motionMagneticBound = 'true';
    element.classList.add('motion-magnetic');

    element.addEventListener('pointermove', function (event) {
      var rect = element.getBoundingClientRect();
      var x = event.clientX - (rect.left + rect.width / 2);
      var y = event.clientY - (rect.top + rect.height / 2);
      element.style.setProperty('--magnetic-x', (x * .14).toFixed(2) + 'px');
      element.style.setProperty('--magnetic-y', (y * .14).toFixed(2) + 'px');
    }, { passive: true });

    element.addEventListener('pointerleave', function () {
      element.style.setProperty('--magnetic-x', '0px');
      element.style.setProperty('--magnetic-y', '0px');
    });
  }

  function refreshMotionBindings() {
    document.querySelectorAll('.fusion-project, .growth-stage, .final-certificate, .case-file, .cases-method__grid article, .humanizm-job, .humanizm-skill-panel, .humanizm-api-strip').forEach(bindTilt);
    document.querySelectorAll('.fusion-nav nav a, .final-nav__contact, .fusion-hero__bottom a, .fusion-contact__row a, .cases-nav__back, .cases-filters button, .cases-next a, .humanizm-menu-button, .humanizm-menu nav a, .humanizm-privacy-note a, .humanizm-privacy-note button').forEach(bindMagnetic);
  }

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('motion-in-view');
    });
  }, { threshold: .16 });

  document.querySelectorAll('.fusion-section, .cases-library, .cases-method, .cases-next').forEach(function (section) {
    sectionObserver.observe(section);
  });

  var mutationObserver = new MutationObserver(function () {
    refreshMotionBindings();
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
  refreshMotionBindings();
}());
