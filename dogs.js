(function () { 
    madeby.textContent = "Joonas Kiuru"; // eslint-disable-line

      // Header element with divider
  const element = `<div class="container">
                    <h1>Dog Image Generator</h1>
                    <img id="Dog" class="dog-image" src="">
                    <button id="imageButton"> Get Dog Image</button>
                    </div>`;
content.innerHTML = element; // eslint-disable-line

const button = document.getElementById("imageButton");
button.onclick = () => {
    getDog();
}

async function getDog() {
    const img = document.getElementById('Dog');
    const url = await getImageLink();
    try {
        const response = await fetch(url);
        if (!response.ok){
            img.src = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1700954913~exp=1700955513~hmac=519e5fb1ea1b02694cc828c13a67af56109c26323c2cc483d78d373a8149eda9";
        }
        else {
            img.src = url;
        }
    } catch (error) {
        img.src = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1700954913~exp=1700955513~hmac=519e5fb1ea1b02694cc828c13a67af56109c26323c2cc483d78d373a8149eda9";
    }
}

async function getImageLink () {
    const img = document.getElementById('Dog');
    try {
        const url = "https://dog.ceo/api/breeds/image/random";
        const response = await fetch(url,{
            headers: {
                "Accept": "application/json",
              }});
        const result = await response.json();
        return result.message
    } catch (error) {
        img.src = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1700954913~exp=1700955513~hmac=519e5fb1ea1b02694cc828c13a67af56109c26323c2cc483d78d373a8149eda9";
    }

}


getDog();
})();