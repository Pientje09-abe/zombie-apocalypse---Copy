document.addEventListener("DOMContentLoaded", function () {

    const result = document.getElementById("result");
    const buttons = document.querySelectorAll(".optionbutton");

    // Load saved job when page opens
    const savedcharacter = localStorage.getItem("character");

    if (savedcharacter) {
        result.textContent = savedcharacter;
    }

    // Add click event to every button
    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const character = this.dataset.character;

            // Save to localStorage
            localStorage.setItem("character", character);

            // Update displayed text
            result.textContent = character;

            console.log("Saved:", character);

        });

    });

});