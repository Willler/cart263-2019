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

  $canvas = $('#canvas');
  $well = $('#wellBackground');
  $addBrick = $("#bricks");
  $bricksStacked = 0;

  $canvas.on ("click", function(){

    if ($bricksStacked < 12) {
      $addBrick.append("<div>BRICK</div>");
      $bricksStacked++;
      console.log($bricksStacked);
    } else if ($bricksStacked >= 12) {
      $addBrick.empty();
      $bricksStacked = 0;
      let width = parseInt($well.css('width'));
      width+= 50;
      $well.css('width', width +'px')
    }
  });
}

// function newWell()
//
// this function will enlarge the previous well and erase all the bricks gathered, resetting player at the // bottom
// function newWell() {
//   if ($bricksStacked === 12) {
//     $addBrick.remove("<div>BRICK</div>");
//   }
// }
