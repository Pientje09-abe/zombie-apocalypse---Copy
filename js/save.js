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
});