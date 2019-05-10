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
    E_KEY: 69,
    DOWN: 83,
    Q_KEY: 81,
  },
  lifecounter: 8,
  playerisHit: true,
  playerisHitQuote: true,
  bossIsHit: true,
  introCounter: 0,
  trumpQuotesArray: ["sound/china1.mp3", "sound/trumpQuote1.mp3", "sound/trumpQuote2.mp3", "sound/china2.mp3", "sound/chinatriple.mp3", "sound/make america great again.mp3", "sound/chinatriple2.mp3"],
  barkArray: ["sound/bark1.mp3", "sound/bark2.mp3", "sound/bark3.mp3"],

  init: function (id) {
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");
    this.setDimensions();
    this.setHandlers();
    // START GAME MUST BE DONE MANUALLY
    this.startGame();
    // this.introGame();
  },
  // introGame: function() {
  //   this.reset();
  //   setInterval(() => {
  //     this.clear();
  //     this.drawIntro();
  //   }, 1000);
  // },

  // drawIntro() {
  //   this.intro = new Intro(this.ctx, this.windowSize, this.introCounter);
  //   this.intro.draw();
  //   if (this.introCounter < 8) this.introCounter++;
  // },
  startGame: function () {
    this.fps = 60;
    this.reset();
    setInterval(this.player.rechargeBullets, 4000, this);

    // controlamos que frameCounter no sea superior a 1000
    setInterval(() => {
      this.clear();

      if (this.mainTune.ended) {
        this.mainTune.currentTime = 0
        this.mainTune.play()
      }

      if (this.framesCounter > 1000) {
        this.framesCounter = 20;
      }
      if (this.framesCounterBullets > 1000) {
        this.framesCounterBullets = 1;
      }
      this.framesCounterBullets++;
      this.framesCounter++;
      // COLLISION CAT BOMB
      if (!this.bossCollisions1()) {
        this.bossIsHit = false;
      }
      if (!this.bossIsHit && this.bossCollisions1()) {
        this.boss.health -= 3;
        this.bossIsHit = true;
        this.eliminateCollisionCatBomb();
      }
      //  COLLISION GUNSHOTS
      if (!this.bossCollisions2()) {
        this.bossIsHit = false;
      }
      if (!this.bossIsHit && this.bossCollisions2()) {
        this.boss.health -= 1;
        this.bossIsHit = true;
        this.eliminateCollisionGunShots();
      }

      //  COLLISION WALLS
      if (this.wallCollisionsReceiving()) {
        this.playerisHit = false;
      }

      if (!this.playerisHit && this.wallCollisionsReceiving() && !this.player.invincible) {
        this.playerisHit = true;
        this.playerUi.lifecounter -= 1;
        this.eliminateWallCollision();
      }

      //  COLLISION PUTINS

      if (this.putinCollision()) {
        this.playerisHit = false;
      }
      if (!this.playerisHit && this.putinCollision() && !this.player.invincible) {
        this.playerisHit = true;
        this.playerUi.lifecounter -= 1;
        this.eliminatePutinCollision();
      }

      // COLLISIONS TWEETS
      if (!this.playerCollisions1()) {
        this.playerisHit = false;
      }
      if (!this.playerisHit && this.playerCollisions1() && !this.player.invincible) {
        this.playerisHit = true;
        this.playerUi.lifecounter -= 1;
        this.eliminateCollisionTweets();
      }
      // COLLISION QUOTES
      if (!this.playerCollisions2()) {
        this.playerisHitQuote = false;
      }
      if (!this.playerisHitQuote && this.playerCollisions2() && !this.player.invincible) {
        this.playerisHitQuote = true;
        this.playerUi.lifecounter -= 1;
        this.eliminateCollisionQuotes();
      }

      this.drawAll();
      this.moveAll();
      if (this.playerUi.lifecounter === 0) {
        this.gameOver();
      }
      if (this.boss.health <= 0) {
        this.gameWon();
      }
    }, 1000 / this.fps);
  },

  setDimensions: function () {
    this.canvasDom.setAttribute("width", window.innerWidth - 20);
    this.canvasDom.setAttribute("height", window.innerHeight - 20);
    // this.windowSize.y = window.innerHeight;
    // this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
    this.windowSize.x = window.innerWidth;
  },

  setHandlers: function () {
    window.onresize = () => this.setDimensions();
  },

  reset: function () {
    this.mainTune = new Audio(),
      this.mainTune.volume = 0.3
    this.mainTune.src = "sound/mainTheme.mp3",
      this.mainTune.play();

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
    this.playerUi = new PlayerUI(this.ctx, this.windowSize, this.lifecounter);
    this.catBombs = new CatBombs(this.ctx, this.player.bombBulletsAvailable);
    this.humanRights = new HumanRights(this.ctx);
  },

  drawAll: function () {
    this.background.drawBackground();
    this.player.drawPlayer(this.framesCounter);
    this.boss.drawBoss(this.framesCounter, this.framesCounterBullets);
    this.playerUi.drawUi();
    this.catBombs.draw();
    this.humanRights.draw();
  },

  moveAll: function () {
    this.player.move();
    this.boss.move();
    // this.boss.animateImg(this.framesCounter);
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.windowSize.x, this.windowSize.y);
  },

  drawCollision() {
    this.collisionAnimation = new Image(),
      this.collisionAnimation.src = "images/collision.png"
    MainApp.ctx.drawImage(this.collisionAnimation, obstacle.x - 40, obstacle.y - 40, 30, 30)
  },

  eliminateCollisionCatBomb: function () {
    return this.player.bombBullets.some(obstacle => {
      if (
        this.boss.x <= obstacle.x + obstacle.w &&
        this.boss.y <= obstacle.y &&
        this.boss.y + this.boss.h >= obstacle.y + obstacle.w
      ) {

        // WALL CON VIDA WALL CON LIFE crea O un.some dentro un .some O un forEAch de los muros y dentro le metes el .some

        this.player.bombBullets = this.player.bombBullets.filter(function (el) {
          this.catBombAudio = new Audio();
          let meawArray = ["sound/meaw.mp3", "sound/meaw2.mp3", "sound/meaw3.mp3"];
          this.catBombAudio.src = meawArray[Math.floor(Math.random() * 3)]
          this.catBombAudio.play();

          return el !== obstacle;
        });
      }
    });
  },

  eliminateCollisionGunShots: function () {
    return this.player.bullets.some(obstacle => {
      if (
        this.boss.x <= obstacle.x + obstacle.w &&
        this.boss.y <= obstacle.y &&
        this.boss.y + this.boss.h >= obstacle.y + obstacle.w
      ) {
        this.player.bullets = this.player.bullets.filter(function (el) {
          return el !== obstacle;
        });
      }
    });
  },

  eliminateCollisionTweets: function () {
    return this.boss.bossShots2.some(obstacle => {
      if (
        this.player.x + this.player.w >= obstacle.randomX &&
        this.player.x < obstacle.randomX + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y
      ) {
        this.boss.bossShots2 = this.boss.bossShots2.filter(function (el) {
          this.barkAudio = new Audio(),
            this.barkAudio.src = MainApp.barkArray[Math.floor(Math.random() * 3)]
          this.barkAudio.play();
          return el !== obstacle;
        });
      }
    });
  },

  eliminateCollisionQuotes: function () {
    return this.boss.bossShots1.some(obstacle => {
      if (
        this.player.x + this.player.w - 70 >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y
      ) {
        this.boss.bossShots1 = this.boss.bossShots1.filter((el) => {
          this.quoteAudio = new Audio(),
            this.quoteAudio.src = this.trumpQuotesArray[Math.floor(Math.random() * 7)]
          this.quoteAudio.play();
          return el !== obstacle;

        });
      }
    });
  },

  eliminateWallCollision: function () {
    return this.boss.bossWalls.some(obstacle => {
      if (
        this.player.x + this.player.w >= obstacle.x + 100 &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + 100 <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h - 10 >= obstacle.y
      ) {
        this.boss.bossWalls = this.boss.bossWalls.filter((el) => {
          this.quoteAudio = new Audio(),
            this.quoteAudio.src = "sound/I will build a wall.mp3"
          this.quoteAudio.play();
          return el !== obstacle;
        });
      }
    });
  },

  eliminatePutinCollision: function () {
    return this.boss.putinsArr.some(obstacle => {
      if (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y
      ) {
        this.boss.putinsArr = this.boss.putinsArr.filter((el) => {
          this.quoteAudio = new Audio(),
            this.quoteAudio.src = "sound/russia.mp3"
          this.quoteAudio.play();
          return el !== obstacle;
        });
      }
    });
  },

  bossCollisions1: function () {
    return this.player.bombBullets.some(obstacle => {

      if (
        this.boss.x <= obstacle.x + obstacle.w &&
        this.boss.x + this.boss.w >= obstacle.x &&
        this.boss.y <= obstacle.y &&
        this.boss.y + this.boss.h >= obstacle.y + obstacle.w
      ) {
        return true;
      }
    });
  },

  bossCollisions2: function () {
    return this.player.bullets.some(obstacle => {
      return (
        this.boss.x <= obstacle.x + obstacle.w &&
        this.boss.y <= obstacle.y &&
        this.boss.y + this.boss.h >= obstacle.y + obstacle.w
      );
    });
  },

  wallCollisionsReceiving: function () {
    return this.boss.bossWalls.some(obstacle => {
      return (
        this.player.x + this.player.w >= obstacle.x + 100 &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + 100 <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h - 10 >= obstacle.y
      )
    });
  },

  putinCollision: function () {
    return this.boss.putinsArr.some(obstacle => {
      return (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y
      )
    });
  },

  playerCollisions1: function () {
    return this.boss.bossShots2.some(obstacle => {
      return (
        this.player.x + this.player.w >= obstacle.randomX &&
        this.player.x < obstacle.randomX + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y
      );
    });
  },
  playerCollisions2: function () {
    return this.boss.bossShots1.some(obstacle => {
      return (
        this.player.x + this.player.w - 70 >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y <= obstacle.y + obstacle.h &&
        this.player.y + this.player.h >= obstacle.y
      );
    });
  },


  gameOver: function () {
    for (i = 0; i < 100; i++) {
      window.clearInterval(i);
    }
    openModal()
  },

  gameWon: function () {
    for (i = 0; i < 100; i++) {
      window.clearInterval(i);
    }
    openModal2()
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
  constructor(ctx, windowSize, lifecounter) {
    this.ctx = ctx;
    this.windowSize = windowSize;
    this.lifecounter = lifecounter;
    this.img = new Image();
    this.uiArray = [
      "images/life7.png",
      "images/life7.png",
      "images/life6.png",
      "images/life5.png",
      "images/life5.png",
      "images/life4.png",
      "images/life3.png",
      "images/life2.png",
      "images/life1.png"
    ];
  }
  drawUi() {
    this.img.src = this.uiArray[this.lifecounter];
    this.ctx.drawImage(this.img, 50, 50, 180, 181);
  }
}

