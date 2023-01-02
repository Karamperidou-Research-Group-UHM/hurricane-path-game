import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea) {
    super(x, y, width, height, image, gameArea);
    this.angularSpeed = -3;
    this.speed = 0;
  }

  /** Rotates the Hurricane Object counter-clockwise. */
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

  /** Updates the Hurricane object. */
  update() {
    this.rotate();
    super.update();
  }
}
