/*****************

Well Over your Head
William L'Eriger

Try to escape a well, only to find out that at the top, there is another well!

******************/

//document ready defined to the setup function
//
$(document).ready(setup);

// defining some variables I will inevitably use
// $addBrick will be triggerred once the player presses a button
// $climbOut activates once they reach the top of the well
let $addBrick;
let $canvas;
let $bricksStacked;
let $well;

// function setup()
//
// Here I define things that will load only once at the start
function setup() {


// assigning the functions to specific id tags in my index page
  $canvas = $('#canvas');
  $well = $('#wellBackground');
  $addBrick = $("#bricks");

// the function which stores how many bricks were stacked
// this is here because at 12 bricks, the player climbs out of the original well and into a new one
  $bricksStacked = 0;

// anonymous function which checks if the canvas div has been clicked
  $canvas.on ("click", function(){

  // if statement to check if bricks added are under 12, if yes, add more bricks when clicked
    if ($bricksStacked < 12) {

    // .append is used to add text divs inside my brick id
      $addBrick.append("<div>BRICK</div>");
    // add one to the bricks stacked
      $bricksStacked++;
    // check if $bricksStacked works as intended
      console.log($bricksStacked);

  // else if to check if bricks are equal to or greater than 12, which is the height of the well
    } else if ($bricksStacked >= 12) {

    // .empty to remove the BRICK words on the screen
      $addBrick.empty();
    // reset bricks stacked value to 0
      $bricksStacked = 0;
    // adjust the width of the well by adding to it, calling the css values for the wellBackground div
      let width = parseInt($well.css('width'));
      width+= 50;
      $well.css('width', width +'px')

    }
  });

  $('#prompt').dialog();
}
