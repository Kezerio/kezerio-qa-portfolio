(function () {
  'use strict';

  var translations = {
    ru: {
      title: 'Константин Васильев - AI Product Specialist / AI-Assisted QA',
      description: 'Портфолио Константина Васильева: 4 года в технической поддержке и интеграциях, Web/API QA, Android-проекты и AI-assisted разработка.',
      skip: 'К содержанию', homeLabel: 'В начало страницы', navLabel: 'Основная навигация', languageLabel: 'Выбор языка', navRole: 'AI PRODUCT + QA',
      menuButton: 'Маршрут', menuHint: 'Лёгкое меню. Всё важное в одном маршруте.', menuStatus: 'Санкт-Петербург. Готов к релокации.',
      navExperience: 'Опыт', navProof: 'Проекты', navSkills: 'Навыки', navAbout: 'Обо мне', navLearning: 'Обучение', navContact: 'Контакт',
      portraitAlt: 'Константин Васильев', heroRole: 'AI PRODUCT SPECIALIST / AI-ASSISTED QA',
      heroLead: 'Технический специалист с 4-летним опытом диагностики инцидентов и сопровождения интеграций. Воспроизвожу ошибки, проверяю пользовательские сценарии и готовлю технические задачи для инженеров. Параллельно развиваю Web/API и AI-assisted проекты: выпустил две Android-игры, собрал QA API Lab и публичные QA-кейсы.',
      heroCta: 'Смотреть опыт',
      experienceLabel: 'КОММЕРЧЕСКИЙ ОПЫТ / 01', experienceTitle: 'Сначала работа.<br />Потом <i>слова.</i>',
      experienceLead: 'Четыре года в технической поддержке: от массовых обращений до B2B-интеграций, диагностики VoIP и технических тикетов для инженеров.',
      telphinRole: 'Специалист первой линии поддержки, высшая категория', currentBadge: 'ТЕКУЩАЯ РАБОТА',
      telphinSummary: 'Сопровождаю B2B-клиентов: облачная АТС, VoIP/SIP и интеграции с amoCRM, Bitrix24 и YCLIENTS. Воспроизвожу инциденты, отделяю настройки от дефекта сервиса и передаю инженерам проверенные гипотезы с доказательствами.',
      metricsLabel: 'Рабочие показатели', telphinMetricTickets: 'тикетов за день', telphinMetricCalls: 'звонков за день', telphinMetricInterns: 'стажёрам помогал', telphinMetricSla: 'приоритет и сроки',
      casesSummary: 'Три реальных диагностических эпизода',
      caseSip: 'Примерно за 3 минуты нашёл конфликт двойной SIP-регистрации. После удаления дубликата интеграция снова заработала.',
      caseHuawei: 'Когда нативное приложение не работало на Huawei, настроил SIP-аккаунт в Zoiper и восстановил звонки.',
      caseCarrier: 'Изолировал проблему с блокировкой оператора, связанную с маркировкой на непроходящих вызовах.',
      toolLineLabel: 'СРЕДА:', erRole: 'Специалист технической поддержки', foundationBadge: 'БАЗА ДИАГНОСТИКИ',
      erSummary: 'Диагностировал интернет, IPTV и телефонию: IP-настройки, роутеры, Wi-Fi, приставки и телефонные шлюзы. Фиксировал результаты в WebARM и Jira, эскалировал сложные случаи и помогал стажёрам.',
      erMetricCalls: 'звонков за смену', erMetricIncidents: 'обращений при крупных авариях',
      proofLabel: 'ПРОЕКТЫ И ПРАКТИКА / 02', proofTitle: 'Можно открыть.<br /><i>И проверить.</i>', proofLead: 'Здесь не обещания, а работающие проекты, опубликованные приложения и документы с контекстом.',
      projectGame: 'Две выпущенные игры в RuStore. Веду идею, требования, постановку задач Codex, ручную проверку, ретест и публикацию.',
      projectCases: 'Шесть воспроизводимых дефектов Web, accessibility, iOS и Game QA: окружение, шаги, actual/expected, severity, priority и доказательства.',
      projectApi: 'GET и POST, JSON, headers, коды 200/401/404/422, негативные и граничные проверки, 9 pytest-тестов и GitHub Actions.',
      apiDetailsLabel: 'Детали API практики',
      skillsLabel: 'УРОВНИ НАВЫКОВ / 03', skillsTitle: 'Без общей кучи.<br /><i>По уровню практики.</i>', skillsLead: 'Уровень показывает, где навык применялся: в работе, в собственных проектах или пока изучается.',
      commercialLevel: 'КОММЕРЧЕСКИЙ', commercialHint: 'Ежедневная рабочая практика', commercialTickets: 'Технические тикеты', commercialCommunication: 'Коммуникация с клиентом',
      projectLevel: 'ПРОЕКТНЫЙ', projectHint: 'Применял в собственных продуктах', projectPrompting: 'Итерации промптов и ручная проверка AI-результата',
      learningLevel: 'НАЧАЛЬНЫЙ', learningHint: 'Изучаю, без коммерческого опыта', learningLlm: 'Формальная LLM evaluation', learningPytest: 'Самостоятельное написание Pytest', learningEnglish: 'English A2, расту до B1',
      aboutLabel: 'ЧЕЛОВЕК ЗА РЕЗЮМЕ / 04', aboutTitle: 'Спокойный.<br />Технический.<br /><i>Любопытный.</i>',
      aboutText: 'Поддержка научила меня не спорить с фразой «не работает», а превращать её в проверяемые условия. AI для меня не должность и не магия, а рабочий инструмент: задачу всё равно нужно понять, результат проверить, а ответственность оставить за собой.',
      learningSectionLabel: 'ОБУЧЕНИЕ / 05', learningSectionTitle: 'Учусь.<br />Проверяю.<br /><i>Применяю.</i>', certificateAi: 'Основы ИИ', certificateAgents: 'Агенты и рабочие процессы', courseLabel: 'Сертификат о прохождении курса',
      certificateAiAlt: 'Сертификат Основы ИИ', certificateAgentsAlt: 'Сертификат Агенты и рабочие процессы', certificateAutomationAlt: 'Сертификат по основам тестовой автоматизации',
      contactLabel: 'МОЖНО ПРОСТО НАПИСАТЬ / 06', contactTitle: 'Давайте сделаем<br /><span>понятнее</span><br />вместе.', factFormat: 'Удалённо, гибрид или офис', factRelocation: 'Готов к релокации', factTimezone: 'Готов работать по часовому поясу компании', factEnglish: 'Английский A2, расту до B1',
      contactText: 'Рассматриваю техническую поддержку, сопровождение интеграций, Manual QA и AI-assisted product роли, где важны диагностика, ясная документация и проверяемый результат.',
      privacyLink: 'Приватность и localStorage', privacyTitle: 'Здесь нет рекламных cookies', privacyText: 'В localStorage сохраняются язык и отметка закрытия. Рекламы и аналитики нет. GitHub Pages фиксирует IP для безопасности.', privacyAccept: 'Понятно', privacyMore: 'Подробнее', privacyClose: 'Закрыть уведомление', backToTop: 'Наверх'
    },
    en: {
      title: 'Konstantin Vasiliev - AI Product Specialist / AI-Assisted QA',
      description: 'Konstantin Vasiliev portfolio: 4 years in technical support and integrations, Web/API QA, Android projects and AI-assisted development.',
      skip: 'Skip to content', homeLabel: 'Back to the top', navLabel: 'Main navigation', languageLabel: 'Language selection', navRole: 'AI PRODUCT + QA',
      menuButton: 'Route', menuHint: 'A light menu. Everything important in one route.', menuStatus: 'Saint Petersburg. Open to relocation.',
      navExperience: 'Experience', navProof: 'Projects', navSkills: 'Skills', navAbout: 'About', navLearning: 'Learning', navContact: 'Contact',
      portraitAlt: 'Konstantin Vasiliev', heroRole: 'AI PRODUCT SPECIALIST / AI-ASSISTED QA',
      heroLead: 'Technical specialist with 4 years of experience diagnosing incidents and supporting integrations. I reproduce defects, verify user scenarios and prepare technical tickets for engineers. Alongside my day job, I build Web/API and AI-assisted projects: two released Android games, a QA API Lab and public QA cases.',
      heroCta: 'View experience',
      experienceLabel: 'COMMERCIAL EXPERIENCE / 01', experienceTitle: 'Work first.<br /><i>Words second.</i>',
      experienceLead: 'Four years in technical support: from high-volume requests to B2B integrations, VoIP diagnostics and technical tickets for engineers.',
      telphinRole: 'First-line support specialist, senior grade', currentBadge: 'CURRENT ROLE',
      telphinSummary: 'I support B2B clients using cloud PBX, VoIP/SIP and integrations with amoCRM, Bitrix24 and YCLIENTS. I reproduce incidents, separate configuration issues from service defects and provide engineers with tested hypotheses and evidence.',
      metricsLabel: 'Work metrics', telphinMetricTickets: 'tickets per day', telphinMetricCalls: 'calls per day', telphinMetricInterns: 'interns mentored', telphinMetricSla: 'priority and deadlines',
      casesSummary: 'Three real diagnostic episodes',
      caseSip: 'I found a double SIP registration conflict in about 3 minutes. Removing the duplicate restored the integration.',
      caseHuawei: 'When the native app failed on a Huawei device, I configured the SIP account in Zoiper and restored calls.',
      caseCarrier: 'I isolated a carrier-side blocking issue connected to call labelling on failed calls.',
      toolLineLabel: 'ENVIRONMENT:', erRole: 'Technical support specialist', foundationBadge: 'DIAGNOSTIC FOUNDATION',
      erSummary: 'I diagnosed internet, IPTV and telephony issues: IP settings, routers, Wi-Fi, set-top boxes and telephone gateways. I documented results in WebARM and Jira, escalated complex cases and helped trainees.',
      erMetricCalls: 'calls per shift', erMetricIncidents: 'requests during major incidents',
      proofLabel: 'PROJECTS AND PRACTICE / 02', proofTitle: 'Open it.<br /><i>Verify it.</i>', proofLead: 'Working projects, released applications and contextual documentation instead of unsupported promises.',
      projectGame: 'Two games released in RuStore. I own the concept, requirements, Codex tasks, manual checks, retests and publication.',
      projectCases: 'Six reproducible Web, accessibility, iOS and Game QA defects with environment, steps, actual/expected, severity, priority and evidence.',
      projectApi: 'GET and POST, JSON, headers, 200/401/404/422 statuses, negative and boundary checks, 9 pytest tests and GitHub Actions.',
      apiDetailsLabel: 'API practice details',
      skillsLabel: 'SKILL LEVELS / 03', skillsTitle: 'Not one long list.<br /><i>Actual practice levels.</i>', skillsLead: 'The level shows whether I use a skill at work, in my own projects or am still learning it.',
      commercialLevel: 'COMMERCIAL', commercialHint: 'Daily work experience', commercialTickets: 'Technical tickets', commercialCommunication: 'Client communication',
      projectLevel: 'PROJECT', projectHint: 'Applied in my own products', projectPrompting: 'Prompt iteration and manual verification of AI output',
      learningLevel: 'BEGINNER', learningHint: 'Learning, no commercial experience', learningLlm: 'Formal LLM evaluation', learningPytest: 'Independent Pytest authoring', learningEnglish: 'English A2, working toward B1',
      aboutLabel: 'THE PERSON BEHIND THE CV / 04', aboutTitle: 'Calm.<br />Technical.<br /><i>Curious.</i>',
      aboutText: 'Support taught me not to argue with “it does not work”, but to turn it into testable conditions. AI is not a job title or magic to me. It is a working tool: the task still has to be understood, the output checked and the responsibility kept human.',
      learningSectionLabel: 'LEARNING / 05', learningSectionTitle: 'Learn.<br />Test.<br /><i>Apply.</i>', certificateAi: 'AI Foundations', certificateAgents: 'Agents and Workflows', courseLabel: 'Course completion certificate',
      certificateAiAlt: 'AI Foundations certificate', certificateAgentsAlt: 'Agents and Workflows certificate', certificateAutomationAlt: 'Test Automation Foundation certificate',
      contactLabel: 'YOU CAN JUST SAY HELLO / 06', contactTitle: 'Let us make it<br /><span>clearer</span><br />together.', factFormat: 'Remote, hybrid or office', factRelocation: 'Open to relocation', factTimezone: 'Ready to work in the company time zone', factEnglish: 'English A2, working toward B1',
      contactText: 'I am considering technical support, integration support, Manual QA and AI-assisted product roles where diagnostics, clear documentation and verifiable results matter.',
      privacyLink: 'Privacy and localStorage', privacyTitle: 'No advertising cookies here', privacyText: 'localStorage keeps the language and notice dismissal. There are no ads or analytics. GitHub Pages logs IP addresses for security.', privacyAccept: 'Got it', privacyMore: 'Details', privacyClose: 'Close notice', backToTop: 'Back to top'
    }
  };

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progressBar = document.querySelector('.fusion-progress i');
  var languageButtons = Array.from(document.querySelectorAll('[data-language]'));
  var metaDescription = document.querySelector('meta[name="description"]');
  var backToTopButton = document.querySelector('[data-back-to-top]');
  var menu = document.querySelector('[data-menu]');
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var privacyNote = document.querySelector('[data-privacy-note]');
  var privacyButtons = document.querySelectorAll('[data-privacy-accept], [data-privacy-close]');
  var currentLanguage = 'ru';

  function readStored(key) {
    try { return window.localStorage.getItem(key); } catch (error) { return null; }
  }

  function writeStored(key, value) {
    try { window.localStorage.setItem(key, value); } catch (error) { return; }
  }

  function localizedHref(href, language) {
    var clean = href.split('?')[0].split('#')[0];
    return clean + '?lang=' + language;
  }

  function setLanguage(language, persist) {
    var selected = translations[language] ? language : 'ru';
    var copy = translations[selected];
    currentLanguage = selected;
    document.documentElement.lang = selected;
    document.title = copy.title;
    if (metaDescription) metaDescription.setAttribute('content', copy.description);
    if (backToTopButton) backToTopButton.setAttribute('aria-label', copy.backToTop);

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      if (copy[key]) node.textContent = copy[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-html');
      if (copy[key]) node.innerHTML = copy[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-aria');
      if (copy[key]) node.setAttribute('aria-label', copy[key]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-alt');
      if (copy[key]) node.setAttribute('alt', copy[key]);
    });

    languageButtons.forEach(function (button) {
      var active = button.getAttribute('data-language') === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-cv-link]').forEach(function (link) {
      link.setAttribute('href', selected === 'en' ? 'cv/Konstantin_Vasiliev_CV_EN.pdf' : 'cv/Konstantin_Vasiliev_CV_RU.pdf');
    });
    document.querySelectorAll('a[href^="cases/"], a[href^="api-lab/"], a[href^="privacy/"]').forEach(function (link) {
      link.setAttribute('href', localizedHref(link.getAttribute('href'), selected));
    });

    if (persist) {
      writeStored('kv-site-language', selected);
      var url = new URL(window.location.href);
      url.searchParams.set('lang', selected);
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () { setLanguage(button.getAttribute('data-language'), true); });
  });

  var queryLanguage = new URLSearchParams(window.location.search).get('lang');
  setLanguage(queryLanguage || readStored('kv-site-language') || 'ru', false);

  document.querySelectorAll('[data-year]').forEach(function (node) { node.textContent = String(new Date().getFullYear()); });

  function setMenu(open) {
    if (!menu || !menuToggle) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  }
  if (menuToggle) menuToggle.addEventListener('click', function () { setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'); });
  if (menu) menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') setMenu(false); });

  var revealItems = Array.from(document.querySelectorAll('.reveal'));
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (node) { node.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
    revealItems.forEach(function (node) { revealObserver.observe(node); });
  }

  function updateScrollUi() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    if (backToTopButton) {
      var visible = window.scrollY > Math.min(560, window.innerHeight * .7);
      backToTopButton.classList.toggle('is-visible', visible);
      backToTopButton.setAttribute('aria-hidden', String(!visible));
      backToTopButton.tabIndex = visible ? 0 : -1;
    }
  }
  updateScrollUi();
  window.addEventListener('scroll', updateScrollUi, { passive: true });
  if (backToTopButton) backToTopButton.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }); });

  function dismissPrivacyNote() {
    if (!privacyNote) return;
    privacyNote.classList.add('is-hidden');
    writeStored('kv-privacy-notice', 'acknowledged');
  }
  if (readStored('kv-privacy-notice') === 'acknowledged' && privacyNote) privacyNote.classList.add('is-hidden');
  privacyButtons.forEach(function (button) { button.addEventListener('click', dismissPrivacyNote); });
}());
