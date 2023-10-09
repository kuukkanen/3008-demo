(function () {
  const div = document.createElement("div");
  div.style.width = "450px";
  div.style.padding = "50px 20px";
  div.style.backgroundColor = "#4f709c";
  div.style.justifyItems = "center";
  div.style.textAlign = "center";
  div.style.borderRadius = "5px";

  const button = document.createElement("button");
  button.style.borderRadius = "0.5rem";
  button.style.padding = "1rem";
  button.style.fontSize = "1rem";
  button.style.fontWeight = "bold";
  button.textContent = "New Joke";

  const h1 = document.createElement("h1");
  h1.style.color = "#ccc";
  h1.style.textDecoration = "underline";
  h1.innerHTML = "Dad Jokes";

  const jokeText = document.createElement("p");
  jokeText.style.fontSize = "1.8rem";
  jokeText.style.margin = "30px";
  jokeText.style.fontFamily = "monospace";
  jokeText.innerHTML = "Loading...";

  content.appendChild(div);
  div.appendChild(h1);
  div.appendChild(jokeText);
  div.appendChild(button);

  button.onclick = () => {
    getJoke();
  };

  getJoke();

  // getJoke() function definition
  function getJoke() {
    // make an API request to https://icanhazdadjoke.com/'
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      /* convert Stringified JSON response to Javascript Object */
      .then((response) => response.json())
      /* replace innerText of jokeText with data.joke */
      .then((data) => {
        // extract the joke text
        const joke = data.joke;
        // do the replacement
        jokeText.innerText = joke;
      });
  }
})();
