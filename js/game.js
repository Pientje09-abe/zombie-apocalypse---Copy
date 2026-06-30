const timingButton = document.getElementById("timing-button");
const enemyImage = document.getElementById("enemy-image");
const currentRight = window.getComputedStyle(enemyImage).right;
const score2 = document.getElementById("Score");
let score1 = 0;
setInterval(() => {
    var x = Math.floor(Math.random() * 9) + 1;

    if (x >= 9) {
        timingButton.classList.remove("timing-button-red");
        timingButton.classList.add("timing-button-green");

        setTimeout(() => {
            timingButton.classList.remove("timing-button-green");
            timingButton.classList.add("timing-button-red");
            enemyImage.style.right = `calc(${currentRight} - 3vw)`;
            score1 -= 1;
            score2.textContent = score1;
        }, 750);
    }
}, 250);

document.getElementById("timing-button").addEventListener("click", () => {
  const currentRight = window.getComputedStyle(enemyImage).right;

  if (timingButton.classList.contains("timing-button-green") && enemyImage) {
    timingButton.classList.remove("timing-button-green");
    timingButton.classList.add("timing-button-red");

    enemyImage.style.right = `max(2vw, calc(${currentRight} - 3vw))`;

    score1 += 1;
    score2.textContent = score1;
  } else {
    enemyImage.style.right = `calc(${currentRight} + 3vw)`;

    score1 -= 1;
    score2.textContent = score1;
  }
});