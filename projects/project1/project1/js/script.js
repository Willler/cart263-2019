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
let $clickCanvas;

// function setup()
//
// Here I define things that will load only once at the start
function setup() {

  $clickCanvas = $('#canvas');
  $addBrick = $("#bricks");

  $clickCanvas.on ("click", function(){
    console.log('yes');
    $addBrick.append("<div>BRICK</div>");
  });
}

// function newWell()
//
// this function will enlarge the previous well and erase all the bricks gathered, resetting player at the // bottom
function newWell() {
  
}
