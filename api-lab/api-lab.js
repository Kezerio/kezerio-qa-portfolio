(() => {
  'use strict';

  const productionTarget = 'https://qa-api-lab.onrender.com/';
  const query = new URLSearchParams(window.location.search);
  const requestedTarget = query.get('target');
  const isLocalPreview = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  const localTargets = ['http://127.0.0.1:8000/', 'http://localhost:8000/'];
  const targetUrl = isLocalPreview && localTargets.includes(requestedTarget)
    ? requestedTarget
    : productionTarget;
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

  let startedAt = Date.now();
  let attempts = 0;
  let ready = false;
  let stayOnPage = isLocalPreview && query.get('stay') === '1';
  let probing = false;

  const statusQuestions = [
    { text: 'Валидный формат логина, но пароль не совпал.', answer: 401, hint: 'Формат принят, но авторизация не прошла.' },
    { text: 'Запрошен заказ с несуществующим ID.', answer: 404, hint: 'Ресурс не найден.' },
    { text: 'Количество товара равно 0 при допустимой границе от 1.', answer: 422, hint: 'Входные данные не прошли валидацию.' },
    { text: 'Корректный запрос успешно обработан.', answer: 200, hint: 'Ожидаемый успешный ответ.' },
  ];
  let statusIndex = 0;
  let statusScore = 0;
  const statusOptions = document.querySelector('[data-status-options]');
  const statusQuestion = document.querySelector('[data-status-question]');
  const statusFeedback = document.querySelector('[data-status-feedback]');
  const boundarySelection = new Set();

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
    wakeConsole.classList.add('is-ready');
    wakeState.textContent = 'HTTP 200 · ONLINE';
    wakeMessage.textContent = 'Сервер проснулся. Лаборатория готова к реальным запросам.';
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
        window.location.replace(targetUrl);
      }
    }, 1000);
  }

  async function probeServer() {
    if (ready || probing) return;
    probing = true;
    attempts += 1;
    wakeAttempts.textContent = String(attempts);
    wakeState.textContent = attempts === 1 ? 'WAKE REQUEST SENT' : `CHECK ${attempts}`;
    wakeMessage.textContent = attempts === 1
      ? 'Render получил запрос и запускает экземпляр приложения.'
      : 'Сервер ещё собирается. Следующая проверка уже запланирована.';

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch(`${healthUrl}?wake=${Date.now()}`, {
        cache: 'no-store',
        mode: 'cors',
        signal: controller.signal,
      });
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

  function renderStatusQuestion() {
    const question = statusQuestions[statusIndex];
    statusQuestion.textContent = question.text;
    document.querySelector('[data-status-score]').textContent = String(statusScore);
    document.querySelector('[data-status-total]').textContent = String(statusQuestions.length);
    statusOptions.innerHTML = [200, 401, 404, 422].map((code) => `<button type="button" data-status-answer="${code}">${code}</button>`).join('');
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
    const question = statusQuestions[statusIndex];
    const answer = Number(button.dataset.statusAnswer);
    const correct = answer === question.answer;
    statusFeedback.classList.remove('is-correct', 'is-wrong');
    statusFeedback.classList.add(correct ? 'is-correct' : 'is-wrong');
    statusFeedback.textContent = correct ? `Верно. ${question.hint}` : `Не совсем. Правильный ответ: ${question.answer}. ${question.hint}`;
    if (correct) statusScore += 1;
    statusIndex = (statusIndex + 1) % statusQuestions.length;
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
    feedback.textContent = correct ? 'Верно. role отличается от контракта: tester вместо admin.' : 'Посмотрите ещё раз на значения в двух ответах.';
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
    feedback.textContent = correct ? 'Верно. 0 ниже минимума, а 100 выше максимума.' : 'Нужны две внешние границы: значение до минимума и после максимума.';
  });

  function stay() {
    stayOnPage = true;
    readyOverlay.hidden = true;
    stayButton.hidden = true;
  }

  stayButton.addEventListener('click', stay);
  document.querySelector('[data-stay-overlay]').addEventListener('click', stay);
  document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
  renderStatusQuestion();
  updateTimer();
  window.setInterval(updateTimer, 1000);
  probeServer();
})();
