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
let clickSFX = new Audio("assets/sounds/effects.wav");

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
  //play sound effect
  clickSFX.play();

  //remove the promt text
  $('#startText').remove();

  // append the div which contains the popup
  $('body').append("<div class = 'startingGame'><div>");
  console.log("First Minigame - Initiated");

  // define the text contained within the dialog window
  $(".startingGame").text("You close your eyes, removing yourself from reality. You can't help it. After all, it is just another s****y game. You look inside yourself, what do you see?");

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
  title: "Crossroads - Eye of the Mind",
  // defining buttons
  buttons: [{

    text: "Contempt",
    icon: "ui-icon-gear",
    click: function() {
      responsiveVoice.speak("Years of contempt leave you jaded.", 'UK English Female', options);
      setTimeout(firstRiddle, 5000);
    }
  },{
    text: "Fear",
    icon: "ui-icon-heart",
    click: function() {
      responsiveVoice.speak("Unadultered fear of the unknown cripple you.", "UK English Female", options);
      setTimeout(minigame3, 5000);
    }
  }
]
});

}

function firstRiddle() {
  $(".startingGame").remove();
  $('riddle2').remove();
  clickSFX.play();
  console.log("First Riddle - Initiated");
  $('body').append("<div class = 'riddle1'><div>");

  $(".riddle1").text("A prisoner is told 'If you tell a lie we will hang you; if you tell the truth we will shoot you' What can he say to save himself?");

  //annyang functionality
  if (annyang) {
        var commands = {
          'you will hang me': function() {
            // call the function to show poem
            setTimeout(minigame3, 5000);
            responsiveVoice.speak("Proceeding", 'Italian Male', options);
            console.log('annyang working');
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
    setTimeout(minigame2, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer"
});
}

function minigame3() {
  $(".startingGame").remove();
  $(".mini2").remove();
  clickSFX.play();
  $('body').append("<div class = 'mini3'><div>");
  console.log("Third Minigame - Initiated");

  $(".mini3").text("A murderer is condemned to death. He has to choose between three rooms. The first is full of raging fires, the second is full of assassins with loaded guns, and the third is full of lions that haven't eaten in 3 years. Which room is safest for him?")

  if (annyang) {
        var commands = {
          'the third': function() {
            // call the function to show poem
            setTimeout(minigame2, 5000);
            responsiveVoice.speak("Correct. Lions that have not eaten in three years are dead.", 'Spanish Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

  $(".mini3").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Escape slips through your fingers...", 'UK English Male', options);
    $(".mini3").remove();
    setTimeout(minigame3, 5000);
  },
  closeOnEscape: false,
  title: "The Third Layer"
});

}
