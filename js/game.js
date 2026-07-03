const timingButton = document.getElementById("timing-button");

setInterval(() => {
    var x = Math.floor(Math.random() * 9) + 1;

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
    timingButton.classList.remove("timing-button-green");
    timingButton.classList.add("timing-button-red");
    addScore(1) ;
  }
});
