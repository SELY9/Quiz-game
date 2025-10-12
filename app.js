const playerName = localStorage.getItem("playerName");
if (!playerName) {
  window.location.href = "login.html";
}
const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the largest continent by area?",
    answers: [
      { text: "Australia", correct: false },
      { text: "Africa", correct: false },
      { text: "Europe", correct: false },
      { text: "Asia", correct: true },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shrilanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Ghobi", correct: false },
      { text: "Sahara", correct: true },
      { text: "Antartica", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Artic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const QuestionELement = document.getElementById("Question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  QuestionELement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild)
    answerButtons.removeChild(answerButtons.firstChild);
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  QuestionELement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  saveToHistory(score);
  QuestionELement.innerHTML += `<br><br><button id= "history-btn">View History</button>`;

  document.getElementById("history-btn").addEventListener("click", () => {
    window.location.href = "history.html";
  });
}
function saveToHistory(score) {
  const playerName = localStorage.getItem("playerName") || "unknown Player";

  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  const attempt = {
    name: playerName,
    score: score,
    total: questions.length,
    date: new Date().toLocaleString(),
  };
  quizHistory.push(attempt);
  localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
