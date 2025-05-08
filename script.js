const gameContainer = document.getElementById("game-container");
const gameRect = gameContainer.getBoundingClientRect();

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");

const timeSetters = Array.from(document.getElementsByClassName("timeSetters"));
timeSetters[1].classList.add("active");

const target = document.getElementById("target");
const gameLabel = document.getElementById("game-label");

let score = 0;
let timeLimit = 10; // seconds
let running = false;
let active = true;

gameContainer.addEventListener("click", () => {
  if (running) return;
  if (!active) return;

  running = true;
  score = 0;
  target.style.display = "block";
  gameLabel.style.display = "none";
  gameContainer.classList.remove("results");

  let timeLeft = timeLimit;
  let timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      running = false;
      active = false;
      displayResults();
      return;
    }
    timeLeft--;
    time.innerHTML = `Time: ${timeLeft}`;
  }, 1000);
});

function getRandomPositions() {
  const x = Math.floor(Math.random() * (gameRect.width - 8 * target.width) + 3 * target.width);
  const y = Math.floor(Math.random() * (gameRect.height - 7 * target.height) + 2 * target.height);

  return [x, y];
}

target.addEventListener("click", () => {
  if (!running) return;

  let [x, y] = getRandomPositions();
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  score++;
  scoreDisplay.innerHTML = `Score: ${score}`;
});

function displayResults() {
  setTimeout(() => {
    gameLabel.innerHTML += `<br>CLICK AGAIN TO RESTART!`;
    active = true;
  }, 3000);

  target.style.display = "none";
  gameLabel.style.display = "block";
  if (score === 0) gameLabel.innerHTML = "You Didn't Get Any Hits!";
  else gameLabel.innerHTML = `${Math.round((timeLimit / score) * 1000)} Miliseconds Per Hit!`;

  gameLabel.classList.add("results");
}

timeSetters.forEach((button) => {
  button.addEventListener("click", () => {
    if (running) return;

    timeLimit = parseInt(button.innerHTML.split(" ")[0]);
    timerDisplay.innerHTML = `Timer: ${timeLimit}`;
    timeSetters.forEach((other) => {
      other.classList.remove("active");
    });
    button.classList.add("active");
  });
});
