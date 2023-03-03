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
  // nulstil point og liv
  points = 0;
  lives = 3;

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

  /*
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
  }*/

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
  }
}

// --------------------------

class Spawner {
  constructor(wrapperID, foodHTMLElements) {
    this.wrapper = document.getElementById(wrapperID);
    this.foodHTMLElements = foodHTMLElements;
  }

  spawn() {
    const wrapperHeight = this.wrapper.offsetHeight;
    for (let i = 0; i < this.foodHTMLElements.length; i++) {}
  }
}

const spawner = new Spawner("food-selector");

// De food items som er en del af spillet.
const foodItems = [
  { src: "Food/Food1.png" },
  { src: "Food/Food2.png" },
  { src: "Food/Food3.png" },
  { src: "Food/Food4.png" },
  { src: "Food/Food5.png" },
  { src: "Food/Food6.png" },
  { src: "Food/Food7.png" },
  { src: "Food/Food8.png" },
];

// De food items som vores funktion 'generateValidationList'
// har valgt som valid items.
const selectedItems = [];

// Item HTML elements
const foodItemsHTMLElements = [];

// en rekursiv funktion som bliver ved med at prøve at finde et
// random element som ikke allerede eksistere i det array (selectedItem) som blier sendt.
function findRandomItem(selectedItems) {
  const randomIndex = Math.floor(Math.random() * foodItems.length);
  const randomItem = foodItems[randomIndex];
  if (selectedItems.includes(randomItem)) return findRandomItem(selectedItems);
  else return randomItem;
}

// Byg et HTML img element ud fra source sendt som argument
function generateListItemElement(src) {
  const e = document.createElement("img");
  e.src = src;
  return e;
}

function generateValidationList() {
  // Get image div container.
  const wrapper = document.getElementById("food-list");

  // Define the random items for the current round.
  const selectedItems = [];
  const numberofRandomItems = 4;
  for (let i = 0; i < numberofRandomItems; i++) {
    // Find en tilfældigt js object aka food item
    const randomItem = findRandomItem(selectedItems);
    // Byg et HTML img element ud fra source fundet i det random item.
    const itemElement = generateListItemElement(randomItem.src);
    // Tilføj elementet som underelement til list div.
    wrapper.appendChild(itemElement);
    // Gem random item til senere.
    selectedItems.push(randomItem);
  }
}

function generateGameObjectList() {
  const wrapper = document.getElementById("food-selector");
  for (let i = 0; i < foodItems.length; i++) {
    const itemElement = generateListItemElement(foodItems[i].src);
    itemElement.className = "absolute";

    const right = Math.random() * 500 - itemElement.offsetWidth;
    itemElement.setAttribute("a-right", right);
    itemElement.setAttribute("a-top", 0);
    itemElement.style.top = "0px";
    itemElement.style.right = right + "px";
    wrapper.appendChild(itemElement);
    foodItemsHTMLElements.push(itemElement);
  }
}

function shuffleChildrenElements() {
  for (let i = 0; i < foodItemsHTMLElements.length; i++) {
    const otherIndex = Math.floor(Math.random() * foodItemsHTMLElements.length);
    const currentItem = foodItemsHTMLElements[i];
    const otherItem = foodItemsHTMLElements[otherIndex];

    foodItemsHTMLElements[i] = otherItem;
    foodItemsHTMLElements[otherIndex] = currentItem;
  }

  const wrapper = document.getElementById("food-selector");
  wrapper.innerHTML = "";
  for (let i = 0; i < foodItemsHTMLElements.length; i++) {
    wrapper.appendChild(foodItemsHTMLElements[i]);
  }
}

generateValidationList();
generateGameObjectList();

setInterval(() => {
  const wrapper = document.getElementById("food-selector");
  for (let i = 0; i < foodItemsHTMLElements.length; i++) {
    const item = foodItemsHTMLElements[i];
    let top = parseFloat(foodItemsHTMLElements[i].getAttribute("a-top"));

    top = (top + 10) % wrapper.offsetHeight;

    item.setAttribute("a-top", top);
    item.style.top = top + "px";
  }
}, 100);
