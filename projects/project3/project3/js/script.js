"use strict";

/*****************

Project 3 [Name Pending]
William L'Eriger

Javascript code for Project 3
A series of minigame pop-ups depicting daydreams
In a broader theme of Escapism

******************/

// prepping the project
$(document).ready(jquerySetup);

// defining the options variable, which will randomize the pitch and rate of responsiveVoice
let options = {
  pitch: Math.random(),
  rate: Math.random()
};

// variables for the pulsing background imagery
let backgroundImageAngle = 0;
let backgroundImageSize = 800;

// // variables for moving dots in the background
// let dotX;
// let dotY;
// let dotVX;
// let dotVY;

// preloading the audio
let answerSFX = new Audio("assets/sounds/sublayer.mp3");
let lockSFX = new Audio("assets/sounds/lockOpened.mp3");
let riddlesMusic = new Audio("assets/sounds/riddlesMusic.mp3");
let clickSFX = new Audio("assets/sounds/effects.wav");

// assigning variables to text files for Rita functionality
let hamletText;
let jekyllText;
let fellowshipText;
let monteCristoText;
let oldTestamentText;
let petitPrinceText;

// markov generator variable
let markov;

// riddle stuff
let previousRiddle = '';
let riddlesAnswered = 1;

// // variables for randomizing location of dialog boxes
// let horizontalOffset = Math.floor(Math.random() * 201) - 100;
// let verticalOffset = Math.floor(Math.random() * 201) - 100;

// setup
//
// initializing the project
function jquerySetup() {

  $.when(
   // Load Hamlet
   $.ajax({
     url: 'data/hamlet.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       hamletText = data;
     }
   }),
   // Load jekyll and Hyde
   $.ajax({
     url: 'data/jekyllHyde.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       jekyllText = data;
     }
   }),
   //load lord of the rings
   $.ajax({
     url: 'data/lotrFellowship.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       fellowshipText = data;
     }
   }),
   //load Count of Monte Cristo
   $.ajax({
     url: 'data/monteCristo.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       monteCristoText = data;
     }
   }),
   // load the old testament
   $.ajax({
     url: 'data/oldTestament.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       oldTestamentText = data;
     }
   }),
   // load the petit prince
   $.ajax({
     url: 'data/petitPrince.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       petitPrinceText = data;
     }
   })
  ).then(gotData); // When finished we call gotData() to carry on with the show

  $(this).one('click', firstTextGame);

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // dotX = width/2;
  // dotY = height/2;
  //
  // dotVX = 10;
  // dotVY = 10;
}

function draw() {

  background("#800000");

  var imageGrowth = sin(backgroundImageAngle) * (backgroundImageSize/20);

  //ellipse parameters
  noStroke();
  ellipseMode(CENTER);

  //7th layer
  fill("#660000");
  ellipse(width/2 - 200, height/2 - 50, backgroundImageSize/1.8 + imageGrowth);
  ellipse(width/2 + 300, height/2 + 200, backgroundImageSize/1.8 + imageGrowth);

  //6th Layer
  stroke(255);
  strokeWeight(4);
  line(150, 0, width, height);
  line(0, height/2 + 300, width, 200);

  // 5th layer
  noStroke();
  fill("#4d0000");
  ellipse(width/2 - 300, height/2 - 300, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 + 500, height/2 - 200, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 + 500, height/2 + 250, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 - 500, height/2 + 100, backgroundImageSize/1.5 + imageGrowth);

  //4th layer
  stroke(200);
  strokeWeight(6);
  line(0, 200, width, height/2);
  line(width/2 + 100, 0, width/2 + 400, height);
  line(200, height, width/2 + 350, 0);

  //3rd Layer
  noStroke();
  fill("#330000");
  ellipse(200, 200, backgroundImageSize + imageGrowth);
  ellipse(200, height, backgroundImageSize + imageGrowth);
  ellipse(width/2 + 100, 0, backgroundImageSize + imageGrowth);
  ellipse(width, height/2, backgroundImageSize + imageGrowth);
  ellipse(width/2 + 400, height + 100, backgroundImageSize + imageGrowth);

  //2nd layer
  stroke(100);
  strokeWeight(8);
  line(width/2, height, width - 300, 0);
  line(width, height, width/2 - 300, 0);
  line(0, height/2, width - 300, 100);
  // backgroundMovingObjects();

  //1st Layer
  noStroke();
  fill("#1a0000");
  ellipse(width - 80, height - 100, backgroundImageSize + imageGrowth);
  ellipse(width - 300, 0, backgroundImageSize + imageGrowth);
  ellipse(50, height/2, backgroundImageSize + imageGrowth);
  ellipse(width/2 - 280, -150, backgroundImageSize + imageGrowth);
  ellipse(width/2 - 100, height, backgroundImageSize + imageGrowth);


  backgroundImageAngle += 0.05;
}

