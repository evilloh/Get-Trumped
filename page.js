function changeImg(x) {
  x.setAttribute("src", "images/introImg2.jpg");
}

function normalImg(x) {
  x.setAttribute("src", "images/introImg.jpg");
}

const playButton = document.getElementById("play-button");
const weaponsButton = document.getElementById("btn-weapon");
const enemyButton = document.getElementById("btn-enemy");
const homeButton = document.getElementById("home-button");
const instructionButton = document.getElementById("instructions-button");
const introContainer = document.getElementById("introContainer");
const mainRow = document.getElementById("mainRow");
const secondRow = document.getElementById("secondRow");
const thirdRow = document.getElementById("thirdRow");
const fourthRow = document.getElementById("fourthRow");

playButton.addEventListener("click", function() {
  introContainer.style.display = "none";
  MainApp.init("mycanvas");
});

instructionButton.addEventListener("click", function() {
  mainRow.style.display = "none";
  secondRow.style.display = "block";
});

weaponsButton.addEventListener("click", function() {
  secondRow.style.display = "none";
  thirdRow.style.display = "block";
});

enemyButton.addEventListener("click", function() {
  thirdRow.style.display = "none";
  fourthRow.style.display = "block";
});

homeButton.addEventListener("click", function() {
  fourthRow.style.display = "none";
  mainRow.style.display = "block";
});
