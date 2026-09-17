// Prevent drawing and selecting text on the page.
document.addEventListener('selectstart', (event) => {
  event.preventDefault();
});

document.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

const pages = {
  back: 'back',
  play: 'play-menu',
  customize: 'customize-menu',
  credits: 'credits-menu',
  exitgame: 'exitgame',
  youdied: 'you-died',
};

const menuButtons = ['play', 'customize', 'credits', 'exitgame'];
const mainTitle = document.getElementById('main-title');
const background = document.getElementById('background');
const finalScore = document.getElementById('finalScore');
let gameStarted = false;
let gameInterval;

function stopGame() {
  gameStarted = false;
  clearInterval(gameInterval);
  gameInterval = undefined;
}

function setTitle(value) {
  if (mainTitle) {
    mainTitle.textContent = value;
  }
}

function setBackground(name) {
  background?.classList.remove(
    'background-home',
    'background-play',
    'background-credits',
    'background-customize',
    'background-died'
  );

  if (name) {
    background?.classList.add(`background-${name}`);
  }
}

function setButtonLayout(layout) {
  const buttons = document.getElementById('buttons');
  buttons?.classList.remove('top', 'middle', 'center');
  buttons?.classList.add(layout);
}

function showPage(pageId) {
  Object.values(pages).forEach((id) => {
    document.getElementById(id)?.classList.add('hide');
  });

  document.getElementById(pageId)?.classList.remove('hide');
}

function bindMenuButtons() {
  const menuActions = {
    back: () => {
      stopGame();
      showPage('back');
      document.getElementById('back')?.classList.add('hide');
      menuButtons.forEach((id) => {
        document.getElementById(id)?.classList.remove('hide');
      });
      setButtonLayout('center');
      setTitle('home');
      setBackground('home');
    },
    play: () => {
      showPage('play-menu');
      document.getElementById('back')?.classList.remove('hide');
      menuButtons.forEach((id) => {
        document.getElementById(id)?.classList.add('hide');
      });
      setButtonLayout('top');
      setTitle('play');
      setBackground('play');
    },
    customize: () => {
      showPage('customize-menu');
      document.getElementById('back')?.classList.remove('hide');
      menuButtons.forEach((id) => {
        document.getElementById(id)?.classList.add('hide');
      });
      setButtonLayout('top');
      setTitle('Customize your character!');
      setBackground('customize');
    },
    credits: () => {
      showPage('credits-menu');
      document.getElementById('back')?.classList.remove('hide');
      menuButtons.forEach((id) => {
        document.getElementById(id)?.classList.add('hide');
      });
      setButtonLayout('middle');
      setTitle('credits');
      setBackground('credits');
    },
  };

  Object.entries(menuActions).forEach(([buttonId, handler]) => {
    document.getElementById(buttonId)?.addEventListener('click', handler);
  });
}

bindMenuButtons();

document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result');
  const buttons = document.querySelectorAll('.optionbutton');
  const playImages = document.querySelectorAll('.play-image');
  const timingButton = document.getElementById('timing-button');
  const playButton = document.getElementById('play');
  const enemyImage = document.getElementById('enemy-image');
  const scoreDisplay = document.getElementById('Score');
  const deathScreen = document.getElementById('you-died');
  const playMenu = document.getElementById('play-menu');
  const savedCharacter = localStorage.getItem('character');

  function updateCharacter(character) {
    localStorage.setItem('character', character);

    if (result) {
      result.textContent = character;
    }

    playImages.forEach((image) => {
      const isSelected = image.dataset.character === character;
      image.classList.toggle('hide', !isSelected);
    });
  }

  function resetCharacterSelection() {
    if (savedCharacter) {
      updateCharacter(savedCharacter);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const character = button.dataset.character;

      if (character) {
        updateCharacter(character);
      }
    });
  });

  resetCharacterSelection();

  let difficulty = localStorage.getItem('difficulty') || 'easy';
  let score = 0;
  let enemyRightVw = 2;
  let lastTimingEvent = 0;

  function updateEnemyPosition() {
    if (!enemyImage) return;

    enemyImage.style.right = `${enemyRightVw}vw`;

    if (enemyRightVw > 75) {
      console.log('Game Over');
      console.log('Final Score: ' + score);

      if (finalScore) {
        finalScore.textContent = String(score);
      }

      setTitle('You died!');
      setBackground('died');
      playMenu?.classList.add('hide');
      deathScreen?.classList.remove('hide');
      document.getElementById('back')?.classList.add('hide');

      stopGame();
    }
  }
  function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    lastTimingEvent = Date.now();

    if (difficulty !== 'easy') {
      return;
    }

    gameInterval = setInterval(() => {
      if (!gameStarted) return;

      const randomNumber = Math.random();
      const eventIsDue = Date.now() - lastTimingEvent >= 6000;

      if (randomNumber < 0.25 || eventIsDue) {
        lastTimingEvent = Date.now();
        timingButton?.classList.remove('timing-button-red');
        timingButton?.classList.add('timing-button-orange');

        setTimeout(() => {
          if (!gameStarted) return;

          timingButton?.classList.remove('timing-button-orange');
          timingButton?.classList.add('timing-button-green');
        }, 300);

        setTimeout(() => {
          if (!gameStarted) return;

          if (timingButton?.classList.contains('timing-button-green')) {
            timingButton?.classList.remove('timing-button-green');
            timingButton?.classList.add('timing-button-red');
            enemyRightVw = Math.max(2, enemyRightVw + 3);
            updateEnemyPosition();
          }
        }, 700);
      }
    }, 1000);
  }

  function resetGame() {
    enemyRightVw = 2;
    score = 0;

    if (scoreDisplay) {
      scoreDisplay.textContent = String(score);
    }

    if (enemyImage) {
      enemyImage.style.right = '2vw';
    }

    deathScreen?.classList.add('hide');
    playMenu?.classList.remove('hide');
    document.getElementById('back')?.classList.remove('hide');

    setTitle('play');
    setBackground('play');
    updateEnemyPosition();
    startGame();
  }

  timingButton?.addEventListener('click', () => {
    if (!gameStarted) return;

    if (timingButton?.classList.contains('timing-button-green') && enemyImage) {
      timingButton.classList.remove('timing-button-green');
      timingButton.classList.add('timing-button-red');
      enemyRightVw = Math.max(2, enemyRightVw - 3);
      updateEnemyPosition();
      score += 1;

      if (scoreDisplay) {
        scoreDisplay.textContent = String(score);
      }
      return;
    }

    enemyRightVw += 3;
    updateEnemyPosition();
  });

  playButton?.addEventListener('click', () => {
    resetGame();
  });

  document.getElementById('play-again')?.addEventListener('click', () => {
    resetGame();
  });

  document.getElementById('menu')?.addEventListener('click', () => {
    stopGame();

    deathScreen?.classList.add('hide');
    playMenu?.classList.add('hide');

    menuButtons.forEach((id) => {
      document.getElementById(id)?.classList.remove('hide');
    });

    document.getElementById('back')?.classList.add('hide');
    setButtonLayout('center');
    setTitle('home');
    setBackground('home');
  });
});
