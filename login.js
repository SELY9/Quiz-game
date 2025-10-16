document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nameStep = document.getElementById("name-step");
  const levelStep = document.getElementById("level-step");
  const levelButtons = document.querySelectorAll(".level-btn");

  //  Step 1: Ask for name
  startBtn.addEventListener("click", () => {
    const name = document.getElementById("username").value.trim();

    if (name) {
      // Save name
      localStorage.setItem("playerName", name);

      // Transition to difficulty selection
      nameStep.style.display = "none";
      levelStep.style.display = "block";
    } else {
      alert("Please enter your name to start the quiz 🤪");
    }
  });

  //  Step 2: Select difficulty
  levelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.dataset.level;
      localStorage.setItem("quizLevel", level);
      window.location.href = "index.html"; // redirect to main quiz page
    });
  });
});
