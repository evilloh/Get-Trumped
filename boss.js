class Boss {
  constructor(ctx, windowSize, framesCounter, framesCounterBullets) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.framesCounter = framesCounter;
    this.framesCounterBullets = framesCounterBullets;
    this.img = new Image();
    this.img.src = "images/boss.png"
    this.bossImagesArray = ["images/boss.png", "images/boss1.png", "images/boss2.png", "images/boss3.png", "images/boss4.png"]
    // coordinates boss
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
    this.originalHealth = 130
    this.health = this.originalHealth;
    this.halfHealth = false

    // bullets arrays
    this.bossShots1 = [];
    this.bossShots2 = [];
    this.bossWalls = [];
    this.putinsArr = []
  }

  drawBoss(framesCounter, framesCounterBullets) {
    if (this.health <= this.originalHealth * .8 && this.health >= this.originalHealth * .5) this.img.src = this.bossImagesArray[1]

    else if (this.health < this.originalHealth * 0.5 && this.health >= this.originalHealth * 0.3) {
      if (this.halfHealth === false) {
        this.halfHealth = true
        this.quoteAudio = new Audio(),
          this.quoteAudio.src = "sound/I will build a wall.mp3"
        this.quoteAudio.play();
      }
      this.img.src = this.bossImagesArray[2]
    }
    if (this.health < this.originalHealth * 0.3 && this.health >= this.originalHealth * 0.15) this.img.src = this.bossImagesArray[3]
    if (this.health < this.originalHealth * 0.15) this.img.src = this.bossImagesArray[4]
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

    this.bossShots1.forEach(function (bullet) {
      bullet.draw();
      bullet.animate();
    });

    this.bossShots2.forEach(function (bullet) {
      bullet.draw();
      bullet.animate();
    });

    this.bossWalls.forEach(function (bullet) {
      bullet.draw()
      bullet.animate()
    })

    this.putinsArr.forEach(function (bullet) {
      bullet.draw()
      bullet.animate1()

    })

    if (framesCounterBullets % 260 === 0) {
      this.bossShot1();
    }

    if (framesCounterBullets % 160 === 0) {
      this.bossShot2();
    }

    if (framesCounterBullets % 400 === 0 && this.health <= this.originalHealth * 0.5 && this.health > this.originalHealth * .3) {

      this.makeWalls();
    }

    if (framesCounterBullets % 150 === 0 && this.health <= this.originalHealth * .3) {

      this.callPutin();
    }

    if (framesCounterBullets % 180 === 0 && this.health <= this.originalHealth * .10) {
      this.bossShot1()
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

  callPutin() {
    let callPutin = new CallPutin(
      this.ctx, this.windowSize, this.framesCounter
    )
    this.putinsArr.push(callPutin)
  }

  makeWalls() {
    let bossWall = new MakeWalls(
      this.ctx,
      this.windowSize,
      this.x,
      this.y,
      this.h,
      this.framesCounter
    )
    this.bossWalls.push(bossWall)
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

class MakeWalls {
  constructor(ctx, windowSize, x, y, framesCounter) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vel = 2;
    this.w = 592 * 0.8;
    this.h = 629 * 0.8;
    this.framesCounter = framesCounter;
    this.imgWall = new Image();
    this.imgWall.src = "images/wall.png";
    this.windowSize = windowSize;
    this.health = 20

  }

  draw() {
    this.ctx.drawImage(this.imgWall, this.x, this.y, this.w, this.h);
  }
  animate() {
    this.x -= this.vel;
  }
}


class CallPutin {
  constructor(ctx, windowSize, framesCounter) {
    this.ctx = ctx;
    this.x = windowSize.x
    this.y = 100
    this.vel = 2;
    this.w = 568 * 0.2;
    this.h = 702 * 0.2;
    this.framesCounter = framesCounter;
    this.imgPutin = new Image();
    this.imgPutin.src = "images/putin.png";
    this.windowSize = windowSize;

  }

  draw() {
    this.ctx.drawImage(this.imgPutin, this.x, this.y, this.w, this.h);
  }
  animate1() {
    if (this.x > this.windowSize.x * .8)
      this.x -= this.vel;
    setTimeout(() => this.animate2(), 3500);
  }
  animate2() {
    // let dx = this.x - playerX;
    // let dy = playerY - this.y;

    // let angle = Math.atan(dy, dx);

    // let magnitude = 20.0;
    // let velX = Math.cos(angle) * magnitude;
    // let velY = Math.sin(angle) * magnitude;
    // this.x -= velX
    // this.y += velY

    if (this.x !== MainApp.player.x) this.y += Math.floor(Math.random() * 60) + 10
    if (this.y !== MainApp.player.X) this.x -= Math.floor(Math.random() * 60) + 30

  }


  perseguir() {


  }
}