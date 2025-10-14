document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("history-list");
  const playAgainBtn = document.getElementById("playAgain-btn");
  const backBtn = document.getElementById("back-btn");
  const clearBtn = document.getElementById("clear-btn");

  // Load saved history
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  if (quizHistory.length === 0) {
    historyList.innerHTML = "<p>No history yet 🌊</p>";
  } else {
    historyList.innerHTML = quizHistory
      .map(
        (entry, index) => `
        <p><strong>${index + 1}. ${entry.name}</strong> - ${entry.score}/5 <br>(${entry.date})</p>
      `
      )
      .join("");
  }

  playAgainBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  clearBtn.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear your quiz history?");
    if (confirmClear) {
      localStorage.removeItem("quizHistory");
      historyList.style.opacity = 0;
      setTimeout(() => {
        historyList.innerHTML = "<p>History cleared 🧼</p>";
        historyList.style.opacity = 1;
      }, 400);
    }
  });
});
