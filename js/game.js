//prevent drawing and selecting text on the page
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});

document.addEventListener('dragstart', function (e) {
  e.preventDefault();
});

const pages = {
  back: 'back',
  play: 'play-menu',
  customize: 'customize-menu',
  credits: 'credits-menu',
  exitgame: 'exitgame',
  youdied: 'you-died',
};

const menuButtons = ['play', 'customize', 'credits', 'exitgame', 'playagain'];
const alignment = ['back']
function showPage(pageId) {
  Object.values(pages).forEach(id => {
    document.getElementById(id)?.classList.add('hide');
  });

  document.getElementById(pageId)?.classList.remove('hide');
}

Object.entries(pages).forEach(([buttonId, pageId]) => {
  document.getElementById(buttonId)?.addEventListener('click', () => {

    showPage(pageId);

    if (buttonId === 'back') {
      // hide back button
      document.getElementById('back')?.classList.add('hide');

      // show menu buttons
      menuButtons.forEach(id => {
        document.getElementById(id)?.classList.remove('hide');
      });
      // align buttons
      alignment.forEach(id => {
        const el = document.getElementById('buttons');
        el?.classList.remove('top');
        el?.classList.remove('middle');
        el?.classList.add('center');
        // change title        
        document.getElementById("main-title").innerHTML = "home";
        // change background
        const background = document.getElementById('background');
        background?.classList.remove('background-died');
        background?.classList.remove('background-play');
        background?.classList.remove('background-credits');
        background?.classList.remove('background-customize');
        background?.classList.add('background-home');
      });
    } else {
      if (buttonId === 'credits') {
        // hide buttons
        menuButtons.forEach(id => {
          document.getElementById(id)?.classList.add('hide');
        });

        // show back button
        document.getElementById('back')?.classList.remove('hide');

        // align buttons
        alignment.forEach(id => {
          const el = document.getElementById('buttons');
          el?.classList.remove('center');
          el?.classList.add('middle');
          // change title        
          document.getElementById("main-title").innerHTML = "credits";
          // change background
          const background = document.getElementById('background');
          background?.classList.remove('background-home');
          background?.classList.add('background-credits');
        });
      } else {
        // play page
        // show back button
        document.getElementById('back')?.classList.remove('hide');

        // hide menu buttons
        menuButtons.forEach(id => {
          document.getElementById(id)?.classList.add('hide');
        });
        // align buttons
        alignment.forEach(id => {
          const el = document.getElementById('buttons');
          el?.classList.add('top');
          el?.classList.remove('center');
          el?.classList.remove('middle');
        
          if (buttonId === 'play' || buttonId === 'playagain') {
            // change title        
            document.getElementById("main-title").innerHTML = "play";
            // change background
            const background = document.getElementById('background');
            background?.classList.remove('background-home');
            background?.classList.add('background-play');
          }
          else {
            if (buttonId === 'customize') {
              // change title        
              document.getElementById("main-title").innerHTML = "Customize your character!";
              // change background
              const background = document.getElementById('background');
              background?.classList.remove('background-home');
              background?.classList.add('background-customize');
            }
        }});
      }
    }
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const result = document.getElementById("result");
      const buttons = document.querySelectorAll(".optionbutton");
      const playImages = document.querySelectorAll(".play-image");
      const savedCharacter = localStorage.getItem("character");

    if (savedCharacter) {
        updateCharacter(savedCharacter);
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const character = this.dataset.character;

            if (!character) {
                return;
            }

            updateCharacter(character);
        });
    });

    function updateCharacter(character) {
        localStorage.setItem("character", character);

        if (result) {
            result.textContent = character;
        }

        playImages.forEach(function (image) {
            const isSelected = image.dataset.character === character;
            image.classList.toggle("hide", !isSelected);
        });
    }
  const timingButton = document.getElementById("timing-button");
  const playButton = document.getElementById("play");
  const enemyImage = document.getElementById("enemy-image");
  const scoreDisplay = document.getElementById("Score");
  let difficulty = localStorage.getItem("difficulty") || "easy";
  let score = 0;
  let enemyRightVw = 2;
  let gameStarted = false;
  let gameInterval;

  function updateEnemyPosition() {
    if (!enemyImage) return;

    enemyImage.style.right = `${enemyRightVw}vw`;

    if (enemyRightVw > 75) {
      document.getElementById("main-title").innerHTML = "You died!";
      const background = document.getElementById("background");
      background?.classList.remove("background-play");
      background?.classList.add("background-died");
      document.getElementById("play-menu").classList.add("hide");
      document.getElementById("you-died").classList.remove("hide");
      el?.classList.remove('top');
      el?.classList.add('menu');
      gameStarted = false;
      clearInterval(gameInterval);
      gameInterval = undefined;
    }
  }

  function startGame() {
    if (gameStarted) return;

    gameStarted = true;

    if (difficulty === "easy") {
      gameInterval = setInterval(() => {
        if (!gameStarted) return;

        const x = Math.floor(Math.random() * 4) + 1;

        if (x >= 4) {
          timingButton?.classList.remove("timing-button-red");
          timingButton?.classList.add("timing-button-orange");

          setTimeout(function () {
            if (!gameStarted) return;

            timingButton?.classList.remove("timing-button-orange");
            timingButton?.classList.add("timing-button-green");
          }, 400);

          setTimeout(function () {
            if (gameStarted && timingButton?.classList.contains("timing-button-green")) {
              timingButton?.classList.remove("timing-button-green");
              timingButton?.classList.add("timing-button-red");
              enemyRightVw = Math.max(2, enemyRightVw + 3);
              updateEnemyPosition();
            }
          }, 700);
        }
      }, 1000);

      timingButton?.addEventListener("click", () => {
        if (!gameStarted) return;

        if (timingButton?.classList.contains("timing-button-green") && enemyImage) {
          timingButton.classList.remove("timing-button-green");
          timingButton.classList.add("timing-button-red");

          enemyRightVw = Math.max(2, enemyRightVw - 3);
          updateEnemyPosition();

          score += 1;
          if (scoreDisplay) scoreDisplay.textContent = score;
        } else {
          enemyRightVw += 3;
          updateEnemyPosition();
        }
      });
    }
  }

  playButton?.addEventListener("click", () => {
    enemyRightVw = 2;
    updateEnemyPosition();
    startGame();
  });
});