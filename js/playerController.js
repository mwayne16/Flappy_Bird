const scoreDisplay = document.querySelector(".gameScore");
const gameOverScore = document.querySelector(".death-screen span");
const gameOverScreen = document.querySelector(".death-screen");
const maxAngle = (2 * Math.PI) / -50;
const minAngle = Math.PI / 5;
let allowed = true;
let index = 0;
const Player = {
  x: 200,
  y: 400,
  width: 50,
  height: 50,
  score: 0,
  angle: 0,
  playerMovement: {
    vy: 6
  },

  playerState: {
    deathScreen: false
  },

  controller: {
    up: false,
    keyListener: function(event) {
      var keyState = event.type == "keydown" ? true : false;

      event.preventDefault();
      if (keyState === true && Player.playerState.deathScreen === false) {
        index = 1;
        gameState = true;
      } else {
        index = 0;
      }
      switch (event.keyCode) {
        case 32: //spacebar
          Player.controller.up = keyState;
          break;
        case 38: // arrowup
          Player.controller.up = keyState;
          break;
        case 87: // w
          Player.controller.up = keyState;
          break;
        default:
          Player.controller.up = false;
      }
    }
  },
  update() {
    // calculate gravity and update bird state
    if (this.controller.up === true && gameState === true) {
      this.calculateBirdAngle(this.playerMovement.vy);
      swooshAudio = new Audio("assets/swoosh.mp3");
      swooshAudio.play();
      this.playerMovement.vy -= this.playerMovement.vy + 8;
      this.y += this.playerMovement.vy;
      this.controller.up = false;
    } else {
      this.playerMovement.vy += gameWorld.gravity.y;
      this.y += this.playerMovement.vy;
    }
    if (gameState === false && this.playerState.deathScreen === false) {
      if (this.y > generateValue(375, 400)) {
        this.playerMovement.vy -= this.playerMovement.vy + 4;
        this.angle = 0;
        this.y += this.playerMovement.vy;
      }
    }
    if (this.y + this.width - 20 >= gameWorld.floorY) {
      this.playerMovement.vy = -0.4;
      requestCall++;
      gameState = false;
      this.playerState.deathScreen = true;
      this.deathScreen(Player.score);
    }
    this.drawFrame(index, 0, 2, 2);
    this.calculateBirdAngle(this.playerMovement.vy);
  },
  calculateBirdAngle(playerVY) {
    const apex = playerVY > 2 ? true : false;
    if (this.angle > maxAngle && this.controller.up === true) {
      this.angle -= 0.4;
    } else if (apex === true && this.angle < minAngle) {
      this.angle += 0.02;
    } else {
      this.angle = this.angle;
    }
  },
  scoreDisplay(score) {
    scoreDisplay.innerHTML = score;
    gameOverScore.innerHTML = score;
  },

  deathScreen() {
    scoreDisplay.innerHTML = "Game Over";
    gameOverScreen.classList.add("deathScreenActive");
    scoreDisplay.classList.add("gameOverScore");
  },
  drawFrame(frameX, frameY, scaledW, scaledH) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      bird,
      frameX * this.width,
      frameY * this.height,
      this.width,
      this.height,
      -50,
      -48,
      this.width * scaledW,
      this.height * scaledH
    );
    ctx.fill();
    ctx.closePath();
    ctx.save();
    ctx.restore();
    ctx.restore();
  }
};

window.addEventListener("keydown", Player.controller.keyListener, false);
window.addEventListener("keyup", Player.controller.keyListener, false);
