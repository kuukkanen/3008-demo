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

    [result.correct_answer, ...result.incorrect_answers].forEach((answer) => {
      // Create button for an (in)correct answer.
      const button = buttonContainer.appendChild(
        document.createElement("button"),
      );
      button.innerHTML = answer;
    });
  });
})();
