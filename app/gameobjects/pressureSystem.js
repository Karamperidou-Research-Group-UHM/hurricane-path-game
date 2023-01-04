import GameObject from './gameObject.js';

/** Created properties and methods for a pressure system game object. */
export default class PressureSystem extends GameObject {
  /** Creates a new PressureSystem instance. */
  constructor(x, y, width, height, image, gameArea,pressureType) {
    super(x, y, width, height, image, gameArea);
    this.radiusX = width;
    this.radiusY = height;
    this.pressureType = pressureType;
  }

  /** Moves the pressure system based on where the mouse drags it. */
  move() {
    /** TODO */
  }

  /** Changes the size of the pressure system given the amount. */
  changeSize(amount) {
    // Checks the bounds on the pressure system's size.
    if ((this.radiusX + amount >= 0) && (this.radiusX + amount <= 200)) {
      // Increases the radius of the system by a certain amount given.
      this.radiusX += amount;
      this.radiusY += amount;
    }
  }


  /** Updates the image of the game object. */
  update() {
    const ctx = this.gameArea.context;
    ctx.fillStyle = this.image;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}
