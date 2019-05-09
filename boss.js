class Boss {
  constructor(ctx, windowSize, framesCounter, framesCounterBullets) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.framesCounter = framesCounter;
    this.framesCounterBullets = framesCounterBullets;
    this.img = new Image();
    this.img.src = "images/boss.png";
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
    this.health = 120;

    // bullets arrays
    this.bossShots1 = [];
    this.bossShots2 = [];
  }

  drawBoss(framesCounter, framesCounterBullets) {
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
    // ARRAY OF BULLETS
    this.bossShots1 = this.bossShots1.filter(bullet => {
      return bullet.x > -300;
    });
    // ARRAY OF BULLETS TWITTER FROM CEILING
    this.bossShots2 = this.bossShots2.filter(bullet => {
      return bullet.y < this.windowSize.y;
    });

    this.bossShots1.forEach(function(bullet) {
      bullet.draw();
      bullet.animate();
    });

    this.bossShots2.forEach(function(bullet) {
      bullet.draw();
      bullet.animate();
    });

    if (framesCounterBullets % 260 === 0) {
      this.bossShot1();
    }

    if (framesCounterBullets % 160 === 0) {
      this.bossShot2();
    }

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

  bossShot1() {
    let bossShot1 = new BossShots1(
      this.ctx,
      this.windowSize,
      this.x,
      this.y,
      this.h,
      this.framesCounter
    );
    this.bossShots1.push(bossShot1);
  }

  bossShot2() {
    let bossShot2 = new BossShots2(
      this.ctx,
      this.windowSize,
      this.x,
      this.y,
      this.h,
      this.framesCounter
    );
    this.bossShots2.push(bossShot2);
  }
}

class BossShots1 {
  constructor(ctx, windowSize, x, y, h, framesCounter) {
    this.ctx = ctx;
    this.x = x - 300;
    this.y = y + 160;
    this.vel = 5;
    this.w = 350;
    this.h = 70;
    this.framesCounter = framesCounter;
    this.imgBossShot1 = new Image();
    this.sentencesArray = [
      "images/trumpSentence1.png",
      "images/trumpSentence2.png",
      "images/trumpSentence3.png",
      "images/trumpSentence4.png",
      "images/trumpSentence5.png",
      "images/trumpSentence6.png",
      "images/trumpSentence7.png",
      "images/trumpSentence8.png",
      "images/trumpSentence9.png"
    ];
    this.randomPhrase = this.sentencesArray[
      Math.floor(Math.random() * this.sentencesArray.length)
    ];
    this.imgBossShot1.src = this.randomPhrase;
  }

  draw() {
    this.ctx.drawImage(this.imgBossShot1, this.x, this.y, this.w, this.h);
  }
  animate() {
    this.x -= this.vel;
  }
}

class BossShots2 {
  constructor(ctx, windowSize, x, y, h, framesCounter) {
    this.ctx = ctx;
    this.x = x;
    this.y = 0;
    this.vel = 5;
    this.w = 45;
    this.h = 30;
    this.framesCounter = framesCounter;
    this.imgBossShot2 = new Image();
    this.imgBossShot2.src = "images/twitterLogo.png";
    this.windowSize = windowSize;
    this.randomX = Math.floor(Math.random() * this.windowSize.x);
  }

  draw() {
    this.ctx.drawImage(this.imgBossShot2, this.randomX, this.y, this.w, this.h);
  }
  animate() {
    this.y += this.vel;
  }
}
