(function () {
  'use strict';

  var translations = {
    ru: {
      title: 'Константин Васильев - AI Product Specialist / AI-Assisted QA',
      description: 'Портфолио Константина Васильева: 4 года в технической поддержке и интеграциях, Web/API QA, Android-проекты и AI-assisted разработка.',
      skip: 'К содержанию', homeLabel: 'В начало страницы', navLabel: 'Основная навигация', languageLabel: 'Выбор языка', navRole: 'AI PRODUCT + QA', brandPulseLabel: 'Запустить импульс Humanizm и вернуться наверх', brandPulseStatus: 'Импульс Humanizm запущен',
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
      proofLabel: 'ПРОЕКТЫ И ПРАКТИКА / 02', proofTitle: 'Можно открыть.<br /><i>И проверить.</i>', proofLead: 'Работающие проекты, опубликованные приложения и документы с понятным контекстом.',
      projectGame: 'Две выпущенные игры в RuStore. Веду идею, требования, постановку задач Codex, ручную проверку, ретест и публикацию.',
      projectCases: 'Шесть воспроизводимых дефектов Web, accessibility, iOS и Game QA: окружение, шаги, actual/expected, severity, priority и доказательства.',
      projectApi: 'GET и POST, JSON, headers, коды 200/401/404/422, негативные и граничные проверки, 9 pytest-тестов и GitHub Actions.',
      apiDetailsLabel: 'Детали API практики',
      signalLabel: 'QA SIGNAL / ИНТЕРАКТИВНОЕ ДЕМО', signalTitle: 'Как я превращаю<br /><i>«не работает» в проверку.</i>', signalIntro: 'Выберите сигнал. Ниже появится короткий маршрут диагностики: от контекста до проверяемого результата.', signalControlsLabel: 'Выберите тестовый сигнал',
      signalCalls: 'Нет входящих звонков', signalApi: 'API вернул 401', signalIntegration: 'Интеграция молчит', signalStepContext: '01 / КОНТЕКСТ', signalStepHypothesis: '02 / ГИПОТЕЗА', signalStepCheck: '03 / ПРОВЕРКА', signalStepResult: '04 / РЕЗУЛЬТАТ', signalNote: 'Это демонстрация подхода, а не автоматическая диагностика.',
      signalCases: {
        calls: { context: 'Фиксирую время, направление звонка, номер, устройство и состояние SIP-регистрации.', hypothesis: 'Проверяю настройку маршрута, двойную регистрацию и возможную блокировку оператора.', check: 'Отделяю аккаунт, устройство и сеть, затем сверяю журнал звонков и конфигурацию.', result: 'Исправляю настройку или передаю инженерам точные метки времени, условия и доказательства.' },
        api: { context: 'Повторяю запрос с известными данными и сохраняю URL, метод, headers и тело ответа.', hypothesis: 'Токен отсутствует, истёк, передан не в той схеме или не имеет доступа к ресурсу.', check: 'Сверяю Authorization, срок токена, права и поведение того же endpoint с валидными и невалидными данными.', result: 'Отделяю ошибку клиента от дефекта авторизации и прикладываю воспроизводимый request/response.' },
        integration: { context: 'Уточняю, какое действие не синхронизировалось, для какого объекта, аккаунта и в какое время.', hypothesis: 'Ошибка настройки, маппинга полей, доступа или временный сбой одной из сторон.', check: 'Сверяю идентификаторы, права, обязательные поля, журналы и контрольный объект с минимальными данными.', result: 'Восстанавливаю настройку или формирую тикет с условиями, шагами, ID, временем и ожидаемым поведением.' }
      },
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
      feedbackOpen: 'Обратная связь', feedbackEyebrow: 'ОБРАТНАЯ СВЯЗЬ / БЕЗ РЕГИСТРАЦИИ', feedbackTitle: 'Расскажите<br /><i>по делу.</i>', feedbackClose: 'Закрыть форму', feedbackIntro: 'Можно предложить улучшение, сообщить об ошибке или обсудить работу. Поля с * обязательны.', feedbackName: 'Имя *', feedbackNamePlaceholder: 'До 30 символов', feedbackEmail: 'Email для ответа *', feedbackMessage: 'Сообщение *', feedbackMessagePlaceholder: 'Что вы заметили или хотите обсудить?', feedbackFile: 'Файл, если нужен', feedbackFileHint: 'PDF, PNG, JPG, WEBP, TXT, DOC или DOCX. До 10 МБ.', feedbackFileEmpty: 'Файл не выбран', feedbackFileReady: 'Выбран файл: ', feedbackFileTooLarge: 'Файл больше 10 МБ. Выберите файл меньшего размера.', feedbackWarning: 'Не прикладывайте пароли, токены, документы с платёжными или другими секретными данными.', feedbackConsent: 'Согласен на обработку имени, email, сообщения и выбранного файла для ответа. Данные передаются через FormSubmit и электронную почту.', feedbackPrivacy: 'Подробнее о приватности ↗', feedbackSubmit: 'Продолжить отправку ↗', feedbackOpening: 'Открываю отправку...', feedbackSubmitNote: 'Защищённая отправка откроется в новой вкладке. FormSubmit может попросить пройти CAPTCHA.', feedbackOpened: 'Отправка открыта в новой вкладке.', emailLabel: 'Email', emailCopied: 'Скопировано ✓', emailCopyStatus: 'Email скопирован: wampirkost@bk.ru', emailCopyFailed: 'Не удалось скопировать. Адрес: wampirkost@bk.ru',
      privacyLink: 'Приватность и данные', privacyTitle: 'Здесь нет рекламных cookies', privacyText: 'Язык и отметка закрытия хранятся в localStorage. Данные формы передаются FormSubmit только после вашего согласия и отправки. Рекламы и аналитики нет.', privacyAccept: 'Понятно', privacyMore: 'Подробнее', privacyClose: 'Закрыть уведомление', backToTop: 'Наверх'
    },
    en: {
      title: 'Konstantin Vasiliev - AI Product Specialist / AI-Assisted QA',
      description: 'Konstantin Vasiliev portfolio: 4 years in technical support and integrations, Web/API QA, Android projects and AI-assisted development.',
      skip: 'Skip to content', homeLabel: 'Back to the top', navLabel: 'Main navigation', languageLabel: 'Language selection', navRole: 'AI PRODUCT + QA', brandPulseLabel: 'Trigger the Humanizm pulse and return to the top', brandPulseStatus: 'Humanizm pulse triggered',
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
      proofLabel: 'PROJECTS AND PRACTICE / 02', proofTitle: 'Open it.<br /><i>Verify it.</i>', proofLead: 'Working projects, released applications and contextual documentation that can be opened and reviewed.',
      projectGame: 'Two games released in RuStore. I own the concept, requirements, Codex tasks, manual checks, retests and publication.',
      projectCases: 'Six reproducible Web, accessibility, iOS and Game QA defects with environment, steps, actual/expected, severity, priority and evidence.',
      projectApi: 'GET and POST, JSON, headers, 200/401/404/422 statuses, negative and boundary checks, 9 pytest tests and GitHub Actions.',
      apiDetailsLabel: 'API practice details',
      signalLabel: 'QA SIGNAL / INTERACTIVE DEMO', signalTitle: 'How I turn<br /><i>“it does not work” into a test.</i>', signalIntro: 'Choose a signal. A short diagnostic route will appear below, from context to a verifiable result.', signalControlsLabel: 'Choose a test signal',
      signalCalls: 'No incoming calls', signalApi: 'API returned 401', signalIntegration: 'Integration is silent', signalStepContext: '01 / CONTEXT', signalStepHypothesis: '02 / HYPOTHESIS', signalStepCheck: '03 / CHECK', signalStepResult: '04 / RESULT', signalNote: 'This is a demonstration of the approach, not automated diagnostics.',
      signalCases: {
        calls: { context: 'I capture the time, call direction, number, device and SIP registration state.', hypothesis: 'I check routing settings, duplicate registration and possible carrier-side blocking.', check: 'I isolate the account, device and network, then compare call logs and configuration.', result: 'I fix the setting or give engineers exact timestamps, conditions and evidence.' },
        api: { context: 'I repeat the request with known data and preserve the URL, method, headers and response body.', hypothesis: 'The token is missing, expired, uses the wrong scheme or lacks access to the resource.', check: 'I compare Authorization, token lifetime, permissions and the same endpoint with valid and invalid data.', result: 'I separate a client mistake from an authorization defect and attach a reproducible request and response.' },
        integration: { context: 'I identify which action failed to sync, for which object and account, and at what time.', hypothesis: 'A configuration, field mapping or permission issue, or a temporary failure on either side.', check: 'I compare identifiers, permissions, required fields, logs and a minimal control object.', result: 'I restore the setting or create a ticket with conditions, steps, IDs, timestamps and expected behavior.' }
      },
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
      feedbackOpen: 'Feedback', feedbackEyebrow: 'FEEDBACK / NO ACCOUNT NEEDED', feedbackTitle: 'Tell me<br /><i>what matters.</i>', feedbackClose: 'Close form', feedbackIntro: 'Suggest an improvement, report an issue or discuss work. Fields marked * are required.', feedbackName: 'Name *', feedbackNamePlaceholder: 'Up to 30 characters', feedbackEmail: 'Reply email *', feedbackMessage: 'Message *', feedbackMessagePlaceholder: 'What did you notice or want to discuss?', feedbackFile: 'Optional file', feedbackFileHint: 'PDF, PNG, JPG, WEBP, TXT, DOC or DOCX. Up to 10 MB.', feedbackFileEmpty: 'No file selected', feedbackFileReady: 'Selected file: ', feedbackFileTooLarge: 'The file is larger than 10 MB. Choose a smaller file.', feedbackWarning: 'Do not attach passwords, tokens, payment details or other secrets.', feedbackConsent: 'I consent to processing my name, email, message and selected file for a reply. Data is transferred through FormSubmit and email.', feedbackPrivacy: 'Privacy details ↗', feedbackSubmit: 'Continue to send ↗', feedbackOpening: 'Opening secure send...', feedbackSubmitNote: 'Secure submission opens in a new tab. FormSubmit may ask you to complete a CAPTCHA.', feedbackOpened: 'Submission opened in a new tab.', emailLabel: 'Email', emailCopied: 'Copied ✓', emailCopyStatus: 'Email copied: wampirkost@bk.ru', emailCopyFailed: 'Could not copy. Address: wampirkost@bk.ru',
      privacyLink: 'Privacy and data', privacyTitle: 'No advertising cookies here', privacyText: 'localStorage keeps the language and notice dismissal. Form data is sent to FormSubmit only after your consent and submission. There are no ads or analytics.', privacyAccept: 'Got it', privacyMore: 'Details', privacyClose: 'Close notice', backToTop: 'Back to top'
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
  var brandPulse = document.querySelector('[data-brand-pulse]');
  var brandRole = document.querySelector('[data-brand-role]');
  var brandLive = document.querySelector('[data-brand-live]');
  var signalButtons = Array.from(document.querySelectorAll('[data-signal-case]'));
  var signalRoute = document.querySelector('.humanizm-signal-lab__route');
  var signalSteps = Array.from(document.querySelectorAll('[data-signal-step]'));
  var feedbackDialog = document.querySelector('[data-feedback-dialog]');
  var feedbackForm = document.querySelector('[data-feedback-form]');
  var feedbackOpenButtons = Array.from(document.querySelectorAll('[data-feedback-open]'));
  var feedbackCloseButton = document.querySelector('[data-feedback-close]');
  var feedbackLanguage = document.querySelector('[data-feedback-language]');
  var feedbackFile = document.querySelector('[data-feedback-file]');
  var feedbackFileStatus = document.querySelector('[data-feedback-file-status]');
  var feedbackSubmit = document.querySelector('[data-feedback-submit]');
  var nameInput = feedbackForm ? feedbackForm.querySelector('[name="name"]') : null;
  var messageInput = feedbackForm ? feedbackForm.querySelector('[name="message"]') : null;
  var nameCount = document.querySelector('[data-name-count]');
  var messageCount = document.querySelector('[data-message-count]');
  var copyEmailButton = document.querySelector('[data-copy-email]');
  var emailButtonLabel = document.querySelector('[data-email-button-label]');
  var emailStatus = document.querySelector('[data-email-status]');
  var siteToast = document.querySelector('[data-site-toast]');
  var currentLanguage = 'ru';
  var activeSignalCase = 'calls';
  var lastFeedbackTrigger = null;
  var brandPulseTimer = null;
  var brandPulseIndex = 0;
  var emailResetTimer = null;
  var toastTimer = null;
  var emailIsCopied = false;
  var maxAttachmentBytes = 10 * 1024 * 1024;

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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-placeholder');
      if (copy[key]) node.setAttribute('placeholder', copy[key]);
    });

    languageButtons.forEach(function (button) {
      var active = button.getAttribute('data-language') === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-cv-link]').forEach(function (link) {
      var fileName = selected === 'en' ? 'Konstantin_Vasiliev_CV_EN.pdf' : 'Konstantin_Vasiliev_CV_RU.pdf';
      link.setAttribute('href', 'cv/' + fileName);
      link.setAttribute('download', fileName);
    });
    document.querySelectorAll('a[href^="cases/"], a[href^="api-lab/"], a[href^="privacy/"]').forEach(function (link) {
      link.setAttribute('href', localizedHref(link.getAttribute('href'), selected));
    });
    if (feedbackLanguage) feedbackLanguage.value = selected;
    if (emailButtonLabel && !emailIsCopied) emailButtonLabel.textContent = copy.emailLabel;
    renderSignalCase();
    updateFeedbackFile();

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

  function renderSignalCase() {
    var cases = translations[currentLanguage].signalCases;
    var selectedCase = cases && cases[activeSignalCase] ? cases[activeSignalCase] : cases.calls;
    signalSteps.forEach(function (node) {
      var key = node.getAttribute('data-signal-step');
      if (selectedCase[key]) node.textContent = selectedCase[key];
    });
    if (signalRoute && !reducedMotion) {
      signalRoute.classList.remove('is-changing');
      window.requestAnimationFrame(function () {
        signalRoute.classList.add('is-changing');
        window.setTimeout(function () { signalRoute.classList.remove('is-changing'); }, 180);
      });
    }
  }

  signalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeSignalCase = button.getAttribute('data-signal-case');
      signalButtons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderSignalCase();
    });
  });

  if (brandPulse) {
    brandPulse.addEventListener('click', function () {
      var phases = ['CONTEXT / 01', 'EVIDENCE / 02', 'RETEST / 03'];
      window.clearTimeout(brandPulseTimer);
      document.body.classList.remove('is-brand-pulsing');
      void brandPulse.offsetWidth;
      document.body.classList.add('is-brand-pulsing');
      if (brandRole) brandRole.textContent = phases[brandPulseIndex % phases.length];
      brandPulseIndex += 1;
      if (brandLive) {
        brandLive.textContent = '';
        window.requestAnimationFrame(function () { brandLive.textContent = translations[currentLanguage].brandPulseStatus; });
      }
      brandPulseTimer = window.setTimeout(function () {
        document.body.classList.remove('is-brand-pulsing');
        if (brandRole) brandRole.textContent = translations[currentLanguage].navRole;
      }, reducedMotion ? 450 : 1250);
    });
  }

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

  function showToast(message) {
    if (!siteToast) return;
    window.clearTimeout(toastTimer);
    siteToast.textContent = message;
    siteToast.classList.add('is-visible');
    toastTimer = window.setTimeout(function () { siteToast.classList.remove('is-visible'); }, 3200);
  }

  function updateCount(input, output, limit) {
    if (input && output) output.textContent = input.value.length + ' / ' + limit;
  }
  if (nameInput) nameInput.addEventListener('input', function () { updateCount(nameInput, nameCount, 30); });
  if (messageInput) messageInput.addEventListener('input', function () { updateCount(messageInput, messageCount, 3000); });

  function updateFeedbackFile() {
    if (!feedbackFile || !feedbackFileStatus) return true;
    var copy = translations[currentLanguage];
    var file = feedbackFile.files && feedbackFile.files[0];
    var field = feedbackFile.closest('.humanizm-feedback__file');
    if (!file) {
      feedbackFile.setCustomValidity('');
      feedbackFile.removeAttribute('aria-invalid');
      if (field) field.classList.remove('has-error');
      feedbackFileStatus.textContent = copy.feedbackFileEmpty;
      return true;
    }
    if (file.size > maxAttachmentBytes) {
      feedbackFile.setCustomValidity(copy.feedbackFileTooLarge);
      feedbackFile.setAttribute('aria-invalid', 'true');
      if (field) field.classList.add('has-error');
      feedbackFileStatus.textContent = copy.feedbackFileTooLarge;
      return false;
    }
    feedbackFile.setCustomValidity('');
    feedbackFile.removeAttribute('aria-invalid');
    if (field) field.classList.remove('has-error');
    feedbackFileStatus.textContent = copy.feedbackFileReady + file.name;
    return true;
  }
  if (feedbackFile) feedbackFile.addEventListener('change', updateFeedbackFile);

  function openFeedback(trigger) {
    if (!feedbackDialog) return;
    lastFeedbackTrigger = trigger || document.activeElement;
    setMenu(false);
    if (typeof feedbackDialog.showModal === 'function') feedbackDialog.showModal();
    else feedbackDialog.setAttribute('open', '');
    document.body.classList.add('feedback-open');
    window.setTimeout(function () { if (nameInput) nameInput.focus(); }, 40);
  }

  function closeFeedback() {
    if (!feedbackDialog) return;
    if (typeof feedbackDialog.close === 'function' && feedbackDialog.open) feedbackDialog.close();
    else feedbackDialog.removeAttribute('open');
  }

  feedbackOpenButtons.forEach(function (button) { button.addEventListener('click', function () { openFeedback(button); }); });
  if (feedbackCloseButton) feedbackCloseButton.addEventListener('click', closeFeedback);
  if (feedbackDialog) {
    feedbackDialog.addEventListener('close', function () {
      document.body.classList.remove('feedback-open');
      if (lastFeedbackTrigger && typeof lastFeedbackTrigger.focus === 'function') lastFeedbackTrigger.focus();
    });
    feedbackDialog.addEventListener('cancel', function () { document.body.classList.remove('feedback-open'); });
    feedbackDialog.addEventListener('click', function (event) {
      if (event.target !== feedbackDialog) return;
      var rect = feedbackDialog.getBoundingClientRect();
      var inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) closeFeedback();
    });
  }

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (event) {
      if (!updateFeedbackFile()) {
        event.preventDefault();
        feedbackFile.reportValidity();
        feedbackFile.focus();
        return;
      }
      if (feedbackSubmit) {
        feedbackSubmit.disabled = true;
        feedbackSubmit.textContent = translations[currentLanguage].feedbackOpening;
      }
      window.setTimeout(function () {
        if (feedbackSubmit) {
          feedbackSubmit.disabled = false;
          feedbackSubmit.textContent = translations[currentLanguage].feedbackSubmit;
        }
        closeFeedback();
        showToast(translations[currentLanguage].feedbackOpened);
      }, 500);
    });
  }

  function fallbackCopy(value) {
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        var copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (copied) resolve(); else reject(new Error('copy failed'));
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  function copyEmail() {
    var address = 'wampirkost@bk.ru';
    var operation = navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(address) : fallbackCopy(address);
    operation.then(function () {
      emailIsCopied = true;
      window.clearTimeout(emailResetTimer);
      if (copyEmailButton) copyEmailButton.classList.add('is-copied');
      if (emailButtonLabel) emailButtonLabel.textContent = translations[currentLanguage].emailCopied;
      if (emailStatus) emailStatus.textContent = translations[currentLanguage].emailCopyStatus;
      emailResetTimer = window.setTimeout(function () {
        emailIsCopied = false;
        if (copyEmailButton) copyEmailButton.classList.remove('is-copied');
        if (emailButtonLabel) emailButtonLabel.textContent = translations[currentLanguage].emailLabel;
      }, 2200);
    }).catch(function () {
      if (emailStatus) emailStatus.textContent = translations[currentLanguage].emailCopyFailed;
      showToast(translations[currentLanguage].emailCopyFailed);
    });
  }
  if (copyEmailButton) copyEmailButton.addEventListener('click', copyEmail);

  function dismissPrivacyNote() {
    if (!privacyNote) return;
    privacyNote.classList.add('is-hidden');
    writeStored('kv-privacy-notice-20260905', 'acknowledged');
  }
  if (readStored('kv-privacy-notice-20260905') === 'acknowledged' && privacyNote) privacyNote.classList.add('is-hidden');
  privacyButtons.forEach(function (button) { button.addEventListener('click', dismissPrivacyNote); });
}());
