(function () {
    // Header element with divider
    const element = `<div class="container">
                        <h1>Counter</h1>
                        <div id="counter">0</div>
                        <button id="increaseButton">Increase</button>
                        <button id="resetButton">Reset</button>
                        <button id="decreaseButton">Decrease</button>
                    </div>`;
    content.innerHTML = element; // eslint-disable-line

    const increaseButton = document.getElementById("increaseButton");
    const decreaseButton = document.getElementById("decreaseButton");
    const resetButton = document.getElementById("resetButton");
    const counter = document.getElementById("counter");
    var digit = 0;

    increaseButton.addEventListener("click",() => {
        digit += 1;
        updateDisplay();
    });


    decreaseButton.addEventListener("click",() => {
        digit -= 1;
        updateDisplay();
    });

    function updateDisplay (){
        counter.textContent = digit
    };



  })();
  