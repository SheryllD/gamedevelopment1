const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const start = document.querySelector("#startscreen");
const introText = document.querySelector("#intro");
const gameScreen = document.querySelector("#game-screen");
gameScreen.style.display = "none";
const overScreen = document.querySelector(".gameover");
overScreen.style.display = "none";
const instructions = document.querySelector("#instructions");
instructions.style.display = "none";
const gameOverTitle = document.querySelector("#gameOverTitle");
const scorePlace = document.querySelector("#score-num");
const livesPlace = document.querySelector("#lives-num");
const finalScore = document.querySelector("#final-score");
const easterEgg = document.querySelector("#easter");
const muteText = document.querySelector(".muteText");

//sounds
const music = new Audio("./sounds/gamemusicbaz.wav");
music.volume = 0.01;
//const victory = new Audio("./Sounds/Game Over Screen.mp3");
//victory.volume = 0.2;
const slapTheBug = new Audio("./sounds/slapthebug.wav");
slapTheBug.volume = 0.2;

const bug_dying = new Audio("./sounds/bug_dying.wav");
bug_dying.volume = 0.03;

const girlAskHelp = new Audio("./sounds/girls_help-me.ogg");
slapTheBug.volume = 0.2;

const audio = document.getElementById('myAudio');
audio.play();

const MagicMikeAskHelp = new Audio(".sounds/magicmike_help.wav");
slapTheBug.volume = 0.2

//const fail = new Audio("./Sounds/fail sound.wav");
//fail.volume = 0.1;
//const howl = new Audio("./Sounds/howl.wav");
//howl.volume = 0.1;

//images
const background = new Image();
background.src = "./images/abstract-bright-green-square-pixel-tile-mosaic-wall-background-texture.jpg";

const avatarBas = new Image();
avatarBas.src = "./images/avatarbass.png";

const avatarSherry = new Image();
avatarSherry.src = "./images/avatar.sherry.png";

const avatarGabs = new Image();
avatarGabs.src = "./images/avatar.gabs.png";

const avatarOllie = new Image();
avatarOllie .src = "./images/avatar.oliva.png";

const avatarMagicMike = new Image();
avatarMagicMike.src = "./images/avatarmagicmike.png";

const juneBug = new Image();
juneBug.src = "./images/junebug.png";

//player position and size
let playerX = 0;
let playerY = canvas.height / 2 - 100 + 50;

//characters width and height
const charWidth = 100;
const charHeight = 100;
const artyWidth = 150;
const artyHeight = 75;
let artyX = 0 + charHeight / 2;
let isArtyUp = false;

//character movement
let movingUp = false;
let movingDown = false;
let movingRight = false; 
let movingLeft = false;

//game controls
let isGameOver = false;
let gameId = 0;
let enemySpeed = 3;
let score = 0;
let interval = 0;
let artyUses = 1;
let lives = 3;
let isGameStarted = false;
let isGameMuted = false;

//enemies
const enemies = [
  { x: 1200, y: Math.random() * (canvas.height - charHeight), img: juneBug },
  { x: 1400, y: Math.random() * (canvas.height - charHeight), img: juneBug },
  { x: 1600, y: Math.random() * (canvas.height - charHeight), img: juneBug },
];

class Projectile {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.image = juneBug;
  }

  draw() {
    ctx.juneBug(this.image, this.x, this.y, 25, 15);
  }
  update() {
    this.draw();
    this.x += 10;
  }
}
let projectiles = [];

