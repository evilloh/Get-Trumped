function changeImg(x) {
  x.setAttribute("src", "images/introImg2.jpg");
}

function normalImg(x) {
  x.setAttribute("src", "images/introImg.jpg");
}

const playButton = document.getElementById("play-button");
const weaponsButton = document.getElementById("btn-weapon");
const enemyButton = document.getElementById("btn-enemy");
const movementsButton = document.getElementById("btn-movements");
const homeButton = document.getElementById("home-button");
const instructionButton = document.getElementById("instructions-button");
const introContainer = document.getElementById("introContainer");
const mainRow = document.getElementById("mainRow");
const secondRow = document.getElementById("secondRow");
const thirdRow = document.getElementById("thirdRow");
const thirdtwoRow = document.getElementById("thirdtwoRow");
const fourthRow = document.getElementById("fourthRow");
const gameOverVid = document.getElementById("gameOverVideo")
const winGame = document.getElementById("winVideo")

playButton.addEventListener("click", function () {
  introContainer.style.display = "none";
  MainApp.init("mycanvas");
});

instructionButton.addEventListener("click", function () {
  mainRow.style.display = "none";
  secondRow.style.display = "block";
  secondRow.removeAttribute("display");
});

weaponsButton.addEventListener("click", function () {
  secondRow.style.display = "none";
  thirdRow.style.display = "block";
  thirdRow.removeAttribute("display");
});

movementsButton.addEventListener("click", function () {
  thirdRow.style.display = "none";
  thirdtwoRow.style.display = "block"
  thirdtwoRow.removeAttribute("display");
});

enemyButton.addEventListener("click", function () {
  thirdtwoRow.style.display = "none";
  fourthRow.style.display = "block";
});

homeButton.addEventListener("click", function () {
  fourthRow.style.display = "none";
  mainRow.style.display = "";
});


// Get the modal
const modal = document.getElementById('gameOver');
const modal2 = document.getElementById('winGame');

let openModal = function () {
  modal.style.display = "block";
  gameOverVid.play();
}
let openModal2 = function () {
  modal2.style.display = "block";
  winGame.play();
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}