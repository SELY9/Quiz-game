document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("history-list");
  const backbtn = document.getElementById("back-btn");

  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  if (quizHistory.length === 0) {
    historyList.innerHTML = "<p>No history yet.</p>";
  } else {
    // Use REAL backticks here! (key below Esc)
    historyList.innerHTML = quizHistory
      .map((entry, index) => {
        return `<p><strong>${index + 1}. ${entry.name}</strong> - ${entry.score}/5 <br>(${entry.date})</p>`;
      })
      .join("");
  }

  backbtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
});
