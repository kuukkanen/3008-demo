(function () { 
    madeby.textContent = "Joonas Kiuru"; // eslint-disable-line

      // Header element with divider
  const element = `<div class="container">
                    <h1>Dog Image Generator</h1>
                    <img id="Dog" src=https://dog.ceo/api/breeds/image/random">
                    <button id="imageButton"> Get Dog Image</button>
                    </div>`;
content.innerHTML = element; // eslint-disable-line
// https://dog.ceo/api/breeds/image/random

const button = getElementById("imageButton");
button.onClick = () => {
    getDog();
}


function getDog() {
    const img = document.getElementById('Dog');
    const url = "https://dog.ceo/api/breeds/image/random";
    fetch(url,{
        headers: {
            "Accept": "application/json",
          },
          body: JSON.stringify(data),
    }).then((response) => response.JSON)
    .then((result) => img.textContent = result)
}

})();