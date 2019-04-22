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

// defining the options variable, which will randomize the pitch of responsiveVoice
let options = {
  pitch: Math.random()
};

// variables for the pulsing background imagery
let backgroundImageAngle = 0;
let backgroundImageSize = 800;

// preloading some sound effects
let answerSFX = new Audio("assets/sounds/sublayer.mp3");
let lockSFX = new Audio("assets/sounds/lockOpened.mp3");
let clickSFX = new Audio("assets/sounds/effects.wav");

// assigning variables to text files for Rita functionality, for all 6 books I am using
let hamletText;
let jekyllText;
let fellowshipText;
let monteCristoText;
let oldTestamentText;
let petitPrinceText;

// defining variables for music used with p5 preload
let riddleMusic;
let textMusic;
let questionsMusic;

// markov generator variable which will be used when generating pragraphs for Rita
let markov;

// variables to decide path and amount of riddles to be answered during the first part
let previousRiddle = '';
let riddlesAnswered = 1;

// variable to initiate background after prompted, 0 is the beginning, 1 is the bulk of the content, 2 is the end
let initiated = 0;

// counter for the existential questions, this will alter the next question received.
let questionChoice1;
let questionChoice2;
let questionChoice3;

// variable for the dots moving in the background, using object oriented programming
let movingDots = [];
let dotsCount = 50;

// variables to change music throughout the project
let musicPlaying;

// variables for color scheme change, these will be used in the same function as the music change, since they change at the same time
let redValue;
let greenValue;
let blueValue;

