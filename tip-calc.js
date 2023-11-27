(function () {
  madeby.textContent = "Lassi Inkinen"; // eslint-disable-line

  const font = `{
    font-size: 1.8rem;
    font-Family: monospace;
    }`;
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.sheet.insertRule(`#tipz > * ${font}`);
  console.log(font.trim());
  const element = `
  <div class="container">
    <h1>Tip Calculator</h1>
    <div id="tipz">
      <div>
        <label for="bill">€</label>
        <input type="number" id="bill" placeholder="Total Bill" />
        <div >
        <input type="range" min="1" max="100" value="10" id="tip"/><span id="tipPercent"></span>
        </div>
      </div>
      <div>
        <h2>Results</h2>
        <laber for="tipAmount">Tip Amount:</label>
        <input type="number" id="tipAmount" disabled />€
        <br>
        <laber for="tipAmount">Total Bill with Tip:</label>
        <input type="number" id="totalWithTip" disabled />€
      </div>
    </div>
  </div>`;

  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line

  const slider = document.getElementById("tip");
  slider.style.width = "100%";
  const showTip = document.getElementById("tipPercent");
  showTip.innerHTML = `${slider.value}%`;

  slider.oninput = function () {
    showTip.innerHTML = `${this.value}%`;
  };

  slider.onchange = () => calculate();

  function calculate() {
    const bill = Number(document.getElementById("bill").value);
    const tip = document.getElementById("tip").value;

    const tipValue = bill * (tip / 100);
    const finalBill = bill + tipValue;
    console.log(finalBill);

    const tipAmount = document.querySelector("#tipAmount");
    const totalWithTip = document.getElementById("totalWithTip");
    tipAmount.value = tipValue;
    totalWithTip.value = finalBill;
  }
})();
