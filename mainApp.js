const MainApp = {
  canvasDom: undefined,
  ctx: undefined,
  windowSize: {
    x: undefined,
    y: undefined,
    player: undefined,
    fps: 60
  },

  init: function(id) {
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");
    this.setDimensions();
    this.setHandlers();
    this.setEventListeners();
    // START GAME MUST BE DONE MANUALLY
    this.startGame();
  },

  startGame: function() {
    this.player = new Player(this.ctx, this.windowSize);
    this.player.drawFilledSquares();
    setInterval(() => {
      this.clear();
      this.player.drawFilledSquares();
      // this.ball.draw();
    }, 1000 / this.fps);
  },

  setDimensions: function() {
    this.canvasDom.setAttribute("width", window.innerWidth);
    this.canvasDom.setAttribute("height", window.innerHeight - 20);
    this.windowSize.y = window.innerHeight;
    this.windowSize.x = window.innerWidth;
  },

  setHandlers: function() {
    window.onresize = () => this.setDimensions();
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.winW, this.winH);
  },

  setEventListeners: function() {
    document.onkeyup = e => {
      // if (e.keyCode === 37) this.ball.moveLeft();
      // if (e.keyCode === 39) this.ball.moveRight();
    };
  }
};

class Player {
  constructor(ctx, windowSize) {
    this.ctx = ctx;
    this.windowSize = windowSize;
  }

  drawFilledSquares() {
    this.ctx.fillStyle = "blue"; // cambia los colores de relleno
    this.ctx.fillRect(this.windowSize.x / 6, this.windowSize.y / 6, 100, 100);
  }
}

class Boss {}

MainApp.init("mycanvas");
