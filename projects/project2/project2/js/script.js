"use strict";

/*****************

Caricature
William L'Eriger

A project which allows the player to reconstruct an experience of growing up using the internet
on a small scale

******************/

// the variables for the five different arrays contained within the JSON file
let art;
let animals;
let flowers;
let moods;
let countries;

// defining the variable for buttons
let $buttons;

// the array containing the names of the buttons clicked on
let tags = [];
// the variables to store and identify tags within the tags array
let tagNumber = 0;
let tagPosition= 0;


// constant variable to determine how many buttons to show per array in the input article
const INPUT_OPTIONS = 4;

//Initializing
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

  for (let i = 0; i < INPUT_OPTIONS; i++) {

    // making the button labels random, choosing from their specific arrays within the JSON files
    let artOptions = art[Math.floor(Math.random() * art.length)];
    let animalOptions = animals[Math.floor(Math.random() * animals.length)];
    let moodOptions = moods[Math.floor(Math.random() * moods.length)];
    let flowersOptions = flowers[Math.floor(Math.random() * flowers.length)];
    let countryOptions = countries[Math.floor(Math.random() * countries.length)];

    // Add button with specific labels, using three attributes called inside the create buttons function
    createButtons(artOptions, '<div class="artChoices"></div>', '.art',);
    createButtons(animalOptions, '<div class="animalChoices"></div>', '.animals');
    createButtons(moodOptions, '<div class="moodChoices"></div>', '.moods');
    createButtons(flowersOptions, '<div class="flowerChoices"></div>', '.flowers');
    createButtons(countryOptions, '<div class="countryChoices"></div>', '.countries');
}

  // using the class choiceName, run an on click anonymous function to make images appear
  $(".choiceName").on("click",function(){

    // push the tag selected inside a blank array
    tags.push($(this).text());
    // increase the tag number so that the next tag selected is in a new position
    console.log(tags[tagNumber]);
    tagNumber++;
    // run the caricature function
    caricature();
  })


}

// createArtButton
//
// create art array buttons for the input
function createButtons(label, div, place) {
  // create the button as a div
    $buttons = $(div);
  // make the text on the button the label
    $buttons.text(label);
  // create the actual button object using jquery UI
    $buttons.button();
  // append the buttons to a specific place, which are div classes in the index page
    $(place).append($buttons);
  // add a class to each button in order to be able to choose specific ones
    $buttons.addClass("choiceName");
}

// caricature()
//
// function to display the images within the specific article
function caricature() {
  // check that the number of images that can be calle doesn't go over a specific number
    if (tagPosition <= 5) {
      // append image using lorem flickr and template strings
      $('#images').append(`<img src=https://loremflickr.com/320/240/${tags[tagPosition]}>`);
      // add 1 to the image count
      tagPosition++;
  }
}

// random input
//
// obtain a random element from the arrays contained within the json files
function getRandomInputElement(array) {
  let randomInputElement = array[Math.floor(Math.random() * array.length)];
  return randomInputElement;
}
