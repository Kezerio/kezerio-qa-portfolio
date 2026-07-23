(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

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

  var progressBars = Array.from(document.querySelectorAll('.kinetic-progress i, .fusion-progress i'));
  if (progressBars.length) {
    var updateProgress = function () {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBars.forEach(function (progressBar) {
        progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  var chipColors = ['#b6ff45', '#ff693d', '#f7a7e6', '#6ea8ff', '#fffce2'];
  document.querySelectorAll('.kinetic-chip-field button, .fusion-chip-field button').forEach(function (button, index) {
    button.style.setProperty('--chip-color', chipColors[index % chipColors.length]);
    button.style.setProperty('--chip-rotate', ((index % 5) - 2) + 'deg');
    button.addEventListener('click', function () {
      button.classList.toggle('is-active');
    });
  });

  var humanChoice = document.querySelector('[data-human-choice]');
  if (humanChoice) {
    var humanAnswer = humanChoice.querySelector('p');
    humanChoice.querySelectorAll('button[data-answer]').forEach(function (button) {
      button.addEventListener('click', function () {
        humanChoice.querySelectorAll('button').forEach(function (item) {
          item.classList.toggle('is-active', item === button);
        });
        humanAnswer.textContent = button.getAttribute('data-answer');
      });
    });
  }

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    var missionPortrait = document.querySelector('.mission-portrait');
    if (missionPortrait) {
      window.addEventListener('pointermove', function (event) {
        var x = (event.clientX / window.innerWidth - 0.5) * 12;
        var y = (event.clientY / window.innerHeight - 0.5) * 8;
        missionPortrait.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      }, { passive: true });
    }

    var fusionPortrait = document.querySelector('[data-fusion-portrait]');
    if (fusionPortrait) {
      window.addEventListener('pointermove', function (event) {
        var fusionX = (event.clientX / window.innerWidth - 0.5) * 14;
        var fusionY = (event.clientY / window.innerHeight - 0.5) * 9;
        fusionPortrait.style.transform = 'translate3d(' + fusionX + 'px,' + fusionY + 'px,0)';
      }, { passive: true });
    }

    var editorialWords = Array.from(document.querySelectorAll('.editorial-hero .word'));
    if (editorialWords.length) {
      window.addEventListener('pointermove', function (event) {
        var offset = (event.clientX / window.innerWidth - 0.5) * 8;
        editorialWords.forEach(function (word, index) {
          word.style.transform = 'translateX(' + (offset * (index % 2 ? -1 : 1)) + 'px)';
        });
      }, { passive: true });
    }
  }
}());
