(function () {

  let element = `<div class="wrapper">
                <h1>Stopwatch</h1>
                <div id="stopwatch">0:00.0</div>
                <button id="startStopButton">Start</button>
                <button id="resetButton">Reset</button>
                </div> `;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line
  
  let startTime;
  let intervalId;
  let running = false;

  const stopwatchDisplay = document.getElementById("stopwatch");
  const startStopButton = document.getElementById("startStopButton");
  const resetButton = document.getElementById("resetButton");

  startStopButton.addEventListener("click", () => {
      if (running) {
          stop();
      } else {
          start();
      }
  });

  resetButton.addEventListener("click", reset);

  function start() {
      running = true;
      startStopButton.textContent = "Stop";
      startTime = Date.now() - (startTime ? startTime : 0);
      intervalId = setInterval(updateDisplay, 100);
  }

  function stop() {
      running = false;
      startStopButton.textContent = "Start";
      clearInterval(intervalId);
  }

  function reset() {
      stop();
      startTime = null;
      stopwatchDisplay.textContent = "0:00:0";
  }

  function updateDisplay() {
      const currentTime = Date.now() - (startTime || 0);
      const minutes = Math.floor(currentTime / 60000);
      const seconds = Math.floor((currentTime % 60000) / 1000);
      const milliseconds = Math.floor((currentTime % 1000) / 100);

      const displayTime = `${minutes}:${String(seconds).padStart(2, "0")}.${milliseconds}`;
      stopwatchDisplay.textContent = displayTime;
  }


})();