const MainApp = {
  canvasDom: undefined,
  ctx: undefined,
  windowSize: {
    x: undefined,
    y: undefined
  },
  ball: undefined,

  init: function(id) {
    console.log("helloo");
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");
    this.setDimensions();
    this.setHandlers();
    this.setEventListeners();
  },

  setDimensions: function() {
    this.canvasDom.setAttribute("width", window.innerWidth);
    this.canvasDom.setAttribute("height", window.innerHeight);
    this.windowSize.y = window.innerHeight;
    this.windowSize.x = window.innerWidth;
  },

  setHandlers: function() {
    window.onresize = () => this.setDimensions();
  },

  drawControlledBall: function(url) {
    this.ball = new Ball(this.ctx, url, this.winW);

    setInterval(() => {
      this.clear();
      // this.ball.draw();
    }, 5);
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

MainApp.init("mycanvas");
