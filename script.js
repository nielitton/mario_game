const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const contador = document.querySelector(".pontuacao");

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
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.bottom = `${marioHeight}px`;

    mario.src = "assets/game-over.png";
    mario.style.width = "65px";
    mario.style.left = "31px";

    cancelAnimationFrame(loopFinish);
  } else if (pipePosition <= 0 && !isGameOver && isJumping === false) {
    pontuacao += 1;
    contador.innerHTML = pontuacao;
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
  contador.innerHTML = pontuacao
  gameLoop()


  if (event.key === " ") {
    jump();
  }
});