const animate = () => {
  let projectileCopy = projectiles.map((element) => element);
  let scoreStr = score.toString();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, playerX, playerY, charWidth, charHeight);
  if (score % 10 === 0 && score !== 0) {
    if (interval === 0) {
      enemySpeed += 1;
      interval += 1;
    }
  }
  if (scoreStr[scoreStr.length - 1] === "9") {
    interval = 0;
  }
  if (lives <= 0) {
    isGameOver = true;
  }
  if (isArtyUp === true) {
    ctx.drawImage(arty, artyX, 0, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 2 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 3 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 4 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 5 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 6 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 7 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 8 * artyHeight, artyWidth, artyHeight);
    artyX += 6;
    if (artyX > 900) {
      isArtyUp = false;
    }
  }

  //enemies moving
  for (let i = 0; i < enemies.length; i += 1) {
    let current = enemies[i];
    ctx.juneBug(current.img, current.x, current.y, charWidth, charHeight);
    current.x -= enemySpeed;
    if (current.x < 0) {
      current.x = 900 + charWidth;
      current.y = Math.random() * (canvas.height - charHeight);
      lives -= 1;
      livesPlace.innerHTML = lives;
      if (score > 0) {
        score -= 1;
        scorePlace.innerHTML = score;
      }
    }
    projectiles.forEach((projectile, index) => {
      if (
        current.x < projectile.x + 25 &&
        current.x + charWidth > projectile.x &&
        current.y < projectile.y + 15 &&
        current.y + charHeight > projectile.y
      ) {
        if (!isGameMuted) {
          dying.play();
        }
        projectileCopy.splice(index, 1);
        current.x = 900 + charWidth;
        current.y = Math.random() * (canvas.height - charHeight);
        score += 1;
        scorePlace.innerHTML = score;
      }
    });
    projectiles = projectileCopy;
    if (
      current.x < playerX + charWidth &&
      current.x + charWidth > playerX &&
      current.y < playerY + charHeight &&
      current.y + charHeight > playerY
    ) {
      isGameOver = true;
    }
    if (artyX < 900 - artyWidth + 1 && isArtyUp === true) {
      if (current.x < artyX + artyWidth && current.x + charWidth > artyX) {
        current.x = 900 + charWidth;
        current.y = Math.random() * (canvas.height - charHeight);
        score += 1;
        scorePlace.innerHTML = score;
      }
    }
  }
  // moving main character
  if (movingUp === true && playerY >= 0) {
    playerY -= 6;
  } else if (movingDown === true && playerY <= 700 - charHeight) {
    playerY += 6;
  }
  //handling projectiles
  projectiles.forEach((projectile, index) => {
    if (projectile.x >= 900) {
      projectiles.splice(index, 1);
    } else {
      projectile.update();
    }
  });
  if (score >= 50) {
    isGameOver = true;
  }

  if (isGameOver) {
    music.pause();
    music.currentTime = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (score >= 50) {
      gameOverTitle.innerHTML = "You saved your friends!";
      easterEgg.innerHTML = "The clumsy bugs will try again tomorrow!";
      if (!isGameMuted) {
        victory.play();
      }
    } else {
      if (score < 0) {
        score = 0;
      }
      if (!isGameMuted) {
        fail.play();
      }
    }
    overScreen.style.display = "block";
    gameScreen.style.display = "none";
    cancelAnimationFrame(gameId);
    finalScore.innerHTML = score;
  } else {
    // Ask for a new frame
    gameId = requestAnimationFrame(animate);
  }
};

window.onload = () => {
  document.getElementById("startBtn").onclick = () => {
    startGame();
  };
  document.getElementById("instructionsBtn").onclick = () => {
    instructions.style.display = "block";
    introText.style.display = "none";
  };
  document.getElementById("muteBtn").onclick = () => {
    if (isGameMuted) {
      isGameMuted = false;
      muteText.innerHTML = "off";
    } else if (!isGameMuted) {
      isGameMuted = true;
      muteText.innerHTML = "on";
    }
  };
  document.addEventListener("keydown", (event) => {
    if (isGameStarted && event.code === "ArrowUp") {
      movingUp = true;
    } else if (isGameStarted && event.code === "ArrowDown") {
      movingDown = true;
    } else if (isGameStarted && event.code === "Space") {
      if (isGameOver === false) {
        if (!isGameMuted) {
          arrowShot.play();
        }
      }
      projectiles.push(
        new Projectile({
          x: playerX + charWidth,
          y: playerY + charHeight / 2,
        })
      );
    } else if (event.code === "KeyV") {
      if (isGameStarted && artyUses > 0) {
        if (!isGameMuted) {
          howl.play();
        }

        isArtyUp = true;
      }
    }
  });
  document.addEventListener("keyup", () => {
    movingUp = false;
    movingDown = false;
  });
  function startGame() {
    start.style.display = "none";
    gameScreen.style.display = "block";
    animate();
    if (!isGameMuted) {
      music.play();
    }

    isGameStarted = true;
  }

  document.getElementById("restartBtn").onclick = () => {
    playerX = 0;
    playerY = canvas.height / 2 - 100 + 50;
    artyX = 0 + charHeight / 2;
    isGameOver = false;
    gameId = 0;
    enemySpeed = 3;
    score = 0;
    scorePlace.innerHTML = 0;
    interval = 0;
    artyUses = 1;
    lives = 3;
    livesPlace.innerHTML = 3;
    enemies[0].x = 1200;
    enemies[1].x = 1400;
    enemies[2].x = 1600;
    projectiles = [];
    overScreen.style.display = "none";
    start.style.display = "block";
  };
};

function toggleMute() {
    const audio = document.getElementById('gameAudio');
    const muteBtn = document.getElementById('muteBtn');
    const muteText = document.getElementById('muteText');
    if (audio.muted) {
      audio.muted = false;
      muteText.textContent = 'off';
      muteBtn.classList.remove('muted');
    } else {
      audio.muted = true;
      muteText.textContent = 'on';
      muteBtn.classList.add('muted');
    }
  }
  
