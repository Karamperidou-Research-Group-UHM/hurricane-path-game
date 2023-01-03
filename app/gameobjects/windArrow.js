import GameObject from './gameObject.js';

/** Creates properties and methods for a wind arrow game object. */
export default class WindArrow extends GameObject {
  /** Creates a wind arrow game object. */
  constructor(x, y, width, height, image, gameArea) {
    super(x, y, width, height, image, gameArea);
    this.initalAngle = 180;
    // this.rotate(this.initalAngle);
  }

  /** Rotates the wind arrow to the given angle. */
  rotate(angle) {
    const radians = angle * (Math.PI / 180);
    const centerX = this.x + (this.width / 2);
    const centerY = this.y + (this.height / 2);
    const ctx = this.gameArea.context;

    // Translates center of rotation to center of object.
    ctx.translate(centerX, centerY);
    // Rotates object.
    ctx.rotate(radians);
    // Translates back the center of rotation to 0,0.
    ctx.translate(-1 * centerX, -1 * centerY);
  }

  /** Updates the wind arrow's image. */
  update() {
    super.update();
  }
}
