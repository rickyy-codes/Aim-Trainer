gameContainer = document.getElementById("game-container");
scoreDisplay = document.getElementById("score");
timeDisplay = document.getElementById("time");

gameRect = gameContainer.getBoundingClientRect();

let score = 0;
let timeLimit = 5; // seconds
let running = false;

gameContainer.addEventListener("click", () => {
  if (running) return;
  running = true;

  gameContainer.innerHTML = "";
  let timeLeft = timeLimit;
  let timer = setInterval(() => {
    if (timeLeft <= 0) {
      running = false;
      clearInterval(timer);
      return;
    }
    timeLeft--;
    time.innerHTML = `Time: ${timeLeft}`;
  }, 1000);
});

function spawnTarget() {
  const img = document.createElement("img");
  img.src = "Graphics/target.png";
  img.style.width = "96px";

  x = Math.floor(Math.random() * (gameRect.right - 96) + (gameRect.left + 96));
  y = Math.floor(Math.random() * (gameRect.bottom - 96) + (gameRect.top + 96));
  console.log(x, y);

  img.style.position = "absolute";
  img.style.left = x + "px";
  img.style.top = y + "px";

  gameContainer.appendChild(img);
}

spawnTarget();
