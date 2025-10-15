//  Retrieve player name or redirect if not found
const playerName = localStorage.getItem("playerName");
if (!playerName) {
  window.location.href = "login.html";
}

//  Sound effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
correctSound.volume = 0.4;
wrongSound.volume = 0.4;

//  Questions list
const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
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
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctic Polar Desert", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

//  DOM elements
const QuestionELement = document.getElementById("Question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//  Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//  Display current question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  QuestionELement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

//  Reset question state
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//  Handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play();
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    wrongSound.currentTime = 0;
    wrongSound.play();
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });

  // Delay before showing next button for sound clarity
  setTimeout(() => {
    nextButton.style.display = "block";
  }, 800);
}

//  Show final score
function showScore() {
  resetState();
  QuestionELement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  saveToHistory(score);
  QuestionELement.innerHTML += `
    <br><br>
    <button id="history-btn">View History</button>
  `;

  document.getElementById("history-btn").addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

//  Save quiz attempt
function saveToHistory(score) {
  const playerName = localStorage.getItem("playerName") || "Unknown Player";
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

//  Handle next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Button Event
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

//  Start
startQuiz();
