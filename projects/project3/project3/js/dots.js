// A new class to create the moving particles that wil be in the back
// they will be called 'dots'
// in the main script file


// dots
//
// Where the dots object parameters and variables will be configured
// and initialized
function Dots(x, y, vx, vy, size, border, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.border = border;
  this.speed = speed;
}

// update()
//
// where changes to the dots object are determined
Dots.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}

// touchedBottom()
//
// function that makes the dots do something when they reach the bottom
// of the canvas, which in this case is reappear at the top in a random x position
Dots.prototype.touchedBottom = function () {
  // check if the y value is greater than the height of the canvas
  if (this.y > height) {
    this.y = 0;
    this.x = random(10, 990);
  }
}

// display()
//
// where we determine the object's appearance
Dots.prototype.display = function () {
  fill(200);
  noStroke();
  ellipse(this.x, this.y, this.size);
}