// setup
//
// initializing the project
function jquerySetup() {

    // remove the outro gif, it will be added back at the end
    $('.outroGif').remove();

    // determine how long the starting gif image will player until it gets removed, in this case, more or less 5 seconds, after than, add heart image
  setTimeout( function(){
    $('.introGif').remove();

    $('.startImage').add();
  }  , 5500 );

  // use when and ajax to load the different text files which will be used for Rita functionality in part 2 of the project, for the first two books
  $.when(
   // Load Hamlet
   $.ajax({
     url: 'data/hamlet.txt',
     dataType: 'text',
     success: function (data) {
       // store text data in a variable
       hamletText = data;
     }
   }),
   // load the old testament
   $.ajax({
     url: 'data/oldTestament.txt',
     dataType: 'text',
     success: function (data) {
      // store text data in a variable
       oldTestamentText = data;
     }
   }),
 ).then(gotHamletTestamentData); // When finished, call gotHamletTestamentData(), which is where things actually happen

 // use when and ajax to load the different text files which will be used for Rita functionality in part 2 of the project, for the second two books
 $.when(
     // Load jekyll and hyde text
     $.ajax({
       url: 'data/jekyllHyde.txt',
       dataType: 'text',
       success: function (data) {
         // store text data in a variable
         jekyllText = data;
       }
     }),
     // Load lord of the rings text
     $.ajax({
       url: 'data/lotrFellowship.txt',
       dataType: 'text',
       success: function (data) {
         // store text data in a variable
         fellowshipText = data;
       }
     })
   ).then(gotJekyllFellowshipData); // When finished we call gotData() to carry on with the show

   // use when and ajax to load the different text files which will be used for Rita functionality in part 2 of the project, for the last two books
   $.when(
       // Load the Count of Monte Cristo
       $.ajax({
         url: 'data/monteCristo.txt',
         dataType: 'text',
         success: function (data) {
           // store text data in a variable
           monteCristoText = data;
         }
       }),
       // Load le Petit Prince
       $.ajax({
         url: 'data/petitPrince.txt',
         dataType: 'text',
         success: function (data) {
           // store text data in a variable
           petitPrinceText = data;
         }
       })
     ).then(gotMontePrinceData); // When finished, call the appropriate function for these two books

  // use annyang to launch the project in full
  // instead of using mouse commands
  if (annyang) {
        var commands = {
          'launch': function() {
            // start the project in half a second
            setTimeout(startChoice, 500);
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }
}


// preload
//
// preloading sounds using p5
function preload() {
  soundFormats('mp3', 'wav');

  riddleMusic = loadSound("assets/sounds/riddlesMusic.mp3");
  textMusic = loadSound("assets/sounds/textMusic.mp3");
  questionsMusic = loadSound("assets/sounds/questionsMusic.mp3");
}

// function setup()
//
// boot up the p5 setup
function setup() {

  // create the canvas to be the same size as the window
  createCanvas(windowWidth, windowHeight);

  // creating the dots object array
  for (var i = 0; i < dotsCount; i++) {

    // push the numbers wanted to the variables in the other script file
    movingDots.push(new Dots(random(50,950),0,random(-1,1),random(3,7),6,5,5));

  }
}

// function draw()
//
// boot up the p5 draw function, which will show our background imagery, shifting between three states
function draw() {

// if statement to check the status of the initiated variable and show appropriate background
if (initiated === 0) {

  // draw background using lines and colors and all that
  background(26,0,0);
  stroke(100);
  strokeWeight(16);
  line(100, 0, width, height - 100);
  strokeWeight(14);
  line(800, 0, width - 600, height);
  strokeWeight(26);
  line(200, height, width, 200);
  strokeWeight(6);
  line(0, height/2, width, height - 400);
  strokeWeight(36);
  line(width/2, 0, width/2 - 100, height);

  // insert some prompt text to instruct user of what to do, in this case, how to start the project
  rectMode(CENTER);
  strokeWeight(4);
  textSize(36);
  fill(255);
  text('Please accept Mic access', width/2 + 150, 200);
  text('and say [Launch] to begin', width/2 + 150, 250);

} else if (initiated === 1){

  // this variable is what makes the background pulsate, using a sine function
  var imageGrowth = sin(backgroundImageAngle) * (backgroundImageSize/20);

  // set the last layer's color values
  background(redValue*5, greenValue*5, blueValue*5);

  // ellipse parameters for background
  noStroke();
  ellipseMode(CENTER);

  // 7th layer details
  fill(redValue*4, greenValue*4, blueValue*4);
  ellipse(width/2 - 200, height/2 - 50, backgroundImageSize/1.8 + imageGrowth);
  ellipse(width/2 + 300, height/2 + 200, backgroundImageSize/1.8 + imageGrowth);

  // 6th Layer details
  stroke(255);
  strokeWeight(4);
  line(150, 0, width, height);
  line(0, height/2 + 300, width, 200);

  // 5th layer details
  noStroke();
  fill(redValue*3, greenValue*3, blueValue*3);
  ellipse(width/2 - 300, height/2 - 300, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 + 500, height/2 - 200, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 + 500, height/2 + 250, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 - 500, height/2 + 100, backgroundImageSize/1.5 + imageGrowth);

  // 4th layer details
  //
  // call the movingDots function through the array, using a for loop, this will make an amount of dots equal to the length appear
    for (var i = 0; i < movingDots.length; i++) {
      // call functions defined in the dots.js file, which dictates what the dots look like and how they behave
      movingDots[i].update();
      movingDots[i].display();
      movingDots[i].touchedBottom();
    }

  stroke(200);
  strokeWeight(6);
  line(0, 200, width, height/2);
  line(width/2 + 100, 0, width/2 + 400, height);
  line(200, height, width/2 + 350, 0);

  // 3rd Layer details
  noStroke();
  fill(redValue*2, greenValue*2, blueValue*2);
  ellipse(200, 200, backgroundImageSize + imageGrowth);
  ellipse(200, height, backgroundImageSize + imageGrowth);
  ellipse(width/2 + 100, 0, backgroundImageSize + imageGrowth);
  ellipse(width, height/2, backgroundImageSize + imageGrowth);
  ellipse(width/2 + 400, height + 100, backgroundImageSize + imageGrowth);

  //2nd layer details
  stroke(100);
  strokeWeight(8);
  line(width/2, height, width - 300, 0);
  line(width, height, width/2 - 300, 0);
  line(0, height/2, width - 300, 100);

  // 1st Layer details
  noStroke();
  fill(redValue, greenValue, blueValue);
  ellipse(width - 80, height - 100, backgroundImageSize + imageGrowth);
  ellipse(width - 300, 0, backgroundImageSize + imageGrowth);
  ellipse(50, height/2, backgroundImageSize + imageGrowth);
  ellipse(width/2 - 280, -150, backgroundImageSize + imageGrowth);
  ellipse(width/2 - 100, height, backgroundImageSize + imageGrowth);

  // the angle of the sine function used to make the background pulsate
  backgroundImageAngle += 0.05;

} else if (initiated === 2){
    // at the end of the project, just have a white background
    background(255);
  }
}

// function currentMusic();
//
// function called at the beginning of each part of the project to change the music
// I also put in the color scheme variables in here for simplicity
function currentMusic() {

  // if statement to check which part of the project we are at
  if (musicPlaying === 0) {

    // music parameters
    riddleMusic.setVolume(0.1);
    riddleMusic.play();
    riddleMusic.loop();

    //color parameters
    redValue = 26;
    greenValue = 0;
    blueValue = 0;

  } else if (musicPlaying === 1) {

    // music parameters, stop previous track
    riddleMusic.stop();
    textMusic.setVolume(0.1);
    textMusic.play();
    textMusic.loop();
    //color parameters
    redValue = 0;
    greenValue= 26;
    blueValue = 0;

  } else if (musicPlaying === 2) {

    // music parameters, stop previous track
    textMusic.stop();
    questionsMusic.setVolume(0.1);
    questionsMusic.play();
    questionsMusic.loop();
    //color parameters
    redValue = 0;
    greenValue = 0;
    blueValue = 26;
  }
}

/////////////////////////////////////////////////////////////////////////////////////// Part 1 - Riddles //////////////////////////////////////////////////////////

// startChoice
//
// first window that appears after clicking the screen
// Player can choose an option which will start them off on a specific riddle
function startChoice() {

  //remove the prompt text and image
  $('.startImage').remove();

  // set state of the game with this variable, 1 means the actual content of the project
  initiated = 1;

  // making the variable to chose the soundtrack 0, which is the ost for the riddles
  musicPlaying = 0;

  // call the function which puts in the colors and the music
  currentMusic();

  // append the div which contains the popup
  $('body').append("<div class = 'startingGame'><div>");
  console.log("First Minigame - Initiated");

  // define the text contained within the dialog window, using .html in order to use <br>, among other things
  $(".startingGame").html("You are suffocating at the bottom of the abyss, removed from the outside world. You had always known life to be an unwinnable game; a journey without purpose. When thinking of the hand you've been dealt, a single emotion surges forward. You felt... <br> <br> [Contempt]   [Fear]  [Hopelessness]");

  // use annyang to answer the riddles, if its one of the answers in quotes, do something
  if (annyang) {
        var commands = {
          'contempt': function() {
            // open the first riddle
            setTimeout(firstRiddle, 5000);
            // initiate responsiveVoice
            responsiveVoice.speak("Years of contempt leave you jaded.", 'UK English Male', options);
            console.log('contempt option chosen');
            // play the sound effect for answers
            answerSFX.play();
          },
          'fear': function() {
            // open the second riddle
            setTimeout(secondRiddle, 5000);
            // play responsiveVoice
            responsiveVoice.speak("Unadultered fear of the unknown cripple you.", 'UK English Male', options);
            console.log('fear option chosen');
            // play sfx
            answerSFX.play();
          },
          'hopelessness': function() {
            // open third riddle
            setTimeout(thirdRiddle, 5000);
            // play responsiveVoice
            responsiveVoice.speak("The broad expanse of the world weighs heavily upon your mind.", "UK English Female", options);
            console.log('hopeless option chosen');
            //play sfx
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
  //position the dialog window in the center of the canvas + a random offset
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
  title: "The Abyss - Submerged"
});
}

// function firstRiddle
//
// function for the first riddle popup
function firstRiddle() {

  // remove other dialog windows that would interfere
  $(".startingGame").remove();
  $('.riddle2').remove();
  $('.riddle3').remove();

  console.log("First Riddle - Initiated");
  // append the dialog class to the body in html
  $('body').append("<div class = 'riddle1'><div>");

  // define the text appearing in the dialog
  $(".riddle1").html("You struggle through the murky waters of your own mind. You quiz yourself to try and get your thoughts back in order: <br> <br> A prisoner is told 'If you tell a lie we will hang you; if you tell the truth we will shoot you' What can he say to save himself?");

  //annyang functionality
  if (annyang) {
        var commands = {
          'you will hang me': function() {

            // check the amount of riddles answered and which one was answered last, do something depending on results
            // open appropriate riddle in 5 seconds after answering
            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'second' && riddlesAnswered < 3) {
              setTimeout(thirdRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' third' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();

              // if all riddles have been answered, move on to part 2
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }
            // responsiveVoice says something
            responsiveVoice.speak("Proceeding", 'Italian Male', options);
            console.log('first riddle solved');

            // add one to the riddles answered
            riddlesAnswered++;
            // set the last answered riddle to this one
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

  // dialog window with jqueryUI
  $(".riddle1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  //size details
  height: 380,
  width: 550,
  // when you click the x button, reopens the same window with flavor responsiveVoice text
  close: function() {
    responsiveVoice.speak("...And yet, it persists.", 'UK English Male', options);
    $(".riddle1").remove();
    setTimeout(firstRiddle, 5000);
  },
  // can't press escape to close
  closeOnEscape: false,
  title: "The First Layer - Rememberance (1)"
});
}

// secondRiddle
//
// function for the second riddle, containing the dialog popup and everything associated with it
function secondRiddle() {

  // remove other dialogs that would interfere
  $(".startingGame").remove();
  $(".riddle1").remove();
  $('.riddle2').remove();
  $('.riddle3').remove();

  // append it to the body
  $('body').append("<div class = 'riddle2'><div>");
  console.log("Second Riddle - Initiated");

  // defines what is written in the dialog box
  $(".riddle2").html("You struggle through the murky waters of your own mind. You quiz yourself to try and get your thoughts back in order: <br> <br> A murderer is condemned to death. He has to choose between three rooms. The first is full of raging fires, the second is full of assassins with loaded guns, and the third is full of lions that haven't eaten in 3 years. Which room is safest for him?")

  // annyang functionality, the two different choices are the same answer choice, but voiced differently, so they have the same code within them
  if (annyang) {
        var commands = {
          'lions': function() {
            // once again, check last riddle answered and if all have beem answered
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

          //  responsiveVoice says something
            responsiveVoice.speak("Correct. Lions that have not eaten in three years are dead.", 'Spanish Female');
            console.log('annyang working');
            // add one to riddles
            riddlesAnswered++;
            // set previous riddle to this one
            previousRiddle = 'second';
          },
          // same functionality as above
          'the third': function() {

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

    // create the dialog box
  $(".riddle2").dialog({

    // position it
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it
  height: 380,
  width: 550,
  // what happens when x is clicked
  close: function() {
    responsiveVoice.speak("Escape slips through your fingers...", 'UK English Male', options);
    $(".riddle2").remove();
    setTimeout(secondRiddle, 5000);
  },
  // cant use escape key
  closeOnEscape: false,
  title: "The First Layer - Rememberance (2)"
});
}

// function thirdRiddle
//
// the third and last riddle used it part 1 of the project
function thirdRiddle() {

  // remove other dialogs
  $(".startingGame").remove();
  $(".riddle1").remove();
  $(".riddle2").remove();
  $('.riddle3').remove();

  // append dialog to body
  $('body').append("<div class = 'riddle3'><div>");
  console.log("Third Riddle - Initiated");

  // set dialog contents
  $(".riddle3").html("You struggle through the murky waters of your own mind. You quiz yourself to try and get your thoughts back in order: <br> <br> They are Dark, and always on the run. Without the sun, there would be none.");

  // annyang functionality
  if (annyang) {
        var commands = {
          'shadows': function() {
            // which riddles have been answered last, how many in total, play sfx when answered
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
            // add one to riddle count
            riddlesAnswered++;
            // set previous riddle to this one
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

    // create the dialog box using jqueryUI
  $(".riddle3").dialog({
    //position it
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it
  height: 380,
  width: 550,
  // when x is clicked
  close: function() {
    responsiveVoice.speak("The light recedes, the tunnel neverending.", 'UK English Male', options);
    $(".riddle3").remove();
    setTimeout(thirdRiddle, 5000);
  },
  // cant use escape key
  closeOnEscape: false,
  title: "The First Layer - Rememberance (3)"
});
}

/////////////////////////////////////////////////////////////////////////////// PART 2 - Text Identification //////////////////////////////////////////////////////

/////////// Disclaimer: Most of the code for Rita has been taken from Pippin Barr

// gotHamletTestamentData()
//
// Called when .ajax has loaded our first two books.
// there are two other functions like this one in order to create three separate combinations
function gotHamletTestamentData () {
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

// gotJekyllFellowshipData
//
// Called when .ajax has loaded the second two books.
function gotJekyllFellowshipData () {
  // Join the two texts together into a single string
  let allText = jekyllText + ' ' + fellowshipText;
  // Create a Markov chain generator
  markov = new RiMarkov(4);
  // Load the string of both books into the Markov generator
  markov.loadText(allText);
  // Generate a paragraph of text
  generateParagraph();
  console.log('generated');
}

// gotMontePrinceData
//
// Called when .ajax has loaded our last two books.
function gotMontePrinceData () {
  // Join the two texts together into a single string
  let allText = monteCristoText + ' ' + petitPrinceText;
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
// Clears the current texts if there are any and generates a new one
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

// firstTextGame
//
// the first dialog minigame for part 2 of the project, which involves identifying popular works of literature
function firstTextGame() {

  // remove all riddles
  console.log("game launched");
  $(".riddle1").remove();
  $(".riddle2").remove();
  $(".riddle3").remove();

  // change the music and colors to match part 2
  musicPlaying = 1;
  // call the function to do the above
  currentMusic();

  // append to the body, creating a div tag with a class of game1
  $('body').append("<div class = 'game1'><div>");
  // append generated text to the dialog box
  $('.game1').append("<div id = 'content'><div>");
  // define what will appear, in this case a mishmash of hamlet and the bible
  $('.game1').html(gotHamletTestamentData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // annyang functionality, same as usual, if answer matches the ones beneath this line, move on to the next dialog
  if (annyang) {
        var commands = {
          'hamlet': function() {
            // open next dialog in 3 seconds
            setTimeout(secondTextGame, 3000);
            // flavor text using responsiveVoice
            responsiveVoice.speak("A shakespearean classic, of course.", 'UK English Male');
            console.log('annyang working');
          },
          'shakespear': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("Good enough.", 'UK English Female');
            console.log('annyang working');
          },
          'old testament': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("A holy scripture. Of course you know about it.", 'UK English Female');
            console.log('annyang working');
          },
          'bible': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("A little vague, but it does the job.", 'Spanish Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

    // create the dialog box
  $(".game1").dialog({
    // position the box
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it
  height: 550,
  width: 750,
  // when x is pressed
  close: function() {
    responsiveVoice.speak("You know what they say about a good book.", 'UK English Male', options);
    $(".game1").remove();
    setTimeout(firstTextGame, 5000);
  },
  closeOnEscape: false,
  // buttons that are used for this box alone in order to instruct user if they are confused or need help
  buttons: [
    {
      // button text
      text: "Instructions",
      // button icon
      icon: "ui-icon-gear",
      click: function() {
        // responsiveVoice reads instructions
        responsiveVoice.speak('Identify one of the works of literature above to reconstruct your personality.', 'UK English Male');
      }
    },
    {
      text: "Resources Available",
      icon: "ui-icon-heart",
      click: function() {
        // responsiveVoice reads advice
        responsiveVoice.speak('When in doubt, a vast electronic sea brimming with information can help.', 'UK English Female');
      }
    }
  ],
  title: "The Second Layer - Restoration (1)"
  });
}

//secondTextGame()
//
// the second minigame involving Rita
function secondTextGame() {

// remove other dialogs
  $('.game1').remove();

// append to the body with a specific class
  $('body').append("<div class = 'game2'><div>");
  // append contents to the the div created above
  $('.game2').append("<div id = 'content'><div>");
  // set content to be jekyll and hyde and lord of the rings
  $('.game2').html(gotJekyllFellowshipData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // annyang functionality
  if (annyang) {
        var commands = {
          'strange case of doctor jekyll and mister hyde': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("Examplary work. Everything seems clearer now.", 'UK English Male');
            console.log('annyang working');

          },
          'jekyll and hyde': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("Correct. Another lock bursts open.", 'UK English Female');
            console.log('annyang working');
          },
          'lord of the rings': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("You always wished you could put it on as well.", 'UK English Female');
            console.log('annyang working');
          },
          'fellowship of the ring': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("Precisely. The misty veil parts once more.", 'Spanish Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

// create the dialog box
  $(".game2").dialog({
    // position it on the page
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it
  height: 550,
  width: 750,
  // when x is clicked
  close: function() {
    responsiveVoice.speak("I you cannot answer, ask your other self.", 'UK English Male', options);
    $(".game2").remove();
    setTimeout(secondTextGame, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer - Restoration (2)"
  });

}

// thirdTextGame()
//
// the second minigame involving Rita, this time with the Count of Monte Cristo and Le Petit Prince
function thirdTextGame() {

  // remove other dialogs
  $('.game2').remove();
  // append new div to body
  $('body').append("<div class = 'game3'><div>");
  // apend content to new div
  $('.game3').append("<div id = 'content'><div>");
  // set content to be the count of monte cristo and le petit prince, specifics done in the named function
  $('.game3').html(gotMontePrinceData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // annyang functionality with all possible answers and different flavor texts for all of them
  if (annyang) {
        var commands = {
          'count of monte cristo': function() {
            // open next part after 3 seconds
            setTimeout(firstQuestion, 3000);
            // responsiveVoice for text
            responsiveVoice.speak("Wait and hope; Words you've always gone by.", 'UK English Male');
            console.log('annyang working');

          },
          'monte cristo': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("An unimaginable treasure. You wish you had such fortune.", 'UK English Female');
            console.log('annyang working');
          },
          'le petit prince': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("Une aventure qui a du coeur. Tu en es jaloux.", 'French Female');
            console.log('annyang working');
          },
          'little prince': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("An emotional tale that changed your youth.", 'UK English Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }
    // create the dialog
  $(".game3").dialog({
    // position it
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it and define what happens when x is clicked
  height: 550,
  width: 750,
  close: function() {
    responsiveVoice.speak("Wait and hope, and answer.", 'UK English Male', options);
    $(".game3").remove();
    // opens the same dialog after 5 seconds
    setTimeout(thirdTextGame, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer - Restoration (3)"
  });

}

//////////////////////////////////////////////////////////////////////////// Part 3 - Existential Questions ////////////////////////////////////////////////////////

// function firstQuestion
//
// the first dialog window which contains som existential questions to answer
function firstQuestion() {

  // remove the remnants of part 2
  $('.game3').remove();

  // change music and color scheme to match part 3
  musicPlaying = 2;
  // call the function to do the above
  currentMusic();

  // append the new div to the body
  $('body').append("<div class = 'question1'><div>");

  // contents of the dialog box, the question and choices available
  $('.question1').html("You remember the self, for good or for worse. But, where were you in regards to the world around you? Answer a few questions to recontextualize yourself. <br> <br> Is there such a thing as destiny? <br> <br> [Yes]   [No]");

  // annyang functionality
  if (annyang) {
        var commands = {
          'yes': function() {
            // open the next question after 3 seconds
            setTimeout(secondQuestion, 3000);
            // responsiveVoice flavor
            responsiveVoice.speak("You were content to lie to and float down the river of time.", 'UK English Male');
            console.log('annyang working');
            // set the choice to 0, which will make it so that the next question will differ than if you chose 'no'
            questionChoice1 = 0;
          },
          'no': function() {
            // open after 3 seconds
            setTimeout(secondQuestion, 3000);
            responsiveVoice.speak("You operate the forge, hammering away without stop.", 'UK English Female');
            console.log('annyang working');
            // variable to make the next questions different
            questionChoice1 = 1;
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

    // variables for randomizing location of dialog boxes
    let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
    let verticalOffset = Math.floor(Math.random() * 401) - 200;

    // create the dialog box
  $(".question1").dialog({
    // position it on the page
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it
  height: 380,
  width: 550,
  // when x clicked
  close: function() {
    responsiveVoice.speak("Desiny dictates. Answer.", 'UK English Male', options);
    $(".question1").remove();
    setTimeout(secondQuestion, 5000);
  },
  // can't clsoe on escape
  closeOnEscape: false,
  title: "The Third Layer - Resurgeance (1)"
  });
}

// function secondQuestion
//
// the second existential question function, which actually contains two different questions depending on option chosen at the previous one
function secondQuestion() {

  // remove the previous questions
  $('.question1').remove();
  $('.question2').remove();

  // append this dialog div tag to the body
  $('body').append("<div class = 'question2'><div>");

  // variables for randomizing location of dialog boxes
  let horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.flooir(Math.random() * 401) - 200;

  // check which choice was taken on the previous question, chose this question accordingly
  if(questionChoice1 === 1) {
    // set the contents of the dialog, could not use yes and no again due to conflicting with annyang
    $('.question2').html("Very good... and if you could watch everything that happened in your life until now, would you enjoy it? <br> <br> [Of Course]   [Not Really]");

    // annyang functionality, including what to open and after what lenght of time, set the second question choice according to answer given, open the third question
    if (annyang) {
          var commands = {
            'of course': function() {
              setTimeout(thirdQuestion, 3000);
              responsiveVoice.speak("Looking back, it wasn't so bad, was it?", 'UK English Male');
              console.log('annyang working');
              questionChoice2 = 0;

            },
            'not really': function() {
              setTimeout(thirdQuestion, 3000);
              responsiveVoice.speak("You have a lot of dreams you gave up on, and even more regrets.", 'UK English Female');
              console.log('annyang working');
              questionChoice2 = 1;
            }
          }
          // annyang functionality
          annyang.addCommands(commands);
          annyang.start();
      }

  } else if (questionChoice1 === 0){
    // set the contents of the dialog, could not use yes and no again due to conflicting with annyang
    $('.question2').html("Very good... and do you believe in a power greater than humanity? <br> <br> [It is possible]   [Not likely]");

    // annyang functionality, including to open the fourth question for a different path than above, set variable depending on answer chosen
    if (annyang) {
          var commands = {
            'it is possible': function() {
              setTimeout(fourthQuestion, 3000);
              responsiveVoice.speak("You've embraced powerlessness long ago.", 'UK English Male');
              console.log('annyang working');
              questionChoice3 = 0;

            },
            'not likely': function() {
              setTimeout(fourthQuestion, 3000);
              responsiveVoice.speak("Despite your inaction, you believe in the strength of humanity.", 'UK English Female');
              console.log('annyang working');
              questionChoice3 = 1;
            }
          }
          // annyang functionality
          annyang.addCommands(commands);
          annyang.start();
      }
  }

  // create the dialog object
  $(".question2").dialog({
    // position it
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // size it and determine what to do when x is clicked
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Belief goes a long way. Too bad you do not.", 'UK English Male', options);
    $(".question2").remove();
    setTimeout(secondQuestion, 5000);
  },
  closeOnEscape: false,
  title: "The Third Layer - Resurgeance (2)"
  });

}

// function thirdQuestion()
//
// the third question in part 3, can only get here through cetain answer paths
function thirdQuestion() {
  // remove previous dialogs
  $('.question2').remove();

  // append to body
  $('body').append("<div class = 'question3'><div>");

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // if statement to determine which answer was chosen previously on the path, if 1 chosen, then the first one, if 0, the next
  if(questionChoice2 === 1) {
    // determine contents of the dialog box
    $('.question3').html("And finally... in that case, if you could go back to the very beginning and start over, would you do it? <br> <br> [I would]   [I would not]");

    if (annyang) {
          var commands = {
            'i would': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("Maybe then time you would make it right. You wouldn't look away.", 'UK English Male');
              console.log('annyang working');
            },
            'i would not': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("You have accepted what you've become. Forward is the only way.", 'UK English Female');
              console.log('annyang working');
            }
          }
          // annyang functionality
          annyang.addCommands(commands);
          annyang.start();
      }

  } else {
    // determine contents of the other question available
    $('.question3').html("And finally... In that case, are you satisfied with the road life has led you to take? <br> <br> [I Am]   [Not Satisified]");

    // annyang functionality, same as other part 3 functions, except opens the final dialog box
    if (annyang) {
          var commands = {
            'i am': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("You acknowledge yourself. Forward us the only way.", 'UK English Male');
              console.log('annyang working');
            },
            'not satisfied': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("Not exactly, anyway. Satisfaction makes a hard bargain.", 'UK English Female');
              console.log('annyang working');
            }
          }
          // annyang functionality
          annyang.addCommands(commands);
          annyang.start();
      }
  }

  // create the dialog object, its position, size and on close function
  $(".question3").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("You cannot escape from your own escapade.", 'UK English Male', options);
    $(".question3").remove();
    setTimeout(thirdQuestion, 5000);
  },
  closeOnEscape: false,
  title: "The Third Layer - Resurgeance (3)"
  });
}

// function fourthQuestion
//
// the fourth function in part 3 containing existential questions
function fourthQuestion() {
  // remove other diaogs
  $('.question2').remove();

  // append this one to the body under a new div tag
  $('body').append("<div class = 'question4'><div>");

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // check which choice was chosen previously
  if(questionChoice3 === 1) {
    // set the question
    $('.question4').html("And finally... In that case, are you the one in control of your life? <br> <br> [Only I]   [I Have No Control]");

    // annyang functionality, same as above
    if (annyang) {
          var commands = {
            'only i': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("You finally realize that you hold the reins.", 'UK English Male');
              console.log('annyang working');
            },
            'i have no control': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("Mist surrounds you, a single thread around your neck dragging you.", 'UK English Female');
              console.log('annyang working');
            }
          }
          // annyang functionality
          annyang.addCommands(commands);
          annyang.start();
      }

  } else {
    // set question
    $('.question4').html("And finally... Does that entity define you? <br> <br> [It defines me]    [It does not]");

    // annyang functionality, same as above
    if (annyang) {
          var commands = {
            'it defines me': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("You left things outside of your control to another.", 'UK English Male');
              console.log('annyang working');
            },
            'it does not': function() {
              setTimeout(awakenFromDream, 3000);
              responsiveVoice.speak("You acknowledge your weakness, but look past it.", 'UK English Female');
              console.log('annyang working');
            }
          }
          // annyang functionality
          annyang.addCommands(commands);
          annyang.start();
      }
  }

// create the dialog box with all its parameters
  $(".question4").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Nothing noteworthy occurs.", 'UK English Male', options);
    $(".question4").remove();
    setTimeout(fourthQuestion, 5000);
  },
  closeOnEscape: false,
  title: "The Third Layer - Resurgeance (3)"
  });
}

///////////////////////////////////////////////////////////////////////////////Ending Portion///////////////////////////////////////////////////////////////////////

// function awakenFromDream()
//
// the function containing the final dialog box, prompts the user to awaken from the nightmare
function awakenFromDream() {

  // remove remnants of part 3 dialogs
  $('.question3').remove();
  $('.question4').remove();

  // append the new div tag to the body
  $('body').append("<div class = 'awakenPrompt'><div>");

  // set the contents of the dialog box
  $('.awakenPrompt').html("You have completely restored yourself and remember your place in the world. Whether or not you can put your doubts behind you can wait another day. For now, you can [Awaken] from your bitter dreams and banish the abyss.");

  // variables for randomizing location of dialog boxes
  let horizontalOffset = Math.floor(Math.random() * 201) - 100;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // annyang functionality, simple this time
  if (annyang) {
        var commands = {
          'awaken': function() {
            // set the project to its final state after 3 seconds
            setTimeout(endingFunction, 3000);
            responsiveVoice.speak("You acknowledge yourself. Forward us the only way.", 'UK English Male');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

// create the dialog box with all its parameters
  $(".awakenPrompt").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("You must wake up. The nightmare is over.", 'UK English Male', options);
    $(".question4").remove();
    setTimeout(awakenFromDream, 5000);
  },
  closeOnEscape: false,
  title: "The Third Layer - Resurgeance (3)"
  });
}

// endingFunction()
//
// for a lack of a better name, remove all other images and functions, set initiated function to 2 and show ending Gif Image
function endingFunction() {
  // remove the dialogs and images remaining
  $('.startImage').remove();
  $('.awakenPrompt').remove();
  // set initiated to 2
  initiated = 2;
  console.log('gif');
  // append the outro gif to the body
  $('body').append('<img src="assets/images/outro.gif" class="outroGif" alt="">');
  // last responsiveVoice flavor
  responsiveVoice.speak("But in the end... nothing changed.", 'UK English Female', options);
}
