const orb = document.getElementById("orb");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("gameOver");

let score = 0;
let timeLeft = 3.0;
let timer;
let isPlaying = false;

function startGame() {
  score = 0;
  timeLeft = 3.0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft.toFixed(1);
  gameOverScreen.style.display = "none";
  isPlaying = true;
  moveOrb();
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      endGame();
    } else {
      timerDisplay.textContent = timeLeft.toFixed(1);
    }
  }, 100);
}

function moveOrb() {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const orbSize = 60;

  const newX = Math.random() * (containerWidth - orbSize);
  const newY = Math.random() * (containerHeight - orbSize);

  orb.style.left = `${newX}px`;
  orb.style.top = `${newY}px`;
}

orb.addEventListener("click", () => {
  if (!isPlaying) return;
  score++;
  scoreDisplay.textContent = score;

  // Decrease timeLeft with difficulty ramp
  timeLeft = Math.max(0.7, 3.0 - score * 0.15);
  timerDisplay.textContent = timeLeft.toFixed(1);

  moveOrb();
});

function endGame() {
  clearInterval(timer);
  isPlaying = false;
  gameOverScreen.style.display = "block";
}

window.onload = startGame;
