var canvasLayer,
  ctxLayer,
  canvas,
  ctx,
  border,
  pipeImg,
  pipeImgD,
  bird,
  pointAudio,
  deathAudio,
  swooshAudio;
const storedVariables = () => {
  canvasLayer = document.querySelector("#layerd");
  ctxLayer = canvasLayer.getContext("2d");
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  border = new Image();
  border.src = "assets/flappyBorder.png";
  pipeImg = new Image();
  pipeImg.src = "assets/flappyPipe.png";
  pipeImgD = new Image();
  pipeImgD.src = "assets/flappyPipeD.png";
  bird = new Image();
  bird.src = "assets/flappyBird.png";
  pointAudio = new Audio("assets/ding.mp3");
  deathAudio = new Audio("assets/hit.mp3");
  canvas.width = 600;
  canvas.height = 800;
  canvasLayer.width = 600;
  canvasLayer.height = 800;
};
storedVariables();

const gameWorld = {
  x: 0,
  y: 0,
  width: 600,
  height: 800,
  BGimage: null,
  floorW: 600,
  floorH: 30,
  floorX: 600,
  floorY: 700,
  scrollSpeed: 2,

  gravity: {
    x: 0,
    y: 0.4
  },
  update() {
    if (this.floorX + this.floorW / 2 <= 0) {
      this.floorX = this.width;
    }

    Player.playerState.deathScreen != true
      ? (this.floorX -= this.scrollSpeed)
      : (this.floorX = this.floorX);

    this.draw();
  },
  draw() {
    ctx.fillStyle = "#4EC1CA";
    ctx.fillRect(this.x, this.y, this.width, this.floorY);
    ctxLayer.fillStyle = "#DED991";
    ctxLayer.fillRect(this.x, this.height - 70, this.width, 100);
    ctx.save();
    ctxLayer.beginPath();
    ctxLayer.drawImage(
      border,
      this.floorX - this.floorW,
      this.floorY,
      this.floorW * 3,
      this.floorH
    );
  }
};
const generateValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const pipes = [];

class Pipes {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 539;
    this.width = 100;
    this.scrollSpeed = 2;
    this.floor = 700;
    this.gap = 150;
    this.distance = 350;
    this.reset(x, y);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.init();
  }

  init() {
    this.x = this.x + this.distance;
    this.topPos = 0 + this.y - this.height - this.gap;
  }

  update() {
    gameState === true ? (this.x -= this.scrollSpeed) : (this.x = this.x);
    this.draw();
  }
  draw() {
    ctx.restore();
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.drawImage(pipeImg, this.x, this.topPos, this.width, this.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(pipeImgD, this.x, this.y, this.width, this.height);
    ctx.clearRect(this.x, this.floor, this.width, 200);
    ctx.closePath();
  }
}
const generatePipes = count => {
  for (let index = 0; index < count; ++index) {
    pipes.push(new Pipes(350, generateValue(600, 162)));
    pipes.forEach(pipe => {
      pipe.init();
    });
  }
};
generatePipes(2);
