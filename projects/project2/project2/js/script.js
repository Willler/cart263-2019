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
let tagPosition = 0;


// constant variable to determine how many buttons to show per array in the input article
const INPUT_OPTIONS = 4;

// load the audio files for the sound effects and for the background music
let bgMusic = new Audio("assets/sounds/bg.wav");
let clickSFX = new Audio("assets/sounds/effects.wav");

//Initializing
$(document).ready(setup);

// setup
//
// initializing variables
function setup() {

  // $( "#speechInstruction" ).remove();
  // Start by displaying a text pop-up to introduce player to the game
  $("#startGameText").dialog({
    //position the dialog window in the center of the canvas
    position: {
      at: "center"
    },
    height: 380,
    width: 550
  });

  // play bg music and loop it
  bgMusic.play();
  bgMusic.loop = true;

  // loading in json files by specifying where they are in the files and which function to associate them to
  // array containing art, animals, moods, flowers and countries
  // once everything is load, start the game
  $.when($.getJSON('assets/data/data.json', dataLoaded)).then(startGame);
  // startGame();
}

// dataloaded(data)
//
// function to get random elements from the specific arrays within the json file
// the main purpose of this function is to verify that the json is being processed properly
function dataLoaded(data) {
  console.log(data);
  // get a random art from the array and check it in the console, identify that data.art is = to variable art
  let artElement = getRandomInputElement(data.art);
  art = data.art;
  console.log(artElement);

  // get a random mood, same as above
  let moodsElement = getRandomInputElement(data.moods);
  moods = data.moods;
  console.log(moodsElement);

  //get a random animal, '' '' ''
  let animalsElement = getRandomInputElement(data.animals);
  animals = data.animals;
  console.log(animalsElement);

  //get a random flower, ''''
  let flowersElement = getRandomInputElement(data.flowers);
  flowers = data.flowers;
  console.log(flowersElement);

  //get a random country, '' '' ''
  let countriesElement = getRandomInputElement(data.countries);
  countries = data.countries;
  console.log(countriesElement);

}

//startGame
//
// this function is called once the json file is fully loaded
function startGame() {

  // for loop linked to a constant variable to determine how many buttons to call for each array, in this case, 4
  for (let i = 0; i < INPUT_OPTIONS; i++) {

    // making the button labels random, choosing from their specific arrays within the JSON files
    let artOptions = art[Math.floor(Math.random() * art.length)];
    let animalOptions = animals[Math.floor(Math.random() * animals.length)];
    let moodOptions = moods[Math.floor(Math.random() * moods.length)];
    let flowersOptions = flowers[Math.floor(Math.random() * flowers.length)];
    let countryOptions = countries[Math.floor(Math.random() * countries.length)];

    // Add button with specific labels, using three attributes called inside the create buttons function
    createButtons(artOptions, '<div class="artChoices"></div>', '.art', );
    createButtons(animalOptions, '<div class="animalChoices"></div>', '.animals');
    createButtons(moodOptions, '<div class="moodChoices"></div>', '.moods');
    createButtons(flowersOptions, '<div class="flowerChoices"></div>', '.flowers');
    createButtons(countryOptions, '<div class="countryChoices"></div>', '.countries');
  }

  // using the class choiceName called in the createButton function, run an on click anonymous function to make images appear
  $(".choiceName").on("click", function() {

    // push the tag selected inside a blank array
    tags.push($(this).text());
    // increase the tag number so that the next tag selected is in a new position
    console.log(tags[tagNumber]);
    tagNumber++;
    // run the caricature function
    caricature();
    // play the sound effect
    clickSFX.play();

    // make a variable to store the text obtained by clicking something
    let say = $(this).text();

    // Set some random numbers for the voice's pitch and rate parameters to make it more creepy
    let options = {
      pitch: Math.random(),
      rate: Math.random()
    };

    // Use ResponsiveVoice to speak the tag selected
    responsiveVoice.speak(say, 'UK English Male', options);

    // if statement to check if player has selected 6 images, if yes, run
    if (tagNumber === 6) {
      // make a pop-up appear with this text, using jquery UI
      $("#speechInstruction").text("Please say: [I have grown up] to gather and configure accrued life data into personality structure. WARNING - Results obtained may differ from initial intentions.");
      $("#speechInstruction").dialog({
        //position the dialog window in the center of the canvas
        position: {
          at: "center"
        },
        // specify dimensions
        height: 300,
        width: 500
      });

      // call annyang for voice commands within the if statement above
      if (annyang) {
        var commands = {
          'i have grown up': function() {
            // call the function to show poem
            createPoem();
            console.log('ann working');
            // play sound effect
            clickSFX.play();
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
      }
    }
  })
}

// annyang speech operation
// not in any specific function to make speech usable from the beginning
if (annyang) {
  var commands = {
    // reload the page
    'this is not me': function() {
      location.reload();
      console.log('ann workinging out');
      clickSFX.play();
    }
  }
  annyang.addCommands(commands);
  annyang.start();
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

// createPoem
//
// create a poem using the tags created
function createPoem() {
  // create text strings for each line, using tags selected
  $('#poemLines1').text(`From the cradle ye were like a ${tags[0]},`);
  $('#poemLines2').text(`You were given freedom and chose ${tags[1]},`);
  $('#poemLines3').text(`Yet you struggled, like a ${tags[2]} out of the ocean,`);
  $('#poemLines4').text(`It was a battle of wills, yet you emerged victorious, brandishing your ${tags[3]},`);
  $('#poemLines5').text(`Oh, dear ${tags[4]}... you were never the same,`);
  $('#poemLines6').text(`For the internet robbed you of all your ${tags[5]}.`);
};

// random input
//
// obtain a random element from the arrays contained within the json files
// this isn't used for much in this program, but was kept here just in case
function getRandomInputElement(array) {
  let randomInputElement = array[Math.floor(Math.random() * array.length)];
  return randomInputElement;
}
