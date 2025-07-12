let secretNumber;
let attempts = 0;
let timer;
let timeLeft = 30;
let currentLang = "en";
let maxRange = 100;

const langData = {
  en: {
    title: "Guess the Number",
    instruction: "Guess a number between 1 and ",
    correct: "✅ Correct! You guessed it!",
    wrong: "❌ Try again!",
    timer: "⏱️",
    restart: "🔄 Restart"
  },
  bn: {
    title: "নাম্বার অনুমান করো",
    instruction: "১ থেকে কত নাম্বার?",
    correct: "✅ সঠিক!",
    wrong: "❌ আবার চেষ্টা করো!",
    timer: "⏱️",
    restart: "🔄 আবার শুরু"
  }
};

const titleEl = document.getElementById("title");
const instructionEl = document.getElementById("instruction");
const messageEl = document.getElementById("message");
const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");
const levelEl = document.getElementById("level");
const timerEl = document.getElementById("timer");
const langToggleBtn = document.getElementById("languageToggle");

function setLanguage() {
  const lang = langData[currentLang];
  titleEl.textContent = lang.title;
  instructionEl.textContent = `${lang.instruction} ${maxRange}`;
  checkBtn.textContent = currentLang === "bn" ? "চেক করো" : "Check";
  restartBtn.textContent = lang.restart;
}

function generateNumber() {
  secretNumber = Math.floor(Math.random() * maxRange) + 1;
  attempts = 0;
}

function setLevel(level) {
  if (level === "easy") maxRange = 10;
  else if (level === "medium") maxRange = 50;
  else maxRange = 100;
  setLanguage();
  generateNumber();
}

function startTimer() {
  timeLeft = 30;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${langData[currentLang].timer} ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      messageEl.textContent = currentLang === "bn" ? "⏰ সময় শেষ!" : "⏰ Time's up!";
      messageEl.className = "wrong";
    }
  }, 1000);
}

checkBtn.addEventListener("click", () => {
  const guess = Number(guessInput.value);
  attempts++;
  if (!guess) return;

  if (guess === secretNumber) {
    clearInterval(timer);
    messageEl.textContent = langData[currentLang].correct;
    messageEl.className = "correct";
  } else {
    messageEl.textContent = langData[currentLang].wrong;
    messageEl.className = "wrong";
  }
});

restartBtn.addEventListener("click", () => {
  generateNumber();
  startTimer();
  guessInput.value = "";
  messageEl.textContent = "";
  setLanguage();
});

langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "bn" : "en";
  langToggleBtn.textContent = currentLang === "en" ? "🌐 বাংলা" : "🌐 English";
  setLanguage();
});

levelEl.addEventListener("change", () => {
  setLevel(levelEl.value);
  restartBtn.click();
});

setLevel("medium");
setLanguage();
generateNumber();
startTimer();
