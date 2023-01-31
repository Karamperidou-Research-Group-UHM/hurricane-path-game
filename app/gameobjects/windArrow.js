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
    // this.rotate(this.initalAngle);
    const highAngle = windArrowCalculator(this.highPressureSystem, this);
    const lowAngle = windArrowCalculator(this.lowPressureSystem, this);
    const distFromHigh = distanceFromPressureSystem(this.highPressureSystem, this);
    const distFromLow = distanceFromPressureSystem(this.lowPressureSystem, this);
    const distanceBetweenSystems = distanceFromPressureSystem(this.highPressureSystem, this.lowPressureSystem);
    const highInfluenceFactor = distFromHigh / distanceBetweenSystems;
    const lowInfluenceFactor = distFromLow / distanceBetweenSystems;
    console.log(highInfluenceFactor);
    const angle = ((highInfluenceFactor) * highAngle + (lowInfluenceFactor) * lowAngle) / 2;
    this.rotate(angle);
    super.update();
    // Restores the context of the canvas.
    ctx.restore();
  }
}
