"use strict";

/*****************

Caricature
William L'Eriger

A project which allows the player to reconstruct an experience of growing up using the internet
on a small scale

******************/

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

  // loading in json files
  $.getJSON('assets/data/art.json', dataLoaded);
  $.getJSON('assets/data/moods.json', dataLoaded);
  $.getJSON('assets/data/animals.json', dataLoaded);
  $.getJSON('assets/data/flowers.json', dataLoaded);
  $.getJSON('assets/data/countries.json', dataLoaded);
}
