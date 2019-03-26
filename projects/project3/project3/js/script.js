"use strict";

/*****************

Project 3 [Name Pending]
William L'Eriger

Javascript code for Project 3
A series of minigame pop-ups depicting daydreams
In a broader theme of Escapism

******************/

$(document).ready(setup);

let options = {
  pitch: Math.random(),
  rate: Math.random()
};

let clickSFX = new Audio("assets/sounds/effects.wav");

function setup() {

  $(this).one('click', minigame1);

}

function minigame1() {
  clickSFX.play();
  $('body').append("<div class = 'mini1'><div>");
  console.log("First Minigame - Initiated");

  $(".mini1").text("You close your eyes, removing yourself from reality. You can't help it. After all, it is just another s****y game. You look inside yourself, what do you see?");
  $(".mini1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("There is no escape.", 'UK English Male', options);
    // $(".mini1").remove();
    setTimeout(minigame1, 5000);
  },
  closeOnEscape: false,
  title: "Crossroads - Eye of the Mind",
  buttons: [{

    text: "Contempt",
    icon: "ui-icon-gear",
    click: function() {
      responsiveVoice.speak("Years of contempt leave you jaded.", 'UK English Female', options);
      setTimeout(minigame2, 5000);
    }
  },{
    text: "Fear",
    icon: "ui-icon-heart",
    click: minigame3
  }
]
});

}

function minigame2() {
  $(".mini1").remove();
  clickSFX.play();
  console.log("Second Minigame - Initiated");
  $('body').append("<div class = 'mini2'><div>");

  $(".mini2").text("Minigame 2")
  $(".mini2").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("...And yet, it persists.", 'UK English Male', options);
    $(".mini2").remove();
    setTimeout(minigame2, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer"
});
}

function minigame3() {
  $(".mini1").remove();
  clickSFX.play();
  $('body').append("<div class = 'mini3'><div>");
  console.log("Third Minigame - Initiated");

  $(".mini3").text("The Third Minigame.")
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
