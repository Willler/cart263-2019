"use strict";

/*****************

Project 3 [Name Pending]
William L'Eriger

Javascript code for Project 3
A series of minigame pop-ups depicting daydreams
In a broader theme of Escapism

******************/

// prepping the project
$(document).ready(setup);

// defining the options variable, which will randomize the pitch and rate of responsiveVoice
let options = {
  pitch: Math.random(),
  rate: Math.random()
};

// preloading the audio
let answerSFX = new Audio("assets/sounds/sublayer.mp3");
let lockSFX = new Audio("assets/sounds/lockOpened.mp3");
let riddlesMusic = new Audio("assets/sounds/riddlesMusic.mp3");
let clickSFX = new Audio("assets/sounds/effects.wav");

// riddle stuff
let previousRiddle = '';
let riddlesAnswered = 1;

// setup
//
// initializing the project
function setup() {

  $(this).one('click', startChoice);

}

// startChoice
//
// first window that appears after clicking the screen
// Player can choose an option which will start them off on a specific riddle
function startChoice() {

  //remove the promt text
  $('.startImage').remove();
  riddlesMusic.play();

  // append the div which contains the popup
  $('body').append("<div class = 'startingGame'><div>");
  console.log("First Minigame - Initiated");

  // define the text contained within the dialog window
  $(".startingGame").text("You close your eyes, removing yourself from reality. You can't help it. After all, it is just another s****y game. You look inside yourself, what do you see? [Choose Contempt, fear, or hopelessness]");

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

  // defining parameters of the dialog window
  $(".startingGame").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  // defining size
  height: 380,
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
  title: "Crossroads - Eye of the Mind"
});

}

function firstRiddle() {
  $(".startingGame").remove();
  $('.riddle2').remove();
  $('.riddle3').remove();

  console.log("First Riddle - Initiated");
  $('body').append("<div class = 'riddle1'><div>");

  $(".riddle1").text("A prisoner is told 'If you tell a lie we will hang you; if you tell the truth we will shoot you' What can he say to save himself?");

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

  $(".riddle1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
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

  $(".riddle2").text("A murderer is condemned to death. He has to choose between three rooms. The first is full of raging fires, the second is full of assassins with loaded guns, and the third is full of lions that haven't eaten in 3 years. Which room is safest for him?")

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

  $(".riddle2").dialog({

  position: {
    at: "center"
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

  $(".riddle3").text("They are Dark, and always on the run. Without the sun, there would be none.");

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

  $(".riddle3").dialog({

  position: {
    at: "center"
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

function firstTextGame() {

  console.log("game launched");
  $(".riddle1").remove();
  $(".riddle2").remove();
  $(".riddle3").remove();


  $('body').append("<div class = 'game1'><div>");
  $('.game1').text("This is the first game, and the end of this trial.");
  $(".game1").dialog({

  position: {
    at: "center"
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
