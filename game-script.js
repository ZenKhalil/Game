"use strict";
//window.addEventListener("load", start);
let seconds = 80;
let points = 0;
let lives = 0;
let currentLevel = 1;
let randomGeneratedFood = [];
let allFalling = document.querySelectorAll(".falling");
let foodMenu = document.querySelector("#food_Menu");
let game = document.querySelector("#game");
game.style.display = "none";
let allFoodImages = [
  "Food1",
  "Food2",
  "Food3",
  "Food4",
  "Food5",
  "Food6",
  "Food7",
  "Food8",
];
let allFoodPrices = [
  "$8.99",
  "$10.99",
  "$12.99",
  "$8.99",
  "$10.99",
  "$12.99",
  "$8.99",
  "$10.99",
];

for (let f = 1; f <= 4; f++) {
  let randomFood = allFoodImages.splice(
    (allFoodImages.length * Math.random()) | 0,
    1
  )[0];
  randomGeneratedFood.push(randomFood);
  let randomPrice = allFoodPrices.splice(
    (allFoodPrices.length * Math.random()) | 0,
    1
  )[0];
  foodMenu.innerHTML +=
    "<div class='food-item' id='F_" +
    randomFood +
    "'><img class='food-image' src='Food/" +
    randomFood +
    ".png' alt='Food Image'><div class='food-details'><div class='food-name'>" +
    randomFood +
    "</div><div class='food-amount'>" +
    randomPrice +
    "</div></div></div>";
}
console.log(randomGeneratedFood);
for (let f = 0; f < allFalling.length; f++) {
  allFalling[f].style.display = "none";
}
function startScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#rules").style.display = "block";
}
function rules() {
  document.querySelector("#rules").style.display = "none";
  document.querySelector("#screen").style.background = "none";
  document.querySelector("#cat" + currentLevel).style.display = "block";
  document.body.style.backgroundImage = "url(Images/Cover.png)";
  document.querySelector("#cat" + currentLevel).innerHTML =
    "<img src='Cats/Black 1.png' />";
  game.style.display = "block";
  document.getElementById("timer").innerHTML = seconds;
  let timeInterval = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      clearInterval(timeInterval);
      //document.getElementById("timer").style.display = "none";
      let remainingFood = document.querySelectorAll(".falling>img");
      for (let i = 0; i < remainingFood.length; i++) {
        remainingFood[i].classList.add("zoom_out");
      }
      document.getElementById("game_over").classList.remove("hidden");
    } else {
      if (seconds < 10)
        document.getElementById("timer").innerHTML = "0" + seconds;
      else document.getElementById("timer").innerHTML = seconds;
    }
    if (!document.getElementById("game_over").classList.contains("hidden")) {
      var sound = document.getElementById("sound_game_over").play();
      document.querySelector("#sound_dreams").pause();
      setTimeout(function () {
        document.querySelector("#sound_game_over").pause();
      }, 1000);
    }
  }, 1000);
  start();
}
function start() {
  console.log("JavaScript kører!");
  allFalling = document.querySelectorAll(".falling");
  for (let f = 0; f < allFalling.length; f++) {
    allFalling[f].style.display = "block";
  }
  let points = 0;
  let lives = 0;
  startAnimationer();
  startPositioner();
  registrerKlik();

  // Start background music
  document.querySelector("#sound_dreams").play();

  // nulstil point og liv
  points = 0;
  lives = 3;

  document
    .querySelector("#food1_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food2_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food3_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food4_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food5_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food6_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food7_container")
    .addEventListener("animationiteration", foodRestart);
  document
    .querySelector("#food8_container")
    .addEventListener("animationiteration", foodRestart);

  // Define the food lists for each character
  const cat1FoodList = [
    "#food1_container",
    "#food2_container",
    "#food3_container",
    "#food4_container",
    "#food5_container",
  ];
  const cat2FoodList = [
    "#food1_container",
    "#food2_container",
    "#food3_container",
    "#food4_container",
    "#food5_container",
  ];
  const cat3FoodList = ["food1", "food2", "food3", "food4", "food5"];
  const cat4FoodList = ["food1", "food2", "food3", "food4", "food5"];

  // Select the character element
  const cat1 = document.querySelector(".cat1");

  // Generate a random food list for the character
  const foodList = cat1.classList.contains("cat1")
    ? cat1FoodList
    : cat3FoodList;
  const randomFoodList = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * foodList.length);
    randomFoodList.push(foodList[randomIndex]);
  }
  console.log(randomFoodList);
  // Define the variables to keep track of the caught food items
  let correctCount = 0;
  let incorrectCount = 0;
  const caughtFood = [];

  // Attach the mousedown event listener to the food items
  const foodItems = document.querySelectorAll(".food-item");
  foodItems.forEach((foodItem) => {
    foodItem.addEventListener("mousedown", function () {
      const food = this.dataset.food;
      if (isCorrectFood(food) && !caughtFood.includes(food)) {
        correctCount++;
        caughtFood.push(food);
        updateCat1Expression();
      } else {
        incorrectCount++;
        updateCat1Expression();
      }
    });
  });
}

