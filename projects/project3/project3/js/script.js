"use strict";

/*****************

Project 3 [Name Pending]
William L'Eriger

Javascript code for Project 3
A series of minigame pop-ups depicting daydreams
In a broader theme of Escapism

******************/

$(document).ready(setup);

function setup() {
  $(this).one('click', minigame1);
}

function minigame1() {
  $('body').append("<div class = 'mini1'><div>");
  console.log("mini1");

  $(".mini1").text("Minigame 1")
  $(".mini1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  height: 380,
  width: 550,
  close: minigame2() 
});
}

function minigame2() {
  $(".mini1").remove();
  $('body').append("<div class = 'mini2'><div>");

  $(".mini2").text("Minigame 2")
  $(".mini2").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  height: 380,
  width: 550,
  // close: function(minigame2, ui);
});
}
