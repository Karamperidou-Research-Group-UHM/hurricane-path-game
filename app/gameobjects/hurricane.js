import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea) {
    super(x, y, width, height, image, gameArea);
    this.angularSpeed = -3;
    this.speed = 1;
    this.lastPoint = { x: this.x, y: this.y };
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

  /** Moves the Hurricane object to the next point given. */
  move(point) {
    const dx = point.x - this.lastPoint.x;
    const dy = point.y - this.lastPoint.y;
    const direction = Math.atan2(dx, dy);
    this.x += this.speed * Math.sin(direction);
    this.y += this.speed * Math.cos(direction);
    this.lastPoint = point;
  }

  /** Updates the Hurricane object. */
  update() {
    // this.rotate();
    super.update();
  }
}
