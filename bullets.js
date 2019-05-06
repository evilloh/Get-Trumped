class Bullet {
  constructor(x, y, y0, h, ctx) {
    this.x = x;
    this.y = y;
    this.y0 = y0;
    this.h = h;
    this.ctx = ctx;
    // this.r = 5;
    this.vx = 10;
    this.vy = 1;
    this.gravity = 0.25;
  }

  draw() {
    this.imgGunBullet = new Image();
    this.imgGunBullet.src = "images/bullet.png";
    this.ctx.drawImage(this.imgGunBullet, this.x, this.y, 20, 20);
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  }

  move() {
    this.x += this.vx;
  }
}

class GunBullet extends Bullet {
  constructor(x, y, h, ctx) {
    super(x, y, h, ctx);
    this.x = x;
    this.y = y;
    this.h = h;
    this.ctx = ctx;
  }
}
