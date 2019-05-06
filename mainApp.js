const MainApp = {
  canvasDom: undefined,
  ctx: undefined,
  windowSize: {
    x: undefined,
    y: undefined
  },
  player: undefined,
  fps: 60,
  framesCounter: 0,
  framesCounterBullets: 0,
  keys: {
    TOP: 87,
    LEFT: 65,
    RIGHT: 68,
    SPACE: 32,
    E_KEY: 69
  },

  init: function(id) {
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");
    this.setDimensions();
    this.setHandlers();
    // START GAME MUST BE DONE MANUALLY
    this.startGame();
  },

  startGame: function() {
    this.fps = 60;
    this.reset();

    // controlamos que frameCounter no sea superior a 1000

    setInterval(() => {
      if (this.framesCounter > 1000) {
        this.framesCounter = 20;
      }
      if (this.framesCounterBullets > 1000) {
        this.framesCounterBullets = 1;
      }
      this.framesCounterBullets++;
      this.framesCounter++;
      this.clear();
      this.drawAll();
      this.moveAll();
      // this.ball.draw();
    }, 1000 / this.fps);
  },

  setDimensions: function() {
    this.canvasDom.setAttribute("width", window.innerWidth - 20);
    this.canvasDom.setAttribute("height", window.innerHeight - 20);
    this.windowSize.y = window.innerHeight;
    this.windowSize.x = window.innerWidth;
  },

  setHandlers: function() {
    window.onresize = () => this.setDimensions();
  },

  reset: function() {
    this.player = new Player(
      this.ctx,
      this.windowSize,
      this.keys,
      this.framesCounter
    );
    this.boss = new Boss(
      this.ctx,
      this.windowSize,
      this.framesCounter,
      this.framesCounterBullets
    );
    this.background = new Background(this.ctx, this.windowSize);
    this.framesCounter = 0;
    this.playerUi = new PlayerUI(this.ctx, this.windowSize);
  },

  drawAll: function() {
    this.background.drawBackground();
    this.player.drawPlayer(this.framesCounter);
    this.boss.drawBoss(this.framesCounter, this.framesCounterBullets);
    this.playerUi.drawUi();
  },

  moveAll: function() {
    this.player.move();
    this.boss.move();
    // this.boss.animateImg(this.framesCounter);
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.winW, this.winH);
  }
};

class Background {
  constructor(ctx, windowSize) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.img = new Image();
    this.img.src = "images/backgroundImage.jpg";
  }
  drawBackground() {
    this.ctx.drawImage(this.img, 0, 0, this.windowSize.x, this.windowSize.y);
  }
}

class PlayerUI {
  constructor(ctx, windowSize) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.img = new Image();
    this.img.src = "images/life1.png";
  }
  drawUi() {
    this.ctx.drawImage(this.img, 50, 50, 180, 181);
  }
}

MainApp.init("mycanvas");
