const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restartImage = document.querySelector(".restart-img")
const restartText = document.querySelector(".restart-text")

let isGameOver = false;
let isJumping = false;
let pontuacao = 0;

const jump = () => {
  if (isGameOver) return;
  mario.classList.add("jump");
  isJumping = true;

  setTimeout(() => {
    mario.classList.remove("jump");
    isJumping = false;
  }, 500);
};

const checkColision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioHeight = +window.getComputedStyle(mario).bottom.replace("px", "");

  if (pipePosition <= 98 && pipePosition > 0 && marioHeight < 110) {
    isGameOver = true;
    restartImage.style.display = "block"
    restartText.style.display = "block"
    pipe.style.animation = "block";
    pipe.style.left = `${pipePosition}px`;

    mario.style.bottom = `${marioHeight}px`;

    mario.src = "assets/game-over.png";
    mario.style.width = "65px";
    mario.style.left = "31px";

    cancelAnimationFrame(loopFinish);
  }

  loopFinish = requestAnimationFrame(checkColision);
};


const gameLoop = () => {
  checkColision()
  loopFinish = requestAnimationFrame(gameLoop)
}

let loopFinish = requestAnimationFrame(checkColision);

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "Enter") {
    pipe.style.animation = "";
    restartImage.style.display = "none"
    restartText.style.display = "none"

    setTimeout(() => {
      pipe.style.width = "pipe-animation 1.5s linear infinite";
      mario.src = "assets/mario.gif";
      mario.style.width = "120px"
      mario.style.bottom = "0px"
      mario.style.left = "0px";
      mario.classList.remove("jump")
    }, 100);
  }

  isGameOver = false
  isJumping = false
  pontuacao = 0
  gameLoop()

  if (event.key === " ") {
    jump();
  }
});
