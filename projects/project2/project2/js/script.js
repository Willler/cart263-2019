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
  console.log(moodsElement);

  let animalsElement = getRandomInputElement(data.animals);
  console.log(animalsElement);

  let flowersElement = getRandomInputElement(data.flowers);
  console.log(flowersElement);

  let countriesElement = getRandomInputElement(data.countries);
  console.log(countriesElement);

}

function startGame() {

  elementsChosen = [];

  for (let i = 0; i < INPUT_OPTIONS; i++) {
  // Choose the answer text randomly from the art array
  let artChosen = art[Math.floor(Math.random() * art.length)];
  // Add a button with this label
  createButton(artChosen);
  console.log(artChosen);
  // Add this answer to the answers array
  elementsChosen.push(artChosen);
}

}

// createButton
//
// create buttons for the input
function createButton(label) {
  let $artButtons = $('<div class="a"></div>');
  $artButtons.text(label);
  $artButtons.button();
  // $artButtons.on('click', function() {
  //
  // });

  $('#art').append($artButtons);


}

// random input
//
// obtain a random element from the arrays contained within the json files
function getRandomInputElement(array) {
  let randomInputElement = array[Math.floor(Math.random() * array.length)];
  return randomInputElement;
}