class CatBombs {
  constructor(ctx, ) {
    this.ctx = ctx;
    this.x = 240;
    this.y = 50;
    this.bombBulletsAvailable = 4
    this.img = new Image();
    this.bombsImagesArray = [
      "images/catbomb0.png",
      "images/catbomb1.png",
      "images/catbomb2.png",
      "images/catbomb3.png",
      "images/catbomb4.png"
    ];
  }
  draw() {
    this.img.src = this.bombsImagesArray[this.bombBulletsAvailable];
    this.ctx.drawImage(this.img, this.x, this.y, 500, 80);
  }
}

class HumanRights {
  constructor(ctx, ) {
    this.ctx = ctx;
    this.x = 780;
    this.y = 50;
    this.invincibleCounter = 20;
    this.img = new Image();
    this.arrayIndex = this.checkInvincible()

    this.humanRightsImages = [
      "images/humanrightsavailable.png",
      "images/humanrightsnotavailable.png"
    ];
  }
  checkInvincible() {
    if (this.invincibleCounter === 20) { return 0 } else { return 1 }
  }
  draw() {
    let casa = 0
    if (MainApp.player.invincibleCounter >= 20) { casa = 0 } else { casa = 1 }
    this.img.src = this.humanRightsImages[casa];
    this.ctx.drawImage(this.img, this.x, this.y, 80, 80);
  }
}

// class CollisionExplosion {
//   constructor(ctx, x, y) {
//     this.ctx = ctx;
//     this.x = x;
//     this.y = y;
//     this.img = new Image();
//     this.img.src = "images/collision.png";
//   }
//   drawExplosion() {
//     this.ctx.drawImage(this.img, this.x, this.y, 30, 30);
//   }
// }
