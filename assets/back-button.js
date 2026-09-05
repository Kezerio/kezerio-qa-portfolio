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
})();
