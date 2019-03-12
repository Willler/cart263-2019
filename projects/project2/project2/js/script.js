"use strict";

/*****************

Caricature
William L'Eriger

A project which allows the player to reconstruct an experience of growing up using the internet
on a small scale

******************/

// variable to store the elements chosen from the input
let elementsChosen = [];
let art;
let animals;
let flowers;
let moods;
let countries;

let $buttons;

let animalChosen;
let artChosen;
let flowersChosen;
let moodChosen;
let countryChosen;

const INPUT_OPTIONS = 4;

$(document).ready(setup);

// setup
//
// initializing variables
function setup() {

  // Start by displaying a text pop-up to introduce player to the game
  $( "#startGameText" ).dialog({
    //position the dialog window in the center of the canvas
      position: {at: "center" }
  });

  // loading in json files by specifying where they are in the files and which function to associate them to
  // array containing art 'isms', animals, moods, flowers and countries
  $.when($.getJSON('assets/data/data.json', dataLoaded)).then(startGame);
  // startGame();
}

// dataloaded(data)
//
// function to get random elements from the specific arrays within the json file
function dataLoaded(data) {
  console.log(data);
  let artElement = getRandomInputElement(data.art);
  art = data.art;
  console.log(artElement);

  let moodsElement = getRandomInputElement(data.moods);
  moods = data.moods;
  console.log(moodsElement);

  let animalsElement = getRandomInputElement(data.animals);
  animals = data.animals;
  console.log(animalsElement);

  let flowersElement = getRandomInputElement(data.flowers);
  flowers = data.flowers;
  console.log(flowersElement);

  let countriesElement = getRandomInputElement(data.countries);
  countries = data.countries;
  console.log(countriesElement);

}

function startGame() {

  elementsChosen = [];

  for (let i = 0; i < INPUT_OPTIONS; i++) {

    let artOptions = art[Math.floor(Math.random() * art.length)];
    let animalOptions = animals[Math.floor(Math.random() * animals.length)];
    let moodOptions = moods[Math.floor(Math.random() * moods.length)];
    let flowersOptions = flowers[Math.floor(Math.random() * flowers.length)];
    let countryOptions = countries[Math.floor(Math.random() * countries.length)];

    // Add button with specific labels label
    createButtons(artOptions, '<div class="artChoices"></div>', '.art',);
    createButtons(animalOptions, '<div class="animalChoices"></div>', '.animals');
    createButtons(moodOptions, '<div class="moodChoices"></div>', '.moods');
    createButtons(flowersOptions, '<div class="flowerChoices"></div>', '.flowers');
    createButtons(countryOptions, '<div class="countryChoices"></div>', '.countries');
}

$(".choiceName").on("click",function(){
  console.log($(this).text());
})

}

// createArtButton
//
// create art array buttons for the input
function createButtons(label, div, place) {
    $buttons = $(div);
    $buttons.text(label);
    $buttons.button();
    $(place).append($buttons);
    $buttons.addClass("choiceName");
}

// random input
//
// obtain a random element from the arrays contained within the json files
function getRandomInputElement(array) {
  let randomInputElement = array[Math.floor(Math.random() * array.length)];
  return randomInputElement;
}
