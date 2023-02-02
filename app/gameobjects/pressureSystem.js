import GameObject from './gameObject.js';

/** Created properties and methods for a pressure system game object. */
export default class PressureSystem extends GameObject {
  /** Creates a new PressureSystem instance. */
  constructor(x, y, width, height, image, gameArea, isImage, pressureType) {
    super(x, y, width, height, image, gameArea, isImage);
    this.radiusX = width;
    this.radiusY = height;
    this.pressureType = pressureType;
    this.inBounds = false;
    this.initX = x;
    this.initY = y;
  }

  /** Mutator method for inBounds. */
  setInBounds(newState) {
    this.inBounds = newState;
  }

  /** Moves the pressure system based on where the mouse drags it. */
  move(newX, newY, isAdjusted) {
    // Makes sure the newX and newY coordinates are within the object image.
    if (this.inBounds || (newX <= this.x + this.radiusX && newX >= this.x - this.radiusX && newY <= this.y + this.radiusY && newY >= this.y - this.radiusY)) {
      this.inBounds = true;
      this.x = newX;
      this.y = newY;
    }
  }

  /** Changes the size of the pressure system given the amount. */
  changeSize(amount) {
    // Checks the bounds on the pressure system's size.
    if ((this.radiusX + amount >= 10) && (this.radiusX + amount <= 100) && ((this.radiusX * this.radiusY) >= 6400)) {
      // Increases the radius of the system by a certain amount given.
      this.radiusX += amount;
      this.radiusY += amount;
      this.height += (amount * 3);
      this.width += (amount * 3);
    }
  }

  /** Returns the size of the given pressure system
   *  Guide:
   *    1x: 6400
   *    2x: 7225
   *    3x: 8100
   *    4x: 9025
   *    5x: 10000
   * */
  getSize() {
      return this.radiusX * this.radiusY;
  }

  /** Resets the pressure system to it's initial position */
  resetPressureSystem(ps) {
    ps.x = ps.initX;
    ps.y = ps.initY;
  }

  /** Updates the image of the game object. */
  update() {
    const ctx = this.gameArea.context;
    this.pressureType === 'high' ? ctx.fillStyle = 'blue' : ctx.fillStyle = 'red';

    // Checks if the system is outside the canvas and if it is, repositions it to its initial spot.
    if (this.x < 0 || this.x > this.gameArea.canvas.width ||
      this.y < 0 || this.y > this.gameArea.canvas.height) {
      this.x = this.initX;
      this.y = this.initY;
    }

    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    super.update();
  }
}

/** Waits a given number of milliseconds before resuming. */
const sleep = ms => new Promise(r => setTimeout(r, ms));
