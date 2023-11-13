(async function () {
  madeby.textContent = "Jarkko Kuukkanen"; // eslint-disable-line

  // Get the questions from the API.
  const { results } = await fetch("https://opentdb.com/api.php?amount=10").then(
    (response) => response.json(),
  );

  // Create a container for the questions.
  const container = document.createElement("div");
  content.appendChild(container); // eslint-disable-line

  // Add each question in the container.
  results.forEach((result, i) => {
    const question = document.createElement("p");
    // Use innerHTML as there might be HTML entities in the question text.
    question.innerHTML = `Question ${i + 1}. ${result.question}`;
    question.style.fontSize = "1.5rem";
    question.style.fontWeight = "bold";

    container.appendChild(question);

    // Create a container for the buttons.
    const buttonContainer = container.appendChild(
      document.createElement("div"),
    );

    // Get all answers, correct or incorrect.
    const answers = [result.correct_answer, ...result.incorrect_answers];

    // Suffle the answers so it is harder to guess.
    answers.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    });

    const buttons = answers.map((answer) => {
      // Create button for an (in)correct answer.
      const button = buttonContainer.appendChild(
        document.createElement("button"),
      );
      button.innerHTML = answer;
      // VERY BAD but is the easiest way to let the button know if it is correct or not.
      button.isCorrect = answer === result.correct_answer;

      button.onclick = () => {
        buttons.forEach((button) => {
          if (button.isCorrect) {
            // Green for a correct guess.
            button.style.backgroundColor = "lightgreen";
            button.style.color = "black";
          } else {
            // Red for an incorrect guess.
            button.style.backgroundColor = "salmon";
          }

          // Disable each button when any of them is clicked.
          button.disabled = true;
        });
      };

      // Return the button for the buttons array.
      return button;
    });
  });
})();
