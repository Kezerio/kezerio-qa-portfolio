(() => {
  'use strict';

  const translations = {
    ru: {
      title: 'API Lab просыпается - Константин Васильев',
      description: 'Сервер QA API Lab просыпается на бесплатном Render. Пока ждём, сыграйте в три короткие QA-игры и соберите два собственных API-теста.',
      skip: 'К мини-играм',
      logoLabel: 'Вернуться в портфолио',
      languageLabel: 'Выбор языка',
      portfolio: 'Портфолио',
      heroTitle: '<span>API LAB</span><span>ПРОСЫПАЕТСЯ.</span>',
      heroLead: 'Бесплатный сервер Render засыпает после 15 минут без запросов. Первый запуск обычно занимает до минуты. Мы уже отправили сигнал и проверяем готовность.',
      openDirect: 'Открыть напрямую',
      stayPlay: 'Остаться и доиграть',
      gamesTitle: 'Три игры.<br />Ноль скуки.',
      gamesLabel: 'Мини-игры',
      statusTitle: 'Какой HTTP-код вернётся?',
      jsonTitle: 'Найдите поле с ошибкой.',
      jsonPrompt: 'Контракт ожидал роль тестировщика. Какое поле сломано?',
      boundaryTitle: 'Поймайте две внешние границы.',
      boundaryPrompt: 'Допустимое количество товара: от 1 до 99 включительно. Выберите два значения, которые должны дать 422.',
      boundaryCheck: 'Проверить выбор',
      whyTitle: 'Почему ждём?',
      whyText: 'Render останавливает бесплатный web service после 15 минут без входящего трафика.',
      whatTitle: 'Что происходит?',
      whatText: 'Первый HTTP-запрос запускает новый экземпляр приложения. Обычно это занимает около минуты.',
      nextTitle: 'Что дальше?',
      nextText: 'Когда `/health` вернёт 200, эта страница автоматически переведёт вас в живую лабораторию.',
      openingLab: 'Открываю лабораторию через',
      stayHere: 'Остаться здесь',
      privacy: 'Cookies и трекеры не используются',
      backToTop: 'Наверх',
      startingMessage: 'Отправляю первый запрос...',
      readyMessage: 'Сервер проснулся. Лаборатория готова к реальным запросам.',
      wakeSent: 'Render получил запрос и запускает экземпляр приложения.',
      wakeWaiting: 'Сервер ещё собирается. Следующая проверка уже запланирована.',
      chooseStatus: 'Выберите код ответа.',
      correct: 'Верно.',
      wrong: 'Не совсем. Правильный ответ:',
      jsonChoose: 'Сравните значения и выберите ключ.',
      jsonCorrect: 'Верно. role отличается от контракта: tester вместо admin.',
      jsonWrong: 'Посмотрите ещё раз на значения в двух ответах.',
      boundaryChoose: 'Нужно выбрать ровно два значения.',
      boundaryCorrect: 'Верно. 0 ниже минимума, а 100 выше максимума.',
      boundaryWrong: 'Нужны две внешние границы: значение до минимума и после максимума.',
      toolsTitle: 'Ваши данные.<br />Мой подход.',
      toolsIntro: 'Введите маршрут или границы поля. Инструменты ничего не отправляют на сервер и собирают QA-чек-листы прямо в браузере.',
      requestToolTitle: 'Соберите API-проверку',
      requestToolText: 'Выберите метод, укажите маршрут и ожидаемый статус. На выходе будет компактный сценарий проверки.',
      methodLabel: 'HTTP-метод',
      pathLabel: 'Маршрут',
      statusLabel: 'Ожидаемый статус',
      pathPlaceholder: '/api/orders/17',
      buildScenario: 'Собрать сценарий',
      requestPathError: 'Маршрут должен начинаться с / и не содержать пробелы.',
      requestLabel: 'ЗАПРОС',
      expectLabel: 'ОЖИДАНИЕ',
      checklistLabel: 'ЧЕК-ЛИСТ',
      requestChecks: [
        'Сверить status code с контрактом',
        'Проверить Content-Type и обязательные headers',
        'Проверить JSON-схему и обязательные поля',
      ],
      requestReadCheck: 'Повторить маршрут с несуществующим ID и проверить 404',
      requestWriteCheck: 'Отправить невалидный JSON и проверить 400 или 422',
      requestDeleteCheck: 'Повторить удаление и проверить идемпотентность или 404',
      matrixToolTitle: 'Создайте матрицу границ',
      matrixToolText: 'Задайте имя числового поля и допустимый диапазон. Инструмент предложит позитивные и негативные значения.',
      fieldLabel: 'Имя поля',
      fieldPlaceholder: 'quantity',
      minLabel: 'Минимум',
      maxLabel: 'Максимум',
      requiredLabel: 'Поле обязательное',
      buildMatrix: 'Построить матрицу',
      matrixInputError: 'Укажите имя поля и целые числа от -999999 до 999999.',
      matrixRangeError: 'Минимум не может быть больше максимума.',
      matrixLabel: 'МАТРИЦА',
      emptyValue: '<пусто>',
      matrixCases: {
        below: 'ниже минимума, ожидаем ошибку валидации',
        lower: 'нижняя граница, ожидаем принятие',
        inside: 'значение внутри диапазона',
        typical: 'типичное значение',
        upper: 'верхняя граница, ожидаем принятие',
        above: 'выше максимума, ожидаем ошибку валидации',
        empty: 'пусто, проверяем обязательность',
        type: 'строка вместо числа, проверяем тип данных',
      },
      questions: [
        { text: 'Валидный формат логина, но пароль не совпал.', answer: 401, hint: 'Формат принят, но авторизация не прошла.' },
        { text: 'Запрошен заказ с несуществующим ID.', answer: 404, hint: 'Ресурс не найден.' },
        { text: 'Количество товара равно 0 при допустимой границе от 1.', answer: 422, hint: 'Входные данные не прошли валидацию.' },
        { text: 'Корректный запрос успешно обработан.', answer: 200, hint: 'Ожидаемый успешный ответ.' },
      ],
    },
    en: {
      title: 'API Lab is waking up - Konstantin Vasiliev',
      description: 'QA API Lab is waking up on free Render hosting. Play three short QA games and build two API tests while you wait.',
      skip: 'Skip to mini games',
      logoLabel: 'Back to portfolio',
      languageLabel: 'Language switcher',
      portfolio: 'Portfolio',
      heroTitle: '<span>API LAB</span><span>IS WAKING UP.</span>',
      heroLead: 'The free Render server sleeps after 15 minutes without requests. A first launch usually takes up to a minute. We have already sent the wake signal and are checking readiness.',
      openDirect: 'Open directly',
      stayPlay: 'Stay and finish playing',
      gamesTitle: 'Three games.<br />Zero boredom.',
      gamesLabel: 'Mini games',
      statusTitle: 'Which HTTP status returns?',
      jsonTitle: 'Find the incorrect field.',
      jsonPrompt: 'The contract expected a tester role. Which field is wrong?',
      boundaryTitle: 'Catch the two outer boundaries.',
      boundaryPrompt: 'The valid item quantity is 1 through 99 inclusive. Select the two values that should return 422.',
      boundaryCheck: 'Check selection',
      whyTitle: 'Why wait?',
      whyText: 'Render stops a free web service after 15 minutes without inbound traffic.',
      whatTitle: 'What is happening?',
      whatText: 'The first HTTP request starts a new application instance. This usually takes about a minute.',
      nextTitle: 'What happens next?',
      nextText: 'When `/health` returns 200, this page automatically takes you to the live lab.',
      openingLab: 'Opening the lab in',
      stayHere: 'Stay here',
      privacy: 'No cookies or trackers are used',
      backToTop: 'Back to top',
      startingMessage: 'Sending the first request...',
      readyMessage: 'The server is awake. The lab is ready for real requests.',
      wakeSent: 'Render received the request and is starting the application instance.',
      wakeWaiting: 'The server is still starting. The next check is already scheduled.',
      chooseStatus: 'Choose the response status.',
      correct: 'Correct.',
      wrong: 'Not quite. The correct answer is:',
      jsonChoose: 'Compare both values and select the key.',
      jsonCorrect: 'Correct. role differs from the contract: tester instead of admin.',
      jsonWrong: 'Look at the values in both responses again.',
      boundaryChoose: 'Select exactly two values.',
      boundaryCorrect: 'Correct. 0 is below the minimum and 100 is above the maximum.',
      boundaryWrong: 'Choose the two outer boundaries: one below the minimum and one above the maximum.',
      toolsTitle: 'Your data.<br />My approach.',
      toolsIntro: 'Enter a route or field boundaries. The tools send nothing to a server and build QA checklists directly in your browser.',
      requestToolTitle: 'Build an API check',
      requestToolText: 'Choose a method, enter a route and set the expected status. The result is a compact test scenario.',
      methodLabel: 'HTTP method',
      pathLabel: 'Route',
      statusLabel: 'Expected status',
      pathPlaceholder: '/api/orders/17',
      buildScenario: 'Build scenario',
      requestPathError: 'The route must start with / and contain no spaces.',
      requestLabel: 'REQUEST',
      expectLabel: 'EXPECT',
      checklistLabel: 'CHECKLIST',
      requestChecks: [
        'Match the status code against the contract',
        'Check Content-Type and required headers',
        'Validate the JSON schema and required fields',
      ],
      requestReadCheck: 'Repeat the route with a missing ID and check for 404',
      requestWriteCheck: 'Send invalid JSON and check for 400 or 422',
      requestDeleteCheck: 'Repeat the delete request and check idempotency or 404',
      matrixToolTitle: 'Create a boundary matrix',
      matrixToolText: 'Set a numeric field name and its valid range. The tool suggests positive and negative values.',
      fieldLabel: 'Field name',
      fieldPlaceholder: 'quantity',
      minLabel: 'Minimum',
      maxLabel: 'Maximum',
      requiredLabel: 'Field is required',
      buildMatrix: 'Build matrix',
      matrixInputError: 'Enter a field name and whole numbers from -999999 to 999999.',
      matrixRangeError: 'The minimum cannot be greater than the maximum.',
      matrixLabel: 'MATRIX',
      emptyValue: '<empty>',
      matrixCases: {
        below: 'below minimum, expect a validation error',
        lower: 'lower boundary, expect acceptance',
        inside: 'value inside the valid range',
        typical: 'representative value',
        upper: 'upper boundary, expect acceptance',
        above: 'above maximum, expect a validation error',
        empty: 'empty, check the required rule',
        type: 'string instead of number, check type validation',
      },
      questions: [
        { text: 'The login format is valid, but the password does not match.', answer: 401, hint: 'The format is valid, but authorization failed.' },
        { text: 'A request uses an order ID that does not exist.', answer: 404, hint: 'The resource was not found.' },
        { text: 'The item quantity is 0 while the allowed minimum is 1.', answer: 422, hint: 'The input failed validation.' },
        { text: 'A valid request was processed successfully.', answer: 200, hint: 'This is the expected successful response.' },
      ],
    },
  };

  const productionTarget = 'https://qa-api-lab.onrender.com/';
  const query = new URLSearchParams(window.location.search);
  const requestedTarget = query.get('target');
  const isLocalPreview = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  const localTargets = ['http://127.0.0.1:8000/', 'http://localhost:8000/'];
  const targetUrl = isLocalPreview && localTargets.includes(requestedTarget) ? requestedTarget : productionTarget;
  const healthUrl = `${targetUrl}health`;
  const wakeConsole = document.querySelector('[data-wake-console]');
  const wakeState = document.querySelector('[data-wake-state]');
  const wakeSeconds = document.querySelector('[data-wake-seconds]');
  const wakeMessage = document.querySelector('[data-wake-message]');
  const wakeAttempts = document.querySelector('[data-wake-attempts]');
  const wakeMeter = document.querySelector('[data-wake-meter]');
  const wakeProgress = document.querySelector('[data-wake-progress]');
  const readyOverlay = document.querySelector('[data-ready-overlay]');
  const redirectCountdown = document.querySelector('[data-redirect-countdown]');
  const stayButton = document.querySelector('[data-stay]');
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const statusOptions = document.querySelector('[data-status-options]');
  const statusQuestion = document.querySelector('[data-status-question]');
  const statusFeedback = document.querySelector('[data-status-feedback]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const requestForm = document.querySelector('[data-request-tool]');
  const requestMethod = document.querySelector('[data-request-method]');
  const requestPath = document.querySelector('[data-request-path]');
  const requestStatus = document.querySelector('[data-request-status]');
  const requestOutput = document.querySelector('[data-request-output]');
  const matrixForm = document.querySelector('[data-matrix-tool]');
  const matrixField = document.querySelector('[data-matrix-field]');
  const matrixMin = document.querySelector('[data-matrix-min]');
  const matrixMax = document.querySelector('[data-matrix-max]');
  const matrixRequired = document.querySelector('[data-matrix-required]');
  const matrixOutput = document.querySelector('[data-matrix-output]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let startedAt = Date.now();
  let attempts = 0;
  let ready = false;
  let stayOnPage = isLocalPreview && query.get('stay') === '1';
  let probing = false;
  let statusIndex = 0;
  let statusScore = 0;
  let currentLanguage = readInitialLanguage();
  const boundarySelection = new Set();

  function readInitialLanguage() {
    const requested = query.get('lang');
    if (translations[requested]) return requested;
    try {
      const saved = window.localStorage.getItem('kv-site-language');
      return translations[saved] ? saved : 'ru';
    } catch {
      return 'ru';
    }
  }

  function labUrl() {
    return targetUrl;
  }

  function renderStatusQuestion() {
    const copy = translations[currentLanguage];
    const question = copy.questions[statusIndex];
    statusQuestion.textContent = question.text;
    document.querySelector('[data-status-score]').textContent = String(statusScore);
    document.querySelector('[data-status-total]').textContent = String(copy.questions.length);
    statusOptions.innerHTML = [200, 401, 404, 422].map((code) => `<button type="button" data-status-answer="${code}">${code}</button>`).join('');
  }

  function setLanguage(language) {
    currentLanguage = translations[language] ? language : 'ru';
    const copy = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = copy.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description);
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const value = copy[node.dataset.i18nPlaceholder];
      if (value) node.setAttribute('placeholder', value);
    });
    languageButtons.forEach((button) => {
      const active = button.dataset.language === currentLanguage;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('[data-open-lab]').href = labUrl();
    backToTop.setAttribute('aria-label', copy.backToTop);
    if (ready) {
      wakeState.textContent = 'HTTP 200 · ONLINE';
      wakeMessage.textContent = copy.readyMessage;
    } else if (attempts === 0) {
      wakeState.textContent = 'STARTING';
      wakeMessage.textContent = copy.startingMessage;
    } else {
      wakeState.textContent = attempts === 1 ? 'WAKE REQUEST SENT' : `CHECK ${attempts}`;
      wakeMessage.textContent = attempts === 1 ? copy.wakeSent : copy.wakeWaiting;
    }
    statusFeedback.className = 'game-feedback';
    statusFeedback.textContent = copy.chooseStatus;
    const jsonFeedback = document.querySelector('[data-json-feedback]');
    jsonFeedback.className = 'game-feedback';
    jsonFeedback.textContent = copy.jsonChoose;
    const boundaryFeedback = document.querySelector('[data-boundary-feedback]');
    boundaryFeedback.className = 'game-feedback';
    boundaryFeedback.textContent = copy.boundaryChoose;
    renderStatusQuestion();
    renderRequestBlueprint();
    renderBoundaryMatrix();
    try { window.localStorage.setItem('kv-site-language', currentLanguage); } catch { /* preference is optional */ }
  }

  function setToolOutput(output, text, isError = false) {
    output.textContent = text;
    output.classList.toggle('is-error', isError);
  }

  function renderRequestBlueprint(shouldFocus = false) {
    const copy = translations[currentLanguage];
    const method = requestMethod.value;
    const path = requestPath.value.trim();
    const expectedStatus = requestStatus.value;
    const validPath = /^\/[^\s]*$/.test(path);
    requestPath.setAttribute('aria-invalid', String(!validPath));

    if (!validPath) {
      setToolOutput(requestOutput, copy.requestPathError, true);
      if (shouldFocus) requestPath.focus();
      return false;
    }

    const checks = [...copy.requestChecks];
    if (method === 'DELETE') checks.push(copy.requestDeleteCheck);
    else if (['POST', 'PUT', 'PATCH'].includes(method)) checks.push(copy.requestWriteCheck);
    else checks.push(copy.requestReadCheck);

    const numberedChecks = checks.map((check, index) => `${String(index + 1).padStart(2, '0')}  ${check}`).join('\n');
    const scenario = `${copy.requestLabel}\n${method} ${path}\n\n${copy.expectLabel}\nHTTP ${expectedStatus}\n\n${copy.checklistLabel}\n${numberedChecks}`;
    setToolOutput(requestOutput, scenario);
    if (shouldFocus) requestOutput.focus({ preventScroll: true });
    return true;
  }

  function renderBoundaryMatrix(shouldFocus = false) {
    const copy = translations[currentLanguage];
    const field = matrixField.value.trim();
    const minText = matrixMin.value.trim();
    const maxText = matrixMax.value.trim();
    const min = Number(minText);
    const max = Number(maxText);
    const validNumbers = minText !== '' && maxText !== '' && Number.isSafeInteger(min) && Number.isSafeInteger(max) && Math.abs(min) <= 999999 && Math.abs(max) <= 999999;
    const validField = field.length > 0;

    matrixField.setAttribute('aria-invalid', String(!validField));
    matrixMin.setAttribute('aria-invalid', String(!validNumbers));
    matrixMax.setAttribute('aria-invalid', String(!validNumbers || (validNumbers && min > max)));

    if (!validField || !validNumbers) {
      setToolOutput(matrixOutput, copy.matrixInputError, true);
      if (shouldFocus) (validField ? matrixMin : matrixField).focus();
      return false;
    }
    if (min > max) {
      setToolOutput(matrixOutput, copy.matrixRangeError, true);
      if (shouldFocus) matrixMin.focus();
      return false;
    }

    const cases = [];
    const seen = new Set();
    const addCase = (value, description) => {
      const key = String(value);
      if (seen.has(key)) return;
      seen.add(key);
      cases.push({ value: key, description });
    };

    addCase(min - 1, copy.matrixCases.below);
    addCase(min, copy.matrixCases.lower);
    if (min + 1 < max) addCase(min + 1, copy.matrixCases.inside);
    const midpoint = Math.trunc((min + max) / 2);
    if (midpoint > min && midpoint < max) addCase(midpoint, copy.matrixCases.typical);
    if (max - 1 > min) addCase(max - 1, copy.matrixCases.inside);
    addCase(max, copy.matrixCases.upper);
    addCase(max + 1, copy.matrixCases.above);
    if (matrixRequired.checked) cases.push({ value: copy.emptyValue, description: copy.matrixCases.empty });
    cases.push({ value: '"text"', description: copy.matrixCases.type });

    const rows = cases.map((testCase, index) => `${String(index + 1).padStart(2, '0')}  ${field} = ${testCase.value}\n    ${testCase.description}`).join('\n');
    setToolOutput(matrixOutput, `${copy.matrixLabel} ${field}\n${rows}`);
    if (shouldFocus) matrixOutput.focus({ preventScroll: true });
    return true;
  }

  function updateTimer() {
    const seconds = Math.floor((Date.now() - startedAt) / 1000);
    wakeSeconds.textContent = String(seconds).padStart(2, '0');
    const visualProgress = Math.min(92, 6 + seconds * 1.35);
    wakeMeter.style.width = `${visualProgress}%`;
    wakeProgress.style.width = `${visualProgress}%`;
  }

  function showReady() {
    if (ready) return;
    ready = true;
    const copy = translations[currentLanguage];
    wakeConsole.classList.add('is-ready');
    wakeState.textContent = 'HTTP 200 · ONLINE';
    wakeMessage.textContent = copy.readyMessage;
    wakeMeter.style.width = '100%';
    wakeProgress.style.width = '100%';
    stayButton.hidden = false;
    readyOverlay.hidden = false;
    let count = 3;
    redirectCountdown.textContent = String(count);
    const redirectTimer = window.setInterval(() => {
      if (stayOnPage) {
        window.clearInterval(redirectTimer);
        readyOverlay.hidden = true;
        return;
      }
      count -= 1;
      redirectCountdown.textContent = String(Math.max(0, count));
      if (count <= 0) {
        window.clearInterval(redirectTimer);
        window.location.replace(labUrl());
      }
    }, 1000);
  }

  async function probeServer() {
    if (ready || probing) return;
    probing = true;
    attempts += 1;
    const copy = translations[currentLanguage];
    wakeAttempts.textContent = String(attempts);
    wakeState.textContent = attempts === 1 ? 'WAKE REQUEST SENT' : `CHECK ${attempts}`;
    wakeMessage.textContent = attempts === 1 ? copy.wakeSent : copy.wakeWaiting;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch(`${healthUrl}?wake=${Date.now()}`, { cache: 'no-store', mode: 'cors', signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const body = await response.json();
      if (body.status === 'ok') showReady();
    } catch {
      if (!ready) window.setTimeout(probeServer, 3500);
    } finally {
      window.clearTimeout(timeout);
      probing = false;
    }
  }

  function markPlaying() {
    stayOnPage = true;
    stayButton.hidden = true;
  }

  document.querySelectorAll('[data-game-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      markPlaying();
      const game = button.dataset.gameTab;
      document.querySelectorAll('[data-game-tab]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('[data-game-panel]').forEach((panel) => {
        const active = panel.dataset.gamePanel === game;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    });
  });

  statusOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-status-answer]');
    if (!button) return;
    markPlaying();
    const copy = translations[currentLanguage];
    const question = copy.questions[statusIndex];
    const answer = Number(button.dataset.statusAnswer);
    const correct = answer === question.answer;
    statusFeedback.classList.remove('is-correct', 'is-wrong');
    statusFeedback.classList.add(correct ? 'is-correct' : 'is-wrong');
    statusFeedback.textContent = correct ? `${copy.correct} ${question.hint}` : `${copy.wrong} ${question.answer}. ${question.hint}`;
    if (correct) statusScore += 1;
    statusIndex = (statusIndex + 1) % copy.questions.length;
    window.setTimeout(renderStatusQuestion, 1000);
  });

  document.querySelector('[data-json-options]').addEventListener('click', (event) => {
    const button = event.target.closest('[data-json-answer]');
    if (!button) return;
    markPlaying();
    const correct = button.dataset.jsonAnswer === 'role';
    const feedback = document.querySelector('[data-json-feedback]');
    feedback.classList.remove('is-correct', 'is-wrong');
    feedback.classList.add(correct ? 'is-correct' : 'is-wrong');
    feedback.textContent = correct ? translations[currentLanguage].jsonCorrect : translations[currentLanguage].jsonWrong;
  });

  document.querySelector('[data-boundary-options]').addEventListener('click', (event) => {
    const button = event.target.closest('[data-boundary-value]');
    if (!button) return;
    markPlaying();
    const value = Number(button.dataset.boundaryValue);
    if (boundarySelection.has(value)) boundarySelection.delete(value);
    else if (boundarySelection.size < 2) boundarySelection.add(value);
    button.classList.toggle('is-selected', boundarySelection.has(value));
  });

  document.querySelector('[data-boundary-check]').addEventListener('click', () => {
    markPlaying();
    const correct = boundarySelection.size === 2 && boundarySelection.has(0) && boundarySelection.has(100);
    const feedback = document.querySelector('[data-boundary-feedback]');
    feedback.classList.remove('is-correct', 'is-wrong');
    feedback.classList.add(correct ? 'is-correct' : 'is-wrong');
    feedback.textContent = correct ? translations[currentLanguage].boundaryCorrect : translations[currentLanguage].boundaryWrong;
  });

  requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    markPlaying();
    renderRequestBlueprint(true);
  });

  matrixForm.addEventListener('submit', (event) => {
    event.preventDefault();
    markPlaying();
    renderBoundaryMatrix(true);
  });
  [requestForm, matrixForm].forEach((form) => form.addEventListener('input', markPlaying, { once: true }));

  function stay() {
    stayOnPage = true;
    readyOverlay.hidden = true;
    stayButton.hidden = true;
  }

  function updateBackToTop() {
    const visible = window.scrollY > Math.min(560, window.innerHeight * .7);
    backToTop.classList.toggle('is-visible', visible);
    backToTop.setAttribute('aria-hidden', String(!visible));
    backToTop.tabIndex = visible ? 0 : -1;
  }

  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  stayButton.addEventListener('click', stay);
  document.querySelector('[data-stay-overlay]').addEventListener('click', stay);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
  setLanguage(currentLanguage);
  updateBackToTop();
  updateTimer();
  window.setInterval(updateTimer, 1000);
  probeServer();
})();
