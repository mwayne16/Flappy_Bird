let gameState, fps, interval, requestCall;
var start, now, then, delta;
const gameLoopInit = () => {
  gameState = false;
  requestCall = 0;
  fps = 60;
  interval = 1000 / fps;
  start = null;
  then = Date.now();
};

const collisionDetection = (x1, x2, y1, y2, w1, w2, h1, h2) => {
  if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
    Player.deathScreen(Player.score);
    Player.playerState.deathScreen = true;
    gameState = false;
    Player.playerMovement.vy += 15;
    requestCall++;
  }
};
const playerPipePassCheck = (x1, x2, w1) => {
  if (x1 + w1 <= x2 && x2 <= x1 + w1 + 1 && gameState != false) {
    scoreUpdater();
  }
};
const scoreUpdater = () => {
  Player.score++;
  Player.scoreDisplay(Player.score);
  pointAudio.play();
};

const gameReset = () => {
  pipes.splice(0, 2);
  gameWorld.update();
  Player.score = 0;
  Player.x = 200;
  Player.y = 400;
  gameState = false;
  Player.playerState.deathScreen = false;
  scoreDisplay.classList.remove("gameOverScore");
  gameOverScreen.classList.remove("deathScreenActive");
  Player.scoreDisplay(Player.score);
  requestCall = 0;
};
gameLoopInit();
function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    gameWorld.update();
    Player.update();
    pipes.forEach(pipe => {
      pipe.update();
      playerPipePassCheck(pipe.x, Player.x, pipe.width);
      // Collision Detection
      //Bottom Pipe
      if (requestCall < 1) {
        collisionDetection(
          Player.x - 25,
          pipe.x,
          Player.y - 25,
          pipe.y + 5,
          Player.width,
          pipe.width,
          Player.height,
          pipe.height
        );
        // Top Pipe
        collisionDetection(
          Player.x - 25,
          pipe.x,
          Player.y - 25,
          pipe.topPos - 5,
          Player.width,
          pipe.width,
          Player.height,
          pipe.height
        );
      }
      if (pipe.x + pipe.width <= 0) {
        pipe.reset(250, generateValue(600, 162));
      }
    });
    if (pipes.length <= 0 && pipes.length != 3) {
      generatePipes(2);
    }
    requestCall === 1 ? deathAudio.play() : null;
  }
}
animate();
