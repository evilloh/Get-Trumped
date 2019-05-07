class Bullet {
  constructor(x, y, h, ctx) {
    this.x = x;
    this.y = y;
    // this.y0 = y0;
    this.h = h;
    this.ctx = ctx;
    // this.r = 5;
    this.vx = 10;
    // this.vy = 1;
    this.gravity = 0.25;
    this.imgGunBullet = new Image();
    this.imgGunBullet.src = "images/bullet.png";
    this.w = 20;
  }

  draw() {
    this.ctx.drawImage(this.imgGunBullet, this.x, this.y, this.w, this.w);
    // this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  }

  move() {
    this.x += this.vx;
  }
}

class BombBullet extends Bullet {
  constructor(x, y, h, ctx) {
    super(x, y, h, ctx);
    this.x = x;
    this.y = y;
    this.h = h;
    this.ctx = ctx;
    this.vx = 10;
    this.gravity = 0.35;
    this.vy = 1;
    this.imgGunBullet = new Image();
    this.imgGunBullet.src = "images/catBomb.png";
  }
  draw() {
    this.ctx.drawImage(this.imgGunBullet, this.x, this.y, 70, 70);
    // this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  }

  move() {
    this.y -= 15;
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y > this.y0 + this.h) {
      this.vy *= -1;
    }
  }
}
