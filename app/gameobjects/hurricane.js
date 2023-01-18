import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea, isImage, category, sst) {
    super(x, y, width, height, image, gameArea, isImage);
    this.category = category;
    this.sst = sst;
    this.angularSpeed = -3;
    this.speed = 1;
    this.lastPoint = { x: this.x, y: this.y };
    this.width *= 3;
    this.height *= 3;
  }

  /** Rotates the Hurricane object counter-clockwise. */
  rotate() {
    const angle = this.angularSpeed * (Math.PI / 180);
    const centerX = this.x + (this.width / 2);
    const centerY = this.y + (this.height / 2);
    const ctx = this.gameArea.context;

    // Translates center of rotation to center of object.
    ctx.translate(centerX, centerY);
    // Rotates object.
    ctx.rotate(angle);
    // Translates back the center of rotation to 0,0.
    ctx.translate(-1 * centerX, -1 * centerY);
  }

  /** Moves the Hurricane object in the direction of the next point given. */
  move(target) {
    // Finds the change is x and y between the target point and last point.
    const dx = target.x - this.lastPoint.x;
    const dy = target.y - this.lastPoint.y;
    // Gets the direction the hurricane needs to move in.
    const direction = Math.atan2(dx, dy);
    // Moves the hurricane in the direction.
    this.x += this.speed * Math.sin(direction);
    this.y += this.speed * Math.cos(direction);
  }

  /** Updates the Hurricane object. */
  update() {
    // this.rotate();
    // super.update();
    let sst_xPosition = 0;
    if (this.sst >= 0 && this.sst <= 99) {
        sst_xPosition = 40;
    } else if (this.sst > 99) {
        sst_xPosition = 50;
    }

    const ctx = this.gameArea.context;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.font = 'bold 25px lato';
    ctx.beginPath();
    ctx.fillText(`SST: ${this.sst}F`, (this.x - sst_xPosition), (this.y + 60));
    ctx.fillText(`Category ${this.category}`, (this.x - 50), (this.y + 85));
    ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
