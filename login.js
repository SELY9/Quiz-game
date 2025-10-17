document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nameStep = document.getElementById("name-step");
  const levelStep = document.getElementById("level-step");
  const levelButtons = document.querySelectorAll(".level-btn");

  // Step 1: Handle name input
  startBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("username");
    const name = nameInput.value.trim();

    if (name) {
      localStorage.setItem("playerName", name);
      nameStep.style.display = "none";
      levelStep.style.display = "block";
    } else {
      alert("Please enter your name to start the quiz.");
    }
  });

  // Step 2: Handle difficulty selection
  levelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.dataset.level;
      localStorage.setItem("quizLevel", level);
      window.location.href = "index.html";
    });
  });
});
