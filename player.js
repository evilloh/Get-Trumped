class Player {
  constructor(ctx, windowSize, keys, framesCounter) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.img = new Image();
    this.img.src = "images/player.png";
    this.keys = keys;
    this.framesCounter = framesCounter;
    // coordinates player
    this.x = this.windowSize.x * 0.08;
    this.y0 = this.windowSize.y * 0.65;
    this.y = this.y0;
    this.w = 280;
    this.h = 280;
    // image frames
    this.img.frames = 4;
    this.img.frameIndex = 0;
    // player properties
    this.vy = 0;
    this.setListeners();
    this.bombCounters = 4;

    this.bullets = [];
    this.bombBullets = [];
  }

  drawPlayer(framesCounter) {
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
    //  ARRAY OF GUN BULLETS
    this.bullets = this.bullets.filter(bullet => {
      return bullet.x < this.windowSize.x;
    });
    // ARRAY OF BOMB BULLETS
    this.bombBullets = this.bombBullets.filter(bullet => {
      return bullet.x < this.windowSize.x || bullet.y < this.windowSize.y;
    });
    //
    this.bullets.forEach(function(bullet) {
      bullet.draw();
      bullet.move();
    });

    this.bombBullets.forEach(function(bombBullet) {
      bombBullet.draw();
      bombBullet.move();
    });
  }
  setListeners() {
    document.onkeydown = function(event) {
      if (event.keyCode === this.keys.LEFT && this.x > 0) {
        this.x -= 20;
      } else if (
        event.keyCode === this.keys.RIGHT &&
        this.x < this.windowSize.x * 0.5
      ) {
        this.x += 20;
      } else if (
        event.keyCode === this.keys.TOP &&
        this.y < this.y0 &&
        this.y > this.h - 50
      ) {
        this.img.src = "images/playerJump.png";
        this.y -= 45;
        this.vy -= 10;
      } else if (event.keyCode === this.keys.TOP && this.y == this.y0) {
        this.y -= 45;
        this.vy -= 10;
      } else if (event.keyCode == this.keys.SPACE) {
        this.shoot();
      } else if (event.keyCode == this.keys.E_KEY) {
        this.shootBomb();
      }
    }.bind(this);
  }

  move() {
    // Aumenta la velocidad en el eje y.
    let gravity = 0.4;

    // solo salta cuando el personaje está en el suelo
    if (this.y >= this.y0) {
      this.vy = 1;
      this.y = this.y0;
    } else {
      this.vy += gravity;
      this.y += this.vy;
    }
  }
  shoot() {
    let bullet = new Bullet(
      this.x + this.w,
      this.y + this.h * 0.3,
      this.h,
      this.ctx
    );

    this.bullets.push(bullet);
  }

  shootBomb() {
    if (this.bombCounters > 0) {
      let bombBullet = new BombBullet(
        this.x + this.w,
        this.y + this.h * 0.2,
        this.h,
        this.ctx
      );
      this.bombBullets.push(bombBullet);
      this.bombCounters -= 1;
    }
  }

  checkIfFalling() {
    if (this.y == this.y0) this.img.src = "images/player.png";
  }
  animateImg(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 7 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 3) this.img.frameIndex = 0;
    }
    this.checkIfFalling();
  }
}
