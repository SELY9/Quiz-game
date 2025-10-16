// Redirect to login if player name or level not found
const playerName = localStorage.getItem("playerName");
const selectedLevel = localStorage.getItem("quizLevel");

if (!playerName || !selectedLevel) {
  window.location.href = "login.html";
  throw new Error("Redirecting to login — quiz aborted.");
}

// 🔊 Sound Effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
correctSound.volume = 0.4;
wrongSound.volume = 0.4;

//  Questions by Difficulty
const questionsByLevel = {
  easy: [
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
  ],

  medium: [
    {
      question: "What is the capital city of Canada?",
      answers: [
        { text: "Toronto", correct: false },
        { text: "Ottawa", correct: true },
        { text: "Vancouver", correct: false },
        { text: "Montreal", correct: false },
      ],
    },
    {
      question: "Which planet has the most moons?",
      answers: [
        { text: "Saturn", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Mars", correct: false },
        { text: "Neptune", correct: false },
      ],
    },
    {
      question: "Which ocean is the deepest on Earth?",
      answers: [
        { text: "Indian Ocean", correct: false },
        { text: "Atlantic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
        { text: "Arctic Ocean", correct: false },
      ],
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: [
        { text: "Leonardo da Vinci", correct: true },
        { text: "Vincent van Gogh", correct: false },
        { text: "Pablo Picasso", correct: false },
        { text: "Claude Monet", correct: false },
      ],
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      answers: [
        { text: "Gold", correct: false },
        { text: "Oxygen", correct: true },
        { text: "Osmium", correct: false },
        { text: "Oxide", correct: false },
      ],
    },
  ],

  hard: [
    {
      question: "What is the rarest blood type in humans?",
      answers: [
        { text: "O-", correct: false },
        { text: "AB-", correct: true },
        { text: "B-", correct: false },
        { text: "A-", correct: false },
      ],
    },
    {
      question: "What is the largest known star in the universe?",
      answers: [
        { text: "UY Scuti", correct: true },
        { text: "Betelgeuse", correct: false },
        { text: "VY Canis Majoris", correct: false },
        { text: "Antares", correct: false },
      ],
    },
    {
      question: "What is the powerhouse of the cell?",
      answers: [
        { text: "Nucleus", correct: false },
        { text: "Mitochondria", correct: true },
        { text: "Ribosome", correct: false },
        { text: "Endoplasmic Reticulum", correct: false },
      ],
    },
    {
      question: "What is the square root of 256?",
      answers: [
        { text: "14", correct: false },
        { text: "15", correct: false },
        { text: "16", correct: true },
        { text: "18", correct: false },
      ],
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      answers: [
        { text: "Oxygen", correct: false },
        { text: "Nitrogen", correct: true },
        { text: "Carbon Dioxide", correct: false },
        { text: "Argon", correct: false },
      ],
    },
  ],
};

//  Select the current level's questions
const questions = questionsByLevel[selectedLevel];

//  DOM Elements
const QuestionElement = document.getElementById("Question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//  Player Info Display
const playerInfo = document.createElement("h2");
playerInfo.innerText = `Player: ${playerName} | Level: ${selectedLevel.toUpperCase()}`;
playerInfo.style.color = "#023047";
playerInfo.style.marginBottom = "10px";
document.querySelector(".app").prepend(playerInfo);

let currentQuestionIndex = 0;
let score = 0;

//  Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//  Show Question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  QuestionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

//  Reset State
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//  Select Answer
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

  setTimeout(() => {
    nextButton.style.display = "block";
  }, 800);
}

//  Show Score
function showScore() {
  resetState();
  QuestionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

  saveToHistory(score);

  QuestionElement.innerHTML += `
    <br><br>
    <button id="history-btn">View History</button>
  `;

  document.getElementById("history-btn").addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

//  Save History
function saveToHistory(score) {
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
  const attempt = {
    name: playerName,
    level: selectedLevel,
    score: score,
    total: questions.length,
    date: new Date().toLocaleString(),
  };
  quizHistory.push(attempt);
  localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

// ⏭ Next Button Logic
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
    // Play Again → reset everything
    localStorage.removeItem("playerName");
    localStorage.removeItem("quizLevel");
    window.location.href = "login.html";
  }
});

//  Start the game
startQuiz();
