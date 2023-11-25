(function () { 
    madeby.textContent = "Joonas Kiuru"; // eslint-disable-line

      // Header element with divider
  const element = `<div class="container">
                    <h1>Dog Image Generator</h1>
                    <img id="Dog" src=https://dog.ceo/api/breeds/image/random">
                    <button onClick=getDog()> Get Dog Image</button>
                    </div>`;
content.innerHTML = element; // eslint-disable-line
// https://dog.ceo/api/breeds/image/random

function getDog() {

}

})();