(function () {
  'use strict';

  var translations = {
    ru: {
      title: 'Константин Васильев - QA / AI QA / Support / Game QA',
      description: 'Портфолио Константина Васильева: техническая поддержка, QA, AI QA, Web/API, Game QA, проекты и подтверждённая практика.',
      skip: 'К содержанию',
      navProof: 'Проекты',
      navStory: 'Обо мне',
      navGrowth: 'Рост',
      navLearning: 'Обучение',
      navContact: 'Контакт',
      write: 'Написать',
      heroName: 'КОНСТАНТИН ВАСИЛЬЕВ',
      heroLead: 'Работаю в технической поддержке и развиваюсь в QA. Люблю докапываться до причины, проверять факты и оставлять после себя понятный результат.',
      heroCta: 'Посмотреть работу',
      manifestoLabel: 'КРАТКО ОБО МНЕ / 01',
      manifestoTitle: 'Я не просто ищу ошибки. Я стараюсь понять, <i>почему</i> что-то не работает, и объяснить это <b>по-человечески.</b>',
      manifestoFact: 'В ТЕХНИЧЕСКОЙ ПОДДЕРЖКЕ С 2022 ГОДА',
      manifestoText: 'Мне знакома ситуация, когда человек говорит: «всё сломалось», а причины пока никто не знает. Я собираю контекст, повторяю сценарий, проверяю настройки и фиксирую результат так, чтобы следующему специалисту не пришлось начинать сначала.',
      proofLabel: 'ПРОЕКТЫ И ПРАКТИКА / 02',
      proofTitle: 'Не обещания.<br />Можно открыть.',
      projectGame: 'Собственная Android-игра. Я прошёл путь от идеи и сборки до проверки на телефоне и публикации в RuStore.',
      projectCases: 'Баг-репорты, expected / actual, чек-листы и тест-планы. Без абстракций, с условиями и доказательствами.',
      projectApi: 'Практическая лаборатория, где я работаю с HTTP, JSON, REST API и проверяю разные сценарии.',
      personLabel: 'ЧЕЛОВЕК ЗА РЕЗЮМЕ / 03',
      personTitle: 'Спокойный.<br />Технический.<br /><i>Любопытный.</i>',
      personText: 'Поддержка научила меня слышать людей и задавать точные вопросы. Телеком дал понимание систем и интеграций. Армия и спорт научили не бросать задачу, когда стало трудно. Игровые и AI-проекты помогают сохранять любопытство.',
      growthLabel: 'ЗОНА РОСТА / 04',
      growthTitle: 'На что<br />я опираюсь.',
      growthBaseLabel: '01 / ОПОРА',
      growthBaseTitle: 'Техническая поддержка',
      growthBaseText: 'Разбирал обращения, проверял сети и устройства, фиксировал результат и объяснял решение понятным языком.',
      growthNowLabel: '02 / СЕЙЧАС',
      growthNowTime: '2024-СЕЙЧАС',
      growthNowTitle: 'Специалист по сопровождению клиентов',
      growthNowText: 'Работаю с телефонией, виртуальной АТС, CRM-интеграциями и техническими обращениями. Передаю инженерные задачи с собранным контекстом.',
      growthPracticeLabel: '03 / ПРАКТИКА',
      growthPracticeTime: '2025-СЕЙЧАС',
      growthPracticeText: 'Делаю QA-материалы, проверяю API, собираю игровые прототипы и изучаю оценку качества AI-систем.',
      growthNextLabel: '04 / СЛЕДУЮЩИЙ ШАГ',
      growthNextText: 'Хочу отвечать за качество продукта в команде, где ценят наблюдательность, честность и понятный результат.',
      learningLabel: 'ОБУЧЕНИЕ / 05',
      learningTitle: 'Учусь.<br />Проверяю.<br />Применяю.',
      certificateAi: 'Основы ИИ',
      certificateAgents: 'Агенты и рабочие процессы',
      courseLabel: 'Сертификат о прохождении курса',
      toolsLabel: 'РАБОЧИЙ НАБОР / 06',
      toolsTitle: 'Инструменты<br />нужны для <i>дела.</i>',
      toolsHint: 'Нажмите на навык. Интерфейс тоже должен отвечать на действие.',
      contactLabel: 'МОЖНО ПРОСТО НАПИСАТЬ / 07',
      contactTitle: 'Давайте сделаем<br /><span>понятнее</span><br />вместе.',
      factFormat: 'Удалённая работа в приоритете',
      factLocation: 'Санкт-Петербург',
      factEnglish: 'Английский B1, продолжаю учиться',
      factStatus: 'Открыт к предложениям',
      contactText: 'Интересны позиции QA, AI QA, Game QA и технические роли, где пригодятся диагностика, поддержка и работа с интеграциями.',
      privacyNotice: 'Cookies и трекеры не используются'
    },
    en: {
      title: 'Konstantin Vasiliev - QA / AI QA / Support / Game QA',
      description: 'Portfolio of Konstantin Vasiliev: technical support, QA, AI QA, Web/API, Game QA, projects and hands-on practice.',
      skip: 'Skip to content',
      navProof: 'Projects',
      navStory: 'About',
      navGrowth: 'Growth',
      navLearning: 'Learning',
      navContact: 'Contact',
      write: 'Say hello',
      heroName: 'KONSTANTIN VASILIEV',
      heroLead: 'I work in technical support and grow into QA. I like getting to the real cause, checking facts and leaving a result that is easy to understand.',
      heroCta: 'See my work',
      manifestoLabel: 'ABOUT ME, BRIEFLY / 01',
      manifestoTitle: 'I do more than find errors. I try to understand <i>why</i> something fails and explain it <b>like a human.</b>',
      manifestoFact: 'WORKING IN TECHNICAL SUPPORT SINCE 2022',
      manifestoText: 'I know the moment when a user says that everything is broken and nobody knows why yet. I collect context, repeat the scenario, check the setup and document the result so the next specialist does not have to start over.',
      proofLabel: 'PROJECTS AND PRACTICE / 02',
      proofTitle: 'Not promises.<br />Open the work.',
      projectGame: 'My own Android game. I took it from idea and build to device checks and a public RuStore release.',
      projectCases: 'Bug reports, expected and actual results, checklists and test plans. Concrete conditions and evidence included.',
      projectApi: 'A hands-on lab where I work with HTTP, JSON, REST API and test different scenarios.',
      personLabel: 'THE PERSON BEHIND THE CV / 03',
      personTitle: 'Calm.<br />Technical.<br /><i>Curious.</i>',
      personText: 'Support taught me to listen and ask precise questions. Telecom gave me a feel for systems and integrations. The army and sports taught me not to quit when a task gets hard. Game and AI projects keep me curious.',
      growthLabel: 'GROWTH ZONE / 04',
      growthTitle: 'What I<br />build on.',
      growthBaseLabel: '01 / FOUNDATION',
      growthBaseTitle: 'Technical Support',
      growthBaseText: 'Handled requests, checked networks and devices, documented results and explained solutions in plain language.',
      growthNowLabel: '02 / NOW',
      growthNowTime: '2024-NOW',
      growthNowTitle: 'Customer Support Specialist',
      growthNowText: 'I work with telephony, virtual PBX, CRM integrations and technical requests. Engineering tasks are passed on with the context already collected.',
      growthPracticeLabel: '03 / PRACTICE',
      growthPracticeTime: '2025-NOW',
      growthPracticeText: 'I create QA materials, test APIs, build game prototypes and practice evaluating the quality of AI systems.',
      growthNextLabel: '04 / NEXT STEP',
      growthNextText: 'I want to own product quality in a team that values observation, honesty and clear results.',
      learningLabel: 'LEARNING / 05',
      learningTitle: 'Learn.<br />Test.<br />Apply.',
      certificateAi: 'AI Foundations',
      certificateAgents: 'Agents and Workflows',
      courseLabel: 'Course completion certificate',
      toolsLabel: 'WORKING TOOLKIT / 06',
      toolsTitle: 'Tools are<br />for <i>doing.</i>',
      toolsHint: 'Tap a skill. An interface should respond to an action too.',
      contactLabel: 'YOU CAN JUST SAY HELLO / 07',
      contactTitle: 'Let us make it<br /><span>clearer</span><br />together.',
      factFormat: 'Remote work preferred',
      factLocation: 'Saint Petersburg',
      factEnglish: 'English B1 and improving',
      factStatus: 'Open to opportunities',
      contactText: 'I am interested in QA, AI QA, Game QA and technical roles where diagnostics, support and integration experience are useful.',
      privacyNotice: 'No cookies or trackers are used'
    }
  };

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progressBar = document.querySelector('.fusion-progress i');
  var portrait = document.querySelector('[data-fusion-portrait]');
  var metaDescription = document.querySelector('meta[name="description"]');
  var languageButtons = Array.from(document.querySelectorAll('[data-language]'));
  var chipColors = ['#ccff52', '#ff704d', '#f7afd9', '#d8c7ff', '#f8f0e7'];

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  function setLanguage(language) {
    var selected = translations[language] ? language : 'ru';
    var copy = translations[selected];
    document.documentElement.lang = selected;
    document.title = copy.title;
    if (metaDescription) metaDescription.setAttribute('content', copy.description);

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      if (copy[key]) node.textContent = copy[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-html');
      if (copy[key]) node.innerHTML = copy[key];
    });

    languageButtons.forEach(function (button) {
      var active = button.getAttribute('data-language') === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-cv-link]').forEach(function (link) {
      link.setAttribute('href', selected === 'en' ? 'cv/Konstantin_Vasiliev_CV_EN.pdf' : 'cv/Konstantin_Vasiliev_CV_RU.pdf');
    });

    try {
      window.localStorage.setItem('kv-site-language', selected);
    } catch (error) {
      return;
    }
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.getAttribute('data-language'));
    });
  });

  var initialLanguage = 'ru';
  try {
    initialLanguage = window.localStorage.getItem('kv-site-language') || 'ru';
  } catch (error) {
    initialLanguage = 'ru';
  }
  setLanguage(initialLanguage);

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
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealItems.forEach(function (node) { revealObserver.observe(node); });
  }

  function updateProgress() {
    if (!progressBar) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  document.querySelectorAll('.fusion-chip-field button').forEach(function (button, index) {
    button.style.setProperty('--chip-color', chipColors[index % chipColors.length]);
    button.style.setProperty('--chip-rotate', ((index % 5) - 2) + 'deg');
    button.addEventListener('click', function () {
      button.classList.toggle('is-active');
    });
  });

}());
