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

    const stopwatchDisplay = document.getElementById("stopwatch");
    const startStopButton = document.getElementById("startStopButton");
    const resetButton = document.getElementById("resetButton");

  })();
  