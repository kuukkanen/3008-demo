(function () {
  let element = `<div class="container">
                <h1>Stopwatch</h1>
                <div id="stopwatch">00:00:00</div>
                <button id="startStopButton">Start</button>
                <button id="resetButton">Reset</button>
                </div> `;
  content.innerHTML = element; // eslint-disable-line

  let intervalId;
  let running = false;
  let previousTime;

  const stopwatchDisplay = document.getElementById("stopwatch");
  const startStopButton = document.getElementById("startStopButton");
  const resetButton = document.getElementById("resetButton");

  let totalTime = 0;

  startStopButton.addEventListener("click", () => {
    if (running) {
      stop();
    } else {
      start();
    }
  });

  resetButton.addEventListener("click", reset);

  function start() {
    // Start the clock
    running = true;
    startStopButton.textContent = "Stop";
    previousTime = Date.now();
    intervalId = setInterval(updateDisplay, 10);
  }

  function stop() {
    running = false;
    startStopButton.textContent = "Start";
    clearInterval(intervalId);
  }

  function reset() {
    stop();
    totalTime = 0;
    stopwatchDisplay.textContent = "00:00:00";
  }

  function updateDisplay() {
    // Current time  = approx 100 ms.
    const interval = Date.now() - previousTime;
    previousTime = Date.now();
    totalTime += interval;

    const minutes = totalTime / 60000;
    const seconds = (totalTime / 1000) % 60;
    const centiseconds = (totalTime % 1000) / 10;

    stopwatchDisplay.textContent = [minutes, seconds, centiseconds]
      .map((unit) => String(Math.floor(unit)).padStart(2, "0"))
      .join(":");
  }
})();
