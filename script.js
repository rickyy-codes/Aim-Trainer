gameContainer = document.getElementById("game-container");
gameRect = gameContainer.getBoundingClientRect();

scoreDisplay = document.getElementById("score");
timerDisplay = document.getElementById("time");

timeSetters = Array.from(document.getElementsByClassName("timeSetters"));
timeSetters[1].classList.add("active");

const target = document.createElement("img");
target.src = "Graphics/target.png";
target.style.width = "96px";
target.style.position = "absolute";
target.style.display = "none";
gameContainer.appendChild(target);

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
  gameContainer.replaceChildren(target);
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
    gameContainer.innerHTML += `<br>Click To Play Again`;
    active = true;
  }, 3000);

  target.style.display = "none";
  if (score === 0) gameContainer.innerHTML = "You Didn't Get Any Hits!";
  else gameContainer.innerHTML = `${Math.round((timeLimit / score) * 1000)} Miliseconds Per Hit!`;

  gameContainer.classList.add("results");
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