function startAnimationer() {
  document.querySelector("#food1_container").classList.add("falling");
  document.querySelector("#food2_container").classList.add("falling");
  document.querySelector("#food3_container").classList.add("falling");
  document.querySelector("#food4_container").classList.add("falling");
  document.querySelector("#food5_container").classList.add("falling");
  document.querySelector("#food6_container").classList.add("falling");
  document.querySelector("#food7_container").classList.add("falling");
  document.querySelector("#food8_container").classList.add("falling");
}

function startPositioner() {
  const screenWidth = window.innerWidth;
  const middleArea = screenWidth / 4; // set the middle area to be one-third of the screen width
  const minPosition = middleArea;
  const maxPosition = middleArea * 2; // set the range of positions to be within the middle area

  document.querySelector("#food1_container").classList.add("position1");
  document.querySelector("#food2_container").classList.add("position2");
  document.querySelector("#food3_container").classList.add("position3");
  document.querySelector("#food4_container").classList.add("position4");
  document.querySelector("#food5_container").classList.add("position5");
  document.querySelector("#food6_container").classList.add("position6");
  document.querySelector("#food7_container").classList.add("position7");
  document.querySelector("#food8_container").classList.add("position8");

  document.querySelector(".position1").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position2").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position3").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position4").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position5").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position6").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position7").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
  document.querySelector(".position8").style.left =
    getRandomPosition(minPosition, maxPosition) + "px";
}

function getRandomPosition(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function registrerKlik() {
  document
    .querySelector("#food1_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food2_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food3_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food4_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food5_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food6_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food7_container")
    .addEventListener("mousedown", mousedownFood);
  document
    .querySelector("#food8_container")
    .addEventListener("mousedown", mousedownFood);
}

function nextLevel() {
  lives = 0;
  document.getElementById("cat" + currentLevel).style.display = "none";
  currentLevel++;
  document.getElementById("cat" + currentLevel).style.display = "block";
  if (currentLevel == 2)
    document.querySelector("#cat" + currentLevel).innerHTML =
      "<img src='Cats/Grey 1.png' />";
  else if (currentLevel == 3)
    document.querySelector("#cat" + currentLevel).innerHTML =
      "<img src='Cats/Orange 1.png' />";
  else if (currentLevel == 4)
    document.querySelector("#cat" + currentLevel).innerHTML =
      "<img src='Cats/White 1.png' />";
  points = 0;
  document.querySelector("#point_count").textContent = points;
  document.getElementById("life_board").innerHTML =
    '<img id="life1" src="Images/Smile face.png" class="active_heart"><img id="life2" src="Images/Smile face.png" class="active_heart"><img id="life3" src="Images/Smile face.png" class="active_heart">';
  randomGeneratedFood = [];
  document.getElementById("food_Menu").innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    document.getElementById("food_Menu").innerHTML += "";
  }
  allFoodImages = [
    "Food1",
    "Food2",
    "Food3",
    "Food4",
    "Food5",
    "Food6",
    "Food7",
    "Food8",
  ];
  allFoodPrices = [
    "$8.99",
    "$10.99",
    "$12.99",
    "$8.99",
    "$10.99",
    "$12.99",
    "$8.99",
    "$10.99",
  ];
  for (let f = 1; f <= 4; f++) {
    let randomFood = allFoodImages.splice(
      (allFoodImages.length * Math.random()) | 0,
      1
    )[0];
    randomGeneratedFood.push(randomFood);
    let randomPrice = allFoodPrices.splice(
      (allFoodPrices.length * Math.random()) | 0,
      1
    )[0];
    foodMenu.innerHTML +=
      "<div class='food-item' id='F_" +
      randomFood +
      "'><img class='food-image' src='Food/" +
      randomFood +
      ".png' alt='Food Image'><div class='food-details'><div class='food-name'>" +
      randomFood +
      "</div><div class='food-amount'>" +
      randomPrice +
      "</div></div></div>";
  }
  let remainingFood = document.querySelectorAll(".falling>img");
  for (let i = 0; i < remainingFood.length; i++) {
    remainingFood[i].classList.remove("zoom_out");
  }
  start();
}

