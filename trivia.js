(function () {
  madeby.textContent = "Jarkko Kuukkanen"; // eslint-disable-line

  // Get the saved score.
  let totalCorrect = Number(localStorage.getItem("correctAnswers")) || 0;

  const totalCorrectElem = document.createElement("div");
  totalCorrectElem.style.fontSize = "1.5rem";
  totalCorrectElem.style.fontWeight = "bold";
  totalCorrectElem.innerText = `Score (total correct): ${totalCorrect}`;
  content.appendChild(totalCorrectElem); // eslint-disable-line

  // Increase score by one and update the UI.
  const increaseScore = () => {
    totalCorrect++;
    totalCorrectElem.innerText = `Score (total correct): ${totalCorrect}`;
    localStorage.setItem("correctAnswers", totalCorrect);
  };

  // Create a container for the questions.
  const container = document.createElement("div");
  content.appendChild(container); // eslint-disable-line

  const questions = async () => {
    // Loading...
    container.innerHTML = "Loading&hellip;";

    // Get the questions from the API.
    const { results } = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18",
    ).then((response) => response.json());

    // Clear the container content.
    container.innerHTML = "";

    let correctAnswers = 0;
    let answeredQuestions = 0;

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
          // Create the result text after guessing.
          const result = buttonContainer.appendChild(
            document.createElement("span"),
          );
          result.style.fontSize = "1.5rem";
          result.style.color = button.isCorrect ? "green" : "red";
          result.innerText = button.isCorrect ? "Correct!" : "Wrong!!!";

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

          if (button.isCorrect) {
            // Increase correct answers.
            correctAnswers++;
            // Also increase overall score.
            increaseScore();
          }

          // All questions answered.
          if (++answeredQuestions >= results.length) {
            // Show how many questions were answered correctly.
            const result = container.appendChild(document.createElement("div"));
            result.innerText = `You answered ${correctAnswers} out of ${results.length} questions correctly.`;

            // Button to reload the questions.
            const reloadButton = container.appendChild(
              document.createElement("button"),
            );
            reloadButton.innerText = "Reload";
            // Reload questions on click.
            reloadButton.onclick = () => questions();
          }
        };

        // Return the button for the buttons array.
        return button;
      });
    });
  };

  // Ask questions at the start.
  questions();
})();
