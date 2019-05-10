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
    this.w = 240;
    this.h = 240;
    // image frames
    this.img.frames = 4;
    this.img.frameIndex = 0;
    // player properties
    this.vy = 0;
    this.vx = 0;
    this.acc = 0;
    this.setListeners();
    this.crawl = 0;
    this.bombBulletsAvailable = 4;
    this.bullets = [];
    this.bombBullets = [];
    this.moveRightTrue = undefined;
    this.moveLeftTrue = undefined;
    this.invincible = false;
    this.invincibleCounter = 20;
    this.jumping = false
    this.shooting = false;
  }

  drawPlayer(framesCounter) {
    // if (this.crawl === 1) {
    //   this.img.src = "images/boss.png";
    //   // HERE ALL THE CHANGES OF THE DIMENSION OF THE IMAGE
    // } else
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
    this.bullets.forEach(function (bullet) {
      bullet.draw();
      bullet.move();
    });

    this.bombBullets.forEach(function (bombBullet) {
      bombBullet.draw();
      bombBullet.move();
    });
  }
  setListeners() {
    document.onkeydown = function (event) {
      if (event.keyCode == this.keys.DOWN || event.keyCode === 40) {
        if (this.y === this.y0) {
          this.crawl = 1;
          this.y = this.y0 + 140;
        }
        // if (this.y == this.y0) {
        //   if (this.y0 <= this.windowSize.y * 0.65)
        //     this.y0 = this.windowSize.y * 0.65 + 100;
        //   this.y = this.y0 + 140;
        // }
      } else if (event.keyCode === this.keys.LEFT || event.keyCode === 37) {
        this.moveLeftTrue = true;
      } else if (event.keyCode === this.keys.RIGHT || event.keyCode === 39) {
        this.moveRightTrue = true;
      } else if (event.keyCode === this.keys.Q_KEY) {
        if (this.invincibleCounter >= 20) {
          this.invincible = true
          this.invincibleCounter = 0
          MainApp.invincibleCounter = 0
          this.uginProtected = new Audio(),
            this.uginProtected.src = "sound/uginBreathing.mp3",
            this.uginProtected.play();
          setTimeout(() => { this.invincible = false }, 3000)
        }
      }
      else if (
        event.keyCode === this.keys.TOP &&
        this.y < this.y0 &&
        this.y > this.h - 50 &&
        this.jumping === false
        || event.keyCode === 38 &&
        this.y < this.y0 &&
        this.y > this.h - 50 &&
        this.jumping === false
      ) {
        if (!this.invincible) { this.img.src = "images/playerJump.png"; }
        this.jumping = true
        this.y -= 45;
        this.vy -= 10;
      } else if (event.keyCode === this.keys.TOP && this.y == this.y0 || event.keyCode === 38 && this.y == this.y0) {
        this.y -= 45;
        this.vy -= 10;
      } else if (event.keyCode == this.keys.SPACE && this.shooting === false) {
        this.shooting = true
        this.shoot();
      } else if (event.keyCode == this.keys.E_KEY) {
        if (this.bombBulletsAvailable > 0) {
          this.shootBomb();
        }
      }
    }.bind(this);

    document.onkeyup = function (event) {
      if (event.keyCode === this.keys.RIGHT || event.keyCode === 39) {
        this.moveRightTrue = false;
      } else if (event.keyCode === this.keys.LEFT || event.keyCode === 37) {
        this.moveLeftTrue = false;
      } else if (event.keyCode === this.keys.DOWN || event.keyCode === 40) {
        this.crawl = 0;
        this.h = 240;
      } else if (
        event.keyCode === this.keys.TOP &&
        this.jumping === true || event.keyCode === 38 &&
        this.jumping === true
      ) {
        this.jumping = false
      } else if (event.keyCode == this.keys.SPACE && this.shooting === true) {
        this.shooting = false
      }
    }.bind(this);
  }

  moveRight() {
    if (this.moveRightTrue) this.x += 7;
  }
  moveLeft() {
    if (this.moveLeftTrue) this.x -= 7;
  }
  moveDown() {
    this.img.src = "images/playerCrawl.png";
    this.h = 120;
  }

  checkIfFalling() {
    if (this.y == this.y0) this.img.src = "images/player.png";
  }

  move() {
    if (this.x < this.windowSize.x * 0.6) this.moveRight();
    if (this.x > 0) this.moveLeft();
    if (this.crawl === 1) this.moveDown();
    if (this.invincible) {
      this.img.src = "images/uginProtection.png"
    }
    if (!this.invincible && this.y == this.y0 && this.crawl === 0) this.img.src = "images/playerShadow.png"
    if (!this.invincible && this.y != this.y0 && this.crawl === 0) this.img.src = "images/playerJump.png"

    // Aumenta la velocidad en el eje y.
    let gravity = 0.4;

    // solo salta cuando el personaje está en el suelo
    if (!this.crawl) {
      if (this.y >= this.y0) {
        this.vy = 1;
        this.y = this.y0;
      } else {
        this.vy += gravity;
        this.y += this.vy;
      }
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
    if (this.bombBulletsAvailable > 0) {
      let bombBullet = new BombBullet(
        this.x + this.w,
        this.y + this.h * 0.2,
        this.h,
        this.ctx
      );
      this.bombBullets.push(bombBullet);
      this.bombBulletsAvailable -= 1;
      MainApp.catBombs.bombBulletsAvailable -= 1;
    }
  }

  rechargeBullets(arg) {
    if (arg.player.bombBulletsAvailable < 4) {
      arg.player.bombBulletsAvailable++;
      MainApp.catBombs.bombBulletsAvailable++;
    }
    if (arg.player.invincibleCounter < 21) {
      arg.player.invincibleCounter++
      MainApp.invincibleCounter++
    }
  }

  animateImg(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje

    this.checkIfFalling();
    if (framesCounter % 7 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 3) this.img.frameIndex = 0;
    }
  }
}