// function backgroundMovingObjects() {
//   dotX += dotVX;
//   dotY += dotVY;
//
//   ellipse(dotX, dotY);
// }

// startChoice
//
// first window that appears after clicking the screen
// Player can choose an option which will start them off on a specific riddle
function startChoice() {

  // createCanvas(windowWidth, windowHeight +150);
  // background("#ff0000");

  //remove the promt text
  $('.startImage').remove();
  riddlesMusic.play();

  // append the div which contains the popup
  $('body').append("<div class = 'startingGame'><div>");
  console.log("First Minigame - Initiated");

  // define the text contained within the dialog window
  $(".startingGame").html("You are suffocating at the bottom of the abyss, removed from the outside world. You had always known life to be an unwinnable game; a journey without purpose. When thinking of the hand you've been dealt, a single emotion surges forward. You felt... <br> <br> [Contempt]   [Fear]  [Hopelessness]");

  if (annyang) {
        var commands = {
          'contempt': function() {
            setTimeout(firstRiddle, 5000);
            responsiveVoice.speak("Years of contempt leave you jaded.", 'Italian Male', options);
            console.log('contempt option chosen');
            answerSFX.play();
          },
          'fear': function() {
            setTimeout(secondRiddle, 5000);
            responsiveVoice.speak("Unadultered fear of the unknown cripple you.", 'UK English Male', options);
            console.log('fear option chosen');
            answerSFX.play();
          },
          'hopelessness': function() {
            setTimeout(thirdRiddle, 5000);
            responsiveVoice.speak("The broad expanse of the world weighs heavily upon your mind.", "UK English Female", options);
            console.log('hopeless option chosen');
            answerSFX.play();
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();

    }

  // variables for randomizing location of dialog boxes
  let horizontalOffset = Math.floor(Math.random() * 201) - 100;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // defining parameters of the dialog window
  $(".startingGame").dialog({
  //position the dialog window in the center of the canvas
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // defining size
  height: 450,
  width: 550,
  // what will happen when clicking the 'x' button
  close: function() {
    // trigger responsiveVoice
    responsiveVoice.speak("There is no escape.", 'UK English Male', options);
    // re-open the dialog window
    setTimeout(startChoice, 5000);
  },
  // removes ability to close window with the escape key
  closeOnEscape: false,
  // title of the window
  title: "Submerged"
});

}

function firstRiddle() {
  $(".startingGame").remove();
  $('.riddle2').remove();
  $('.riddle3').remove();

  console.log("First Riddle - Initiated");
  $('body').append("<div class = 'riddle1'><div>");

  $(".riddle1").html("A prisoner is told 'If you tell a lie we will hang you; if you tell the truth we will shoot you' What can he say to save himself?");

  //annyang functionality
  if (annyang) {
        var commands = {
          'you will hang me': function() {

            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'second' && riddlesAnswered < 3) {
              setTimeout(thirdRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' third' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }
            responsiveVoice.speak("Proceeding", 'Italian Male', options);
            console.log('first riddle solved');
            riddlesAnswered++;
            previousRiddle = 'first';
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;


  $(".riddle1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("...And yet, it persists.", 'UK English Male', options);
    $(".riddle1").remove();
    setTimeout(firstRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The First Riddle"
});
}

// secondRiddle
//
// function for the second riddle, containing the dialog popup and everything associated with it
function secondRiddle() {
  $(".startingGame").remove();
  $(".riddle1").remove();
  $('.riddle2').remove();


  $('body').append("<div class = 'riddle2'><div>");
  console.log("Second Riddle - Initiated");

  $(".riddle2").html("A murderer is condemned to death. He has to choose between three rooms. The first is full of raging fires, the second is full of assassins with loaded guns, and the third is full of lions that haven't eaten in 3 years. Which room is safest for him?")

  if (annyang) {
        var commands = {
          'lions': function() {

            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(firstRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'first' && riddlesAnswered < 3) {
              setTimeout(thirdRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' third' && riddlesAnswered < 3) {
              setTimeout(firstRiddle, 5000);
              answerSFX.play();
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }

            responsiveVoice.speak("Correct. Lions that have not eaten in three years are dead.", 'Spanish Female');
            console.log('annyang working');
            riddlesAnswered++;
            previousRiddle = 'second';
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

    // variables for randomizing location of dialog boxes
    let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
    let verticalOffset = Math.floor(Math.random() * 401) - 200;

  $(".riddle2").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Escape slips through your fingers...", 'UK English Male', options);
    $(".riddle2").remove();
    setTimeout(secondRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The Second Riddle"
});

}

function thirdRiddle() {
  $(".startingGame").remove();
  $(".riddle1").remove();
  $(".riddle2").remove();

  $('body').append("<div class = 'riddle3'><div>");
  console.log("Third Riddle - Initiated");

  $(".riddle3").html("They are Dark, and always on the run. Without the sun, there would be none.");

  if (annyang) {
        var commands = {
          'shadows': function() {
            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'second' && riddlesAnswered < 3) {
              setTimeout(firstRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' first' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }

            responsiveVoice.speak("They follow you. Everywhere.", 'Spanish Female');
            console.log('annyang working');
            riddlesAnswered++;
            previousRiddle = 'third';
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

    // variables for randomizing location of dialog boxes
    let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
    let verticalOffset = Math.floor(Math.random() * 401) - 200;

  $(".riddle3").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("The light recedes, the tunnel neverending.", 'UK English Male', options);
    $(".riddle3").remove();
    setTimeout(thirdRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The Third Riddle"
});
}

// gotData (data)
//
// Called when .ajax has loaded our two books.
function gotData () {
  // Join the two texts together into a single string
  let allText = hamletText + ' ' + oldTestamentText;
  // Create a Markov chain generator
  markov = new RiMarkov(4);
  // Load the string of both books into the Markov generator
  markov.loadText(allText);
  // Generate a paragraph of text
  generateParagraph();
  console.log('generated');
}

// generateParagraph()
//
// Clears the current texts and generates a new one in its place
function generateParagraph() {
  // Clear the current text
  $('#content').text('');
  // Generate ten sentences for our paragraph
  // (Output is an array)
  let sentenceArray = markov.generateSentences(20);
  // Turn the array into a single string by joining with spaces
  let sentenceText = sentenceArray.join(' ');
  // Put the new text onto the page
  $('#content').append(sentenceText);
}

function firstTextGame() {

  gotData();

  console.log("game launched");
  $(".riddle1").remove();
  $(".riddle2").remove();
  $(".riddle3").remove();


  $('body').append("<div class = 'game1'><div>");
  $('.game1').append("<div id = 'content'><div>");
  $('.game1').html(gotData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  $(".game1").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Nothing noteworthy occurs.", 'UK English Male', options);
    $(".game1").remove();
    setTimeout(thirdRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer - Game 1"
  });
}
