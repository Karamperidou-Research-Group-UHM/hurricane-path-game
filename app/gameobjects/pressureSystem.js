import GameObject from './gameObject.js';

/** Created properties and methods for a pressure system game object. */
export default class PressureSystem extends GameObject {
  /** Creates a new PressureSystem instance. */
  constructor(x, y, width, height, image, gameArea, isImage, pressureType) {
    super(x, y, width, height, image, gameArea, isImage);
    this.radiusX = width;
    this.radiusY = height;
    this.pressureType = pressureType;
  }

  /** Accessor method for pressureType. */
  getPressureType() {
    return this.pressureType;
  }

  /** Moves the pressure system based on where the mouse drags it. */
  move(newX, newY) {
    // Makes sure the newX and newY coordinates are within the bounds of the canvas.
    if (newX <= this.gameArea.canvas.width && newX >= 0 && newY <= this.gameArea.canvas.height && newY >= 0) {
      this.x = newX;
      this.y = newY;
    }
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
    // super.update();
    const ctx = this.gameArea.context;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}
