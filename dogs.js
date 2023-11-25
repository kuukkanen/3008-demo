(function () { 
    madeby.textContent = "Joonas Kiuru"; // eslint-disable-line

      // Header element with divider
  const element = `<div class="container">
                    <h1>Dog Image Generator</h1>
                    <img id="Dog" class="medium-image" src="">
                    <button id="imageButton" class="medium-image"> Get Dog Image</button>
                    </div>`;
content.innerHTML = element; // eslint-disable-line

getDog();

const button = getElementById("imageButton");
button.onClick = () => {
    getDog();
}


async function getDog() {
    const img = document.getElementById('Dog');
    const url = "https://dog.ceo/api/breeds/image/random";
    const response = await fetch(url,{
        headers: {
            "Accept": "application/json",
          }});
    const result = await response.json();
    img.src = result.message;
}

})();