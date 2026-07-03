// Prevent text selection and image dragging
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});

document.addEventListener('dragstart', function (e) {
  e.preventDefault();
});
//-----------------
//THE PAGE SELECTOR
//-----------------
const pages = {
  back: 'back',
  play: 'play-menu',
  customize: 'customize-menu',
  credits: 'credits-menu',
  exitgame: 'exitgame',
};

const menuButtons = ['play', 'customize', 'credits', 'exitgame'];
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

          if (buttonId === 'play') {
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
          }
        });
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
const enemyImage = document.getElementById("enemy-image");
const scoreDisplay = document.getElementById("Score");

let score = 0;
let enemyRightVw = 2;

function updateEnemyPosition() {
  enemyImage.style.right = `${enemyRightVw}vw`;

  if (enemyRightVw >= 75) {
    alert("you died");
  }
}

setInterval(() => {
  const x = Math.floor(Math.random() * 9) + 1;

  if (x >= 9) {
    timingButton.classList.remove("timing-button-red");
    timingButton.classList.add("timing-button-green");

        setTimeout(() => {
            timingButton.classList.remove("timing-button-green");
            timingButton.classList.add("timing-button-red");
        }, 750);
    }
}, 250);
document.getElementById("timing-button").addEventListener("click", () => {
  if (timingButton.classList.contains("timing-button-green")) {
    addScore(1) ;
  }
})});
