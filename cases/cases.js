(() => {
  'use strict';

  const list = document.querySelector('[data-cases-list]');
  const status = document.querySelector('[data-cases-status]');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const progress = document.querySelector('.cases-progress i');
  const palette = ['coral', 'blue', 'pink', 'lime', 'cream'];
  const categoryNames = {
    sites: 'Web',
    games: 'Game QA',
    ios: 'iOS',
  };

  let cases = [];
  let activeFilter = 'all';
  let revealObserver = null;

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function reportCount(items) {
    return items.reduce((sum, item) => sum + (item.items?.length || 0), 0);
  }

  function fact(label, value, className = '') {
    if (!value) return '';
    return `<div class="case-fact ${className}"><span>${esc(label)}</span><p>${esc(value)}</p></div>`;
  }

  function links(items) {
    if (!items?.length) return '';
    return `<div class="case-report__links">${items.map((item) => `
      <a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.label)} ↗</a>
    `).join('')}</div>`;
  }

  function reportTemplate(report, open) {
    const severity = String(report.severity || 'Info').toLowerCase();
    return `
      <details class="case-report" ${open ? 'open' : ''}>
        <summary>
          <span class="case-report__id">${esc(report.id)}</span>
          <h4>${esc(report.title)}</h4>
          <span class="case-report__severity case-report__severity--${esc(severity)}">${esc(report.severity || 'Info')}</span>
          <span class="case-report__toggle" aria-hidden="true">+</span>
        </summary>
        <div class="case-report__body">
          <div class="case-report__facts">
            ${fact('Окружение', report.env || 'Не указано')}
            ${fact('Приоритет', report.priority || 'Не указан')}
          </div>
          ${report.steps ? `<div class="case-fact case-report__steps"><span>Шаги воспроизведения</span><p>${esc(report.steps)}</p></div>` : ''}
          <div class="case-report__flow">
            <div><span>Actual</span><p>${esc(report.actual)}</p></div>
            <div><span>Expected</span><p>${esc(report.expected)}</p></div>
          </div>
          ${report.note ? `<div class="case-report__note"><span>Комментарий</span><p>${esc(report.note)}</p></div>` : ''}
          ${links(report.links)}
        </div>
      </details>
    `;
  }

  function caseTemplate(item, index) {
    const reports = item.items || [];
    const number = String(index + 1).padStart(2, '0');
    const label = categoryNames[item.category] || item.category;
    return `
      <article class="case-file case-file--${palette[index % palette.length]} reveal">
        <div class="case-file__intro">
          <div class="case-file__meta"><span>${number} / ${esc(label)}</span><span>${reports.length} ${reports.length === 1 ? 'REPORT' : 'REPORTS'}</span></div>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.desc)}</p>
        </div>
        <div class="case-file__reports">
          ${reports.map((report, reportIndex) => reportTemplate(report, index === 0 && reportIndex === 0)).join('')}
        </div>
      </article>
    `;
  }

  function bindReveal() {
    revealObserver?.disconnect();
    const elements = [...document.querySelectorAll('.case-file.reveal')];

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    elements.forEach((element) => revealObserver.observe(element));
  }

  function render() {
    const visibleCases = activeFilter === 'all'
      ? cases
      : cases.filter((item) => item.category === activeFilter);

    if (!visibleCases.length) {
      list.innerHTML = '<p class="cases-error">В этой категории пока нет опубликованных кейсов.</p>';
    } else {
      list.innerHTML = visibleCases.map(caseTemplate).join('');
    }

    const reports = reportCount(visibleCases);
    status.textContent = `Показано: ${visibleCases.length} case files / ${reports} reports`;
    bindReveal();
  }

  function updateCounts() {
    document.querySelector('[data-total-reports]').textContent = reportCount(cases);
    document.querySelectorAll('[data-filter-count]').forEach((counter) => {
      const category = counter.dataset.filterCount;
      const matching = category === 'all' ? cases : cases.filter((item) => item.category === category);
      counter.textContent = reportCount(matching);
    });
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      render();
    });
  });

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
  }, { passive: true });

  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  fetch('../data/cases.json')
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      cases = Array.isArray(data) ? data : [];
      updateCounts();
      render();
    })
    .catch(() => {
      status.textContent = 'Материалы временно не загрузились';
      list.innerHTML = '<p class="cases-error">Не удалось получить кейсы. Обновите страницу или вернитесь немного позже.</p>';
    });
})();
