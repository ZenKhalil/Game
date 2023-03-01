"use strict";

window.addEventListener("load", start);

let points = 0;
let lives = 0;

function startScreen() {
  document.querySelector("#start").classList.add("hidden");
}
function rules() {
  document.querySelector("#rules").classList.add("hidden");
}

function start() {
  console.log("JavaScript kører!");

  let points = 0;
  let lives = 0;

  startAnimationer();
  startPositioner();
  registrerKlik();

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
    document.querySelector("#food1_container").classList.add("position1");
    document.querySelector("#food2_container").classList.add("position2");
    document.querySelector("#food3_container").classList.add("position3");
    document.querySelector("#food4_container").classList.add("position4");
    document.querySelector("#food5_container").classList.add("position5");
    document.querySelector("#food6_container").classList.add("position6");
    document.querySelector("#food7_container").classList.add("position7");
    document.querySelector("#food8_container").classList.add("position8");
  }

  function registrerKlik() {
    document
      .querySelector("#food1_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food2_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food3_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food4_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food5_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food6_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food7_container")
      .addEventListener("click", clickFood);
    document
      .querySelector("#food8_container")
      .addEventListener("click", clickFood);
  }

  // Add a click event listener to the food object
  function clickFood() {
    console.log("Click food");
    console.log(this);
    let food = this;
    // Forhindr gentagne clicks
    food.removeEventListener("click", clickFood);

    // Stop coin container
    food.classList.add("paused");

    // sæt forsvind-animation på coin
    food.querySelector("img").classList.add("zoom_out");

    // når forsvind-animation er færdig: food1Gone
    food.addEventListener("animationend", foodGone);

    // Giv point
    incrementPoints();
  }
  function foodGone() {
    let food = this; //document.querySelector("#food1");
    console.log("food gone");

    // fjern event der bringer os herind
    food.removeEventListener("animationend", foodGone);
    // fjern forsvind-animation fra sprite
    food.querySelector("#img").classList.remove("zoom_out");
    // fjern pause fra container
    food.classList.remove("paused");

    foodRestart.call(this);
    // gør det muligt at klikke på coin igen
    food.addEventListener("click", clickFood);
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

  // Define the variables to keep track of the caught food items
  let correctCount = 0;
  let incorrectCount = 0;
  const caughtFood = [];

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

  // Attach the click event listener to the food items
  const foodItems = document.querySelectorAll(".food-item");
  foodItems.forEach((foodItem) => {
    foodItem.addEventListener("click", function () {
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
