(function () {
    // Header element with divider
    const element = `<div class="counter_container">
                        <h1>Counter</h1>
                        <div id="counter">0</div>
                        <button id="increaseButton">Increase</button>
                        <button id="decreaseButton">Decrease</button>
                        <button id="resetButton">Reset</button>
                    </div>`;
    content.innerHTML = element; // eslint-disable-line

    // Get the HTML elements by id
    const increaseButton = document.getElementById("increaseButton");
    const decreaseButton = document.getElementById("decreaseButton");
    const resetButton = document.getElementById("resetButton");
    const counter = document.getElementById("counter");
    var digit = 0;

    // The Increase Button increases digit by 1 when clicked
    increaseButton.addEventListener("click",() => {
        digit += 1;
        updateDisplay();
    });

    // The Deccrease Button deccreases digit by 1 when clicked
    decreaseButton.addEventListener("click",() => {
        digit -= 1;
        updateDisplay();
    });

    // The Reset Button resets digit to 0 when clicked
    resetButton.addEventListener("click",() => {
        digit = 0;
        updateDisplay();
    });

    // Updates display to show current digit
    function updateDisplay (){
        counter.textContent = digit
    };

  })();
  