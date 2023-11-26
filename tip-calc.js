(function () {
  madeby.textContent = "Lassi Inkinen"; // eslint-disable-line
  const element = `
  <div class="container">
    <h1>Tip Calculator</h1>
    <div>
      <input type="number" id="bill" placeholder="Total Bill" />
      <input type="range" id="tip" placeholder="Tip" /><span id="tipPercent"></span>
      <br>
      <button id="calculate">Calculate</button>
    </div>
    <div>
      <h2>Results</h2>
      <laber for="tipAmount">Tip Amount:</label>
      <input type="number" id="tipAmount" disabled />
      <span>Total Bill with Tip:</span>
      <input type="number" id="totalWithTip" disabled />
    </div>
  </div>`;

  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line

  const slider = document.getElementById("tip");
  const showTip = document.getElementById("tipPercent");
  showTip.innerHTML = slider.value;

  slider.oninput = function () {
    showTip.innerHTML = this.value;
  };

  document.getElementById("calculate").onclick = () => {
    const bill = Number(document.getElementById("bill").value);
    const tip = Number(document.getElementById("tip").value);

    const tipValue = bill * (tip / 100);
    const finalBill = bill + tipValue;
    console.log(finalBill);

    const tipAmount = document.querySelector("#tipAmount");
    const totalWithTip = document.getElementById("totalWithTip");
    tipAmount.value = tipValue;
    totalWithTip.value = finalBill;
  };
})();
