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

  /** Moves the Hurricane object to the next point given. Returns true if hurricane is at target point and false otherwise. */
  move(target) {
    // Finds the change is x and y between the target point and last point.
    const dx = target.x - this.lastPoint.x;
    const dy = target.y - this.lastPoint.y;
    // Gets the direction the hurricane needs to move in.
    const direction = Math.atan2(dx, dy);
    // Moves the hurricane in the direction.
    this.x += this.speed * Math.sin(direction);
    this.y += this.speed * Math.cos(direction);

    // If the hurricane's coordinates are at the given point, set lastPoint to target and return true.
    if (Math.floor(this.x) === target.x && Math.floor(this.y) === target.y) {
      this.lastPoint = target;
      return true;
    }

    return false;
  }

  /** Updates the Hurricane object. */
  update() {
    // this.rotate();
    super.update();
  }
}
