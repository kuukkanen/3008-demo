(function () {
  const div = document.createElement("div");
  div.classList.add("container");

  const button = document.createElement("button");
  button.textContent = "New Joke";

  const h1 = document.createElement("h1");
  h1.innerHTML = "Dad Jokes";

  const jokeText = document.createElement("p");
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
