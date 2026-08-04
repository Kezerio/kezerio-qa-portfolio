(() => {
  'use strict';

  const translations = {
    ru: {
      title: 'QA Cases - Константин Васильев',
      description: 'Практические QA-кейсы Константина Васильева: воспроизведение, факты, expected и actual, приоритеты и доказательства.',
      ogDescription: 'Оформленные QA-кейсы и баг-репорты с доказательствами.',
      skip: 'К кейсам',
      logoLabel: 'Вернуться на главную',
      languageLabel: 'Выбор языка',
      home: 'На главную',
      heroAria: 'Не слова. Кейсы.',
      heroLineOne: 'НЕ СЛОВА.',
      heroLineTwo: 'КЕЙСЫ.',
      reportCountText: 'зафиксированных дефектов в Web, Game QA и iOS',
      openMaterials: 'Открыть материалы',
      heroNote: 'Я показываю не список знакомых терминов, а ход проверки: что заметил, как воспроизвёл, что ожидал и какие факты передал дальше.',
      libraryTitle: 'Открывайте.<br />Проверяйте.',
      filterLabel: 'Фильтр кейсов',
      all: 'Все',
      loadingFiles: 'Собираю case files',
      workflowTitle: 'От сигнала<br />до передачи.',
      noticeTitle: 'Замечаю',
      noticeText: 'Отделяю реальный симптом от впечатления и собираю контекст.',
      reproduceTitle: 'Повторяю',
      reproduceText: 'Ищу устойчивый сценарий, окружение и границы проблемы.',
      compareTitle: 'Сравниваю',
      compareText: 'Фиксирую expected и actual без двусмысленности.',
      handoffTitle: 'Передаю',
      handoffText: 'Добавляю приоритет, доказательства и понятный следующий шаг.',
      nextText: 'Часть практики не публикуется из-за конфиденциальности. Здесь остаются материалы, которые можно открыть и проверить.',
      nextTitle: 'Нужен человек,<br />который <span>докопается?</span>',
      contactMe: 'Написать мне',
      backPortfolio: 'Вернуться к портфолио',
      privacy: 'Cookies и трекеры не используются',
      loadingStatus: 'Загружаю материалы...',
      empty: 'В этой категории пока нет опубликованных кейсов.',
      shown: 'Показано',
      environment: 'Окружение',
      notSpecified: 'Не указано',
      priority: 'Приоритет',
      notSet: 'Не указан',
      steps: 'Шаги воспроизведения',
      note: 'Комментарий',
      loadFailed: 'Материалы временно не загрузились',
      loadFailedText: 'Не удалось получить кейсы. Обновите страницу или вернитесь немного позже.',
      backToTop: 'Наверх',
    },
    en: {
      title: 'QA Cases - Konstantin Vasiliev',
      description: 'Practical QA cases by Konstantin Vasiliev: reproduction, facts, expected and actual results, priorities and evidence.',
      ogDescription: 'Documented QA cases and bug reports with evidence.',
      skip: 'Skip to cases',
      logoLabel: 'Back to the home page',
      languageLabel: 'Language switcher',
      home: 'Home',
      heroAria: 'Not words. Cases.',
      heroLineOne: 'NOT WORDS.',
      heroLineTwo: 'CASES.',
      reportCountText: 'documented defects across Web, Game QA and iOS',
      openMaterials: 'Open the evidence',
      heroNote: 'I show the path of each check, not a list of familiar terms: what I noticed, how I reproduced it, what I expected and which facts I handed over.',
      libraryTitle: 'Open.<br />Inspect.',
      filterLabel: 'Case filter',
      all: 'All',
      loadingFiles: 'Building case files',
      workflowTitle: 'From signal<br />to handoff.',
      noticeTitle: 'Notice',
      noticeText: 'Separate the real symptom from an impression and collect context.',
      reproduceTitle: 'Reproduce',
      reproduceText: 'Find a stable scenario, environment and the boundaries of the problem.',
      compareTitle: 'Compare',
      compareText: 'Document expected and actual results without ambiguity.',
      handoffTitle: 'Hand off',
      handoffText: 'Add priority, evidence and a clear next step.',
      nextText: 'Some work cannot be published for confidentiality reasons. The materials here can be opened and checked.',
      nextTitle: 'Need someone<br />who will <span>dig deeper?</span>',
      contactMe: 'Contact me',
      backPortfolio: 'Back to portfolio',
      privacy: 'No cookies or trackers are used',
      loadingStatus: 'Loading materials...',
      empty: 'There are no published cases in this category yet.',
      shown: 'Showing',
      environment: 'Environment',
      notSpecified: 'Not specified',
      priority: 'Priority',
      notSet: 'Not set',
      steps: 'Steps to reproduce',
      note: 'Comment',
      loadFailed: 'The materials did not load',
      loadFailedText: 'Could not load the cases. Refresh the page or try again a little later.',
      backToTop: 'Back to top',
    },
  };

  const list = document.querySelector('[data-cases-list]');
  const status = document.querySelector('[data-cases-status]');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const progress = document.querySelector('.cases-progress i');
  const backToTop = document.querySelector('[data-back-to-top]');
  const palette = ['coral', 'blue', 'pink', 'lime', 'cream'];
  const categoryNames = { sites: 'Web', games: 'Game QA', ios: 'iOS' };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cases = [];
  let activeFilter = 'all';
  let revealObserver = null;
  let currentLanguage = readInitialLanguage();

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function readInitialLanguage() {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (translations[requested]) return requested;
    try {
      const saved = window.localStorage.getItem('kv-site-language');
      return translations[saved] ? saved : 'ru';
    } catch {
      return 'ru';
    }
  }

  function localized(value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value[currentLanguage] || value.ru || value.en || '';
    }
    return value || '';
  }

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
      <a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(localized(item.label))} ↗</a>
    `).join('')}</div>`;
  }

  function reportTemplate(report, open) {
    const copy = translations[currentLanguage];
    const severity = String(report.severity || 'Info').toLowerCase();
    return `
      <details class="case-report" ${open ? 'open' : ''}>
        <summary>
          <span class="case-report__id">${esc(report.id)}</span>
          <h4>${esc(localized(report.title))}</h4>
          <span class="case-report__severity case-report__severity--${esc(severity)}">${esc(report.severity || 'Info')}</span>
          <span class="case-report__toggle" aria-hidden="true">+</span>
        </summary>
        <div class="case-report__body">
          <div class="case-report__facts">
            ${fact(copy.environment, localized(report.env) || copy.notSpecified)}
            ${fact(copy.priority, report.priority || copy.notSet)}
          </div>
          ${report.steps ? `<div class="case-fact case-report__steps"><span>${esc(copy.steps)}</span><p>${esc(localized(report.steps))}</p></div>` : ''}
          <div class="case-report__flow">
            <div><span>Actual</span><p>${esc(localized(report.actual))}</p></div>
            <div><span>Expected</span><p>${esc(localized(report.expected))}</p></div>
          </div>
          ${report.note ? `<div class="case-report__note"><span>${esc(copy.note)}</span><p>${esc(localized(report.note))}</p></div>` : ''}
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
          <h3>${esc(localized(item.title))}</h3>
          <p>${esc(localized(item.desc))}</p>
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
    if (reducedMotion || !('IntersectionObserver' in window)) {
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
    const copy = translations[currentLanguage];
    const visibleCases = activeFilter === 'all' ? cases : cases.filter((item) => item.category === activeFilter);
    list.innerHTML = visibleCases.length
      ? visibleCases.map(caseTemplate).join('')
      : `<p class="cases-error">${esc(copy.empty)}</p>`;
    status.textContent = `${copy.shown}: ${visibleCases.length} case files / ${reportCount(visibleCases)} reports`;
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

  function setLanguage(language) {
    currentLanguage = translations[language] ? language : 'ru';
    const copy = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = copy.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.ogDescription);
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const value = copy[node.dataset.i18n];
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((node) => {
      const value = copy[node.dataset.i18nHtml];
      if (value) node.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
      const value = copy[node.dataset.i18nAria];
      if (value) node.setAttribute('aria-label', value);
    });
    languageButtons.forEach((button) => {
      const active = button.dataset.language === currentLanguage;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    backToTop.setAttribute('aria-label', copy.backToTop);
    try { window.localStorage.setItem('kv-site-language', currentLanguage); } catch { /* preference is optional */ }
    if (cases.length) render();
    else status.textContent = copy.loadingStatus;
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      render();
    });
  });

  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));

  function updateScrollUi() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
    const visible = window.scrollY > Math.min(560, window.innerHeight * .7);
    backToTop.classList.toggle('is-visible', visible);
    backToTop.setAttribute('aria-hidden', String(!visible));
    backToTop.tabIndex = visible ? 0 : -1;
  }

  window.addEventListener('scroll', updateScrollUi, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  setLanguage(currentLanguage);
  updateScrollUi();

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
      const copy = translations[currentLanguage];
      status.textContent = copy.loadFailed;
      list.innerHTML = `<p class="cases-error">${esc(copy.loadFailedText)}</p>`;
    });
})();
