import GameObject from './gameObject.js';
import { distanceFromPressureSystem, windArrowCalculator } from '../components/windArrowCalculator.js';

/** Creates properties and methods for a wind arrow game object. */
export default class WindArrow extends GameObject {
  /** Creates a wind arrow game object. */
  constructor(x, y, width, height, image, gameArea, isImage, initAngle, highPressureSystem, lowPressureSystem) {
    super(x, y, width, height, image, gameArea, isImage);
    this.initalAngle = initAngle;
    this.highPressureSystem = highPressureSystem;
    this.lowPressureSystem = lowPressureSystem;
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
    // Gets the angles relative to the high and low pressure systems and the distances.
    const highAngle = windArrowCalculator(this.highPressureSystem, this);
    const lowAngle = windArrowCalculator(this.lowPressureSystem, this);
    const distFromHigh = distanceFromPressureSystem(this.highPressureSystem, this);
    const distFromLow = distanceFromPressureSystem(this.lowPressureSystem, this);

    let angle = highAngle;
    // Checks if distance from high and greater than 200 and sets angle to initial angle.
    if (distFromHigh > 200 && distFromLow > 200) {
      angle = this.initalAngle;
    } else if (distFromHigh <= 200 && distFromLow <= 200) {
      angle = (highAngle + lowAngle) / 2;
    } else if (distFromHigh <= 200) {
      angle = highAngle;
    } else if (distFromLow) {
      angle = lowAngle;
    }

    // Rotates the angle.
    this.rotate(angle);
    super.update();
    // Restores the context of the canvas.
    ctx.restore();
  }
}
