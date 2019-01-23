// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  constructor(x,y,minSize,maxSize, vx, vy, speed) {
    super(x,y,random(minSize,maxSize),'#a142f4');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;
  }

  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
  }

  update() {

    this.vx = map(random(), 0, 1, -this.speed, this.speed);
    this.vy = map(random(), 0, 1, -this.speed, this.speed);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }

    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }
}
