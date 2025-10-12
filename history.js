document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("history-list");
  const backbtn = document.getElementById("back-btn");
  const clearBtn = document.getElementById("clear-btn");

  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  if (quizHistory.length === 0) {
    historyList.innerHTML = "<p>No history yet.</p>";
  } else {
    // Use REAL backticks here! (key below Esc)
    historyList.innerHTML = quizHistory
      .map((entry, index) => {
        return `<p><strong>${index + 1}. ${entry.name}</strong> - ${
          entry.score
        }/5 <br>(${entry.date})</p>`;
      })
      .join("");
  }

  backbtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  clearBtn.addEventListener("click", () => {
    const confirmClear = confirm(
      "Are you sure you want to clear your quiz history?"
    );
    if (confirmClear) {
      localStorage.removeItem("quizHistory");
      historyList.innerHTML = "<p>History cleared.</p>";
      clearBtn.style.display = "none";
    }
  });
});
