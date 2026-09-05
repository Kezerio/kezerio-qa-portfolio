(function () {
  'use strict';

  if (document.querySelector('[data-site-back]')) return;

  var currentScript = document.currentScript;
  var styleHref = currentScript
    ? new URL('back-button.css?v=20260905-history', currentScript.src).href
    : null;

  if (styleHref && !document.querySelector('link[data-site-back-style]')) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = styleHref;
    style.dataset.siteBackStyle = '';
    document.head.appendChild(style);
  }

  if (currentScript && !document.querySelector('link[rel~="icon"]')) {
    var icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/svg+xml';
    icon.href = new URL('favicon.svg?v=20260905-favicon', currentScript.src).href;
    document.head.appendChild(icon);
  }

  initMarquees();
  if (!document.body.hasAttribute('data-back-enabled')) return;

  var isEnglish = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  var button = document.createElement('button');
  var home = currentScript ? new URL('../', currentScript.src).href : '/';
  var nestedMarkers = ['/about/', '/api-lab/', '/cases/', '/checklists/', '/concepts/', '/contacts/', '/privacy/', '/test-plans/', '/tools/'];
  var isRoot = window.location.pathname.endsWith('/') && !nestedMarkers.some(function (marker) {
    return window.location.pathname.indexOf(marker) !== -1;
  });

  button.type = 'button';
  button.className = 'site-back';
  button.dataset.siteBack = '';
  button.setAttribute('aria-label', isEnglish ? 'Back to the previous page' : 'Вернуться на предыдущую страницу');
  button.innerHTML = '<span aria-hidden="true">←</span><span>' + (isEnglish ? 'Back' : 'Назад') + '</span>';

  button.addEventListener('click', function () {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    if (isRoot) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.assign(home);
  });

  document.body.appendChild(button);

  function initMarquees() {
    var strips = document.querySelectorAll('[data-marquee]');
    Array.prototype.forEach.call(strips, function (strip) {
      var track = strip.querySelector('[data-marquee-track]');
      var item = track && track.querySelector('[data-marquee-item]');
      if (!track || !item) return;

      var fit = function () {
        Array.prototype.forEach.call(track.querySelectorAll('[data-marquee-clone]'), function (clone) { clone.remove(); });
        var itemWidth = item.getBoundingClientRect().width;
        if (!itemWidth) return;
        var copies = 0;
        while (track.scrollWidth < strip.clientWidth * 2 && copies < 24) {
          var clone = item.cloneNode(true);
          clone.removeAttribute('data-marquee-item');
          clone.setAttribute('data-marquee-clone', '');
          clone.setAttribute('aria-hidden', 'true');
          track.appendChild(clone);
          copies += 1;
        }
        track.style.setProperty('--marquee-distance', itemWidth + 'px');
        track.style.setProperty('--marquee-duration', Math.max(16, itemWidth / 55) + 's');
      };

      fit();
      window.requestAnimationFrame(fit);
      window.addEventListener('resize', fit, { passive: true });
    });
  }
})();
