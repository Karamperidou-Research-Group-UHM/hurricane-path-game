import GameObject from './gameObject.js';
import { windArrowCalculator } from '../components/windArrowCalculator.js';

/** Creates properties and methods for a wind arrow game object. */
export default class WindArrow extends GameObject {
  /** Creates a wind arrow game object. */
  constructor(x, y, width, height, image, gameArea, isImage, initAngle, highPressureSystem) {
    super(x, y, width, height, image, gameArea, isImage);
    this.initalAngle = initAngle;
    this.highPressureSystem = highPressureSystem;
    // this.rotate(this.initalAngle);
  }

  /** Rotates the wind arrow to the given angle. */
  rotate(angle) {
    const radians = angle * (Math.PI / 180);
    const centerX = this.x + (this.width / 2);
    const centerY = this.y + (this.height / 2);
    const ctx = this.gameArea.canvas.getContext("2d");
    // Translates center of rotation to center of object.
    ctx.translate(centerX, centerY);
    // Rotates object.
    ctx.rotate(radians);
    // Translates back the center of rotation to 0,0.
    ctx.translate(-1 * centerX, -1 * centerY);
  }

  /** Updates the wind arrow's image. */
  update() {
    const ctx = this.gameArea.canvas.getContext("2d");

    // Saves the context of the canvas.
    ctx.save()
    // this.rotate(this.initalAngle);
    windArrowCalculator(this.highPressureSystem, this);
    super.update();
    // Restores the context of the canvas.
    ctx.restore();
  }
}
