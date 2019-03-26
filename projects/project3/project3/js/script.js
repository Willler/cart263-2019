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
  console.log("First Minigame - Initiated");

  $(".mini1").text("The First Minigame, which basically chooses the path to take, using annyang.")
  $(".mini1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    at: "center"
  },
  height: 380,
  width: 550,
  // close: minigame2,
  closeOnEscape: false,
  title: "The First Layer",
  buttons: [{

    text: "2",
    icon: "ui-icon-gear",
    click: minigame2,
  },{
    text: "3",
    icon: "ui-icon-heart",
    click: minigame3
  }
]
});

}

function minigame2() {
  $(".mini1").remove();
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
  // close: function(minigame2, ui);
  closeOnEscape: false,
  title: "The Second Layer"
});
}

function minigame3() {
    $(".mini1").remove();
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
  // close: minigame2,
  closeOnEscape: false,
  title: "The Third Layer"
});

}