// Add a mousedown event listener to the food object
function mousedownFood() {
  //console.log(this);	//console.log(document.getElementById(document.getElementById(this.id).childNodes[1].id).src.split("/").pop().split(".")[0]);
  let foodItem = document
    .getElementById(document.getElementById(this.id).childNodes[1].id)
    .src.split("/")
    .pop()
    .split(".")[0];

  let food = this;

  // Forhindr gentagne mousedowns
  food.removeEventListener("mousedown", mousedownFood);

  // Stop coin container
  food.classList.add("paused");

  // sæt forsvind-animation på coin
  food.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: food1Gone
  food.addEventListener("animationend", foodGone);

  if (randomGeneratedFood.includes(foodItem)) {
    // Giv point
    incrementPoints();
    document.getElementById("F_" + foodItem).style.backgroundColor = "green";
    if (points == 4) {
      let remainingFood = document.querySelectorAll(".falling>img");
      for (let i = 0; i < remainingFood.length; i++) {
        remainingFood[i].classList.add("zoom_out");
      }
      if (lives < 3) {
        if (currentLevel == 1)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/Black 2.png' />";
        else if (currentLevel == 2)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/Grey 2.png' />";
        else if (currentLevel == 3)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/Orange 2.png' />";
        else if (currentLevel == 4)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/White 2.png' />";
      }
      if (currentLevel < 4) {
        setTimeout(() => {
          nextLevel();
        }, 2000);
      } else if (currentLevel == 4) {
        document.getElementById("level_complete").classList.remove("hidden");
        var sound = document.getElementById("sound_tada").play();
        sound.play();
        document.querySelector("#sound_dreams").pause();
        setTimeout(function () {
          document.querySelector("#sound_tada").pause();
        }, 2000);
      }
    }
  } else {
    if (lives < 3) {
      lives++;
      document
        .getElementById("life" + lives)
        .setAttribute("src", "Images/Angry face.png");
      if (lives == 3) {
        let remainingFood = document.querySelectorAll(".falling>img");
        for (let i = 0; i < remainingFood.length; i++) {
          remainingFood[i].classList.add("zoom_out");
        }
        if (currentLevel == 1)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/Black 3.png' />";
        else if (currentLevel == 2)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/Grey 3.png' />";
        else if (currentLevel == 3)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/Orange 3.png' />";
        else if (currentLevel == 4)
          document.getElementById("cat" + currentLevel).innerHTML =
            "<img src='Cats/White 3.png' />";
        if (currentLevel < 4) {
          document.getElementById("game_over").classList.remove("hidden");
          var sound = document.getElementById("sound_game_over").play();
          sound.play();
          document.querySelector("#sound_dreams").pause();
          setTimeout(function () {
            document.querySelector("#sound_game_over").pause();
          }, 1000);
        }
      }
    }
  }
}
function foodGone() {
  let food = this; //document.querySelector("#food1");
  console.log("food gone");

  // fjern event der bringer os herind
  food.removeEventListener("animationend", foodGone);
  // fjern forsvind-animation fra sprite
  //food.querySelector("#img").classList.remove("zoom_out");
  // fjern pause fra container
  food.classList.remove("paused");

  foodRestart.call(this);
  // gør det muligt at klikke på coin igen
  food.addEventListener("mousedown", mousedownFood);
}

function foodRestart() {
  let food = this;
  // genstart falling animatioon på container
  food.classList.remove("falling");
  food.offsetWidth;
  food.classList.add("falling");

  food.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8"
  );
  let pos = Math.floor(Math.random() * 8 + 1);
  food.classList.add("position" + pos);
  document.querySelector(".position" + pos).style.left =
    Math.floor(Math.random() * 100) + 1 + "vw";
}

function incrementPoints() {
  console.log("Give point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#point_count").textContent = points;
}

function decrementLives() {
  console.log("lose a life");
  showDecrementedLives();
  lives--;

  // update the life image
  const active_heart = document.getElementById("active_heart");
  const broken_heart = document.getElementById("broken_heart");
  if (lives === 2) {
    broken_heart.src = "Images/Angry_face.png";
  } else if (lives === 1) {
    broken_heart.src = "Images/Sad_face.png";
  } else if (lives === 0) {
    broken_heart.src = "Images/Dead_face.png";
    gameOver();
  }
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

// Define the function to check if the caught food item is correct
function isCorrectFood(food) {
  return randomFoodList.includes(food);
}

// Define the function to update the character's expression
function updateCat1Expression() {
  if (correctCount === randomFoodList.length) {
    cat1.classList.add("happy");
  } else if (incorrectCount >= 2) {
    cat1.classList.add("mad");
  } else {
    cat1.classList.remove("happy", "mad");
  }
}
