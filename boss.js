class Boss {
  constructor(ctx, windowSize, framesCounter) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.framesCounter = framesCounter;
    this.img = new Image();
    this.img.src = "images/boss.png";
    this.framesCounter = framesCounter;
    // coordinates player
    this.x = this.windowSize.x * 0.8;
    this.y0 = this.windowSize.y * 0.8;
    this.y = this.windowSize.y * 0.08;
    this.w = 210;
    this.h = 280;
    // image frames
    this.img.frames = 3;
    this.img.frameIndex = 0;
    // boss properties
    this.vel = 2;
  }

  drawBoss(framesCounter) {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames - 6),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.animateImg(framesCounter);
  }
  animateImg(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 15 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
  }
  move() {
    if (this.y >= this.y0 - this.h + 50 || this.y < this.windowSize.y * 0.08)
      this.changeDirection();

    this.y += this.vel;
  }

  changeDirection() {
    this.vel *= -1;
  }
}
