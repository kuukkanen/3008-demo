(function () {
  const element = `
  <div class="container">
    <h1>Tip Calculator</h1>
    <div>
      <input type="number" id="bill" placeholder="Total Bill" />
      <input type="number" id="tip" placeholder="Tip" />
      <button id="calculate"></button>
    </div>
    <div>
      <h2>Results</h2>
      <span>Total Bill with Tip</span>
      <input type="number" id="totalWithTip" disabled />
    </div>
  </div>`;

  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line
})();
