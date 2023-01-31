import GameObject from './gameObject.js';
import CollisionDetection from '../components/collisionDetection.js';

/** Created properties and methods for a pressure system game object. */
export default class PressureSystem extends GameObject {
  /** Creates a new PressureSystem instance. */
  constructor(x, y, width, height, image, gameArea, isImage, pressureType) {
    super(x, y, width, height, image, gameArea, isImage);
    this.radiusX = width;
    this.radiusY = height;
    this.pressureType = pressureType;
    this.inBounds = false;
    this.colDetection = new CollisionDetection();
    this.initX = x;
    this.initY = y;
  }

  /** Mutator method for inBounds. */
  setInBounds(newState) {
    this.inBounds = newState;
  }

  /** Moves the pressure system based on where the mouse drags it. */
  async move(newX, newY, isAdjusted) {
    // Checks if the object was hit by something else other than the user's mouse.
    if (isAdjusted) {
      this.x += newX;
      this.y += newY;

      // Gets the collision information with the canvas.
      const canvasCollision = this.colDetection.detectCollisionCanvas(this, this.gameArea, 'ellipse');

      // Checks if the object is outside the horizontal bounds of the canvas and bounces the object back in the opposite way.
      if (canvasCollision === 'left') {
        this.x += this.radiusX;
      } else if (canvasCollision === 'right') {
        this.x -= this.radiusX;
      }

      // Checks if the object is outside the vertical bounds of the canvas and bounces the object back in the opposite way.
      if (canvasCollision === 'top') {
        this.y += this.radiusX;
      } else if (canvasCollision === 'bottom') {
        this.y -= this.radiusX;
      }
    } else {
      // Makes sure the newX and newY coordinates are within the object image.
      if (this.inBounds || (newX <= this.x + this.radiusX && newX >= this.x - this.radiusX && newY <= this.y + this.radiusY && newY >= this.y - this.radiusY)) {
        this.inBounds = true;
        this.x = newX;
        this.y = newY;

        /*
        let canvasCollision;

        // Checks pressure type and assigns checks the collision with the canvas based on the pressure system type.
        if (this.pressureType === 'high') {
          // Gets the collision information with the canvas.
          canvasCollision = this.colDetection.detectBoundary({min: 0, max: this.gameArea.canvas.width}, {min: 0, max: (this.gameArea.canvas.height / 2) + 50}, this);
        } else {
          canvasCollision = this.colDetection.detectBoundary({min: 0, max: this.gameArea.canvas.width}, {min: (this.gameArea.canvas.height / 2) - 50, max: this.gameArea.canvas.height}, this);
        }

        // Checks if the object is outside the horizontal bounds of the canvas and bounces the object back in the opposite way.
        if (canvasCollision === 'left') {
          this.inBounds = false;
          this.x += this.radiusX;
          // Waits 500ms.
          await sleep(500);
          // Moves the system back by half its radius.
          this.x -= this.radiusX / 2;
        } else if (canvasCollision === 'right') {
          this.inBounds = false;
          this.x -= this.radiusX;
          await sleep(500);
          // Moves the system back by half its radius.
          this.x += this.radiusX / 2;
        }

        // Checks if the object is outside the vertical bounds of the canvas and bounces the object back in the opposite way.
        if (canvasCollision === 'top') {
          this.inBounds = false;
          // Bounces back the system.
          this.y += this.radiusX;
          // Waits 500ms.
          await sleep(500);
          // Moves the system back by half its radius.
          this.y -= this.radiusX / 2;
        } else if (canvasCollision === 'bottom') {
          this.inBounds = false;
          this.y -= this.radiusX;
          await sleep(500);
          // Moves the system back by half its radius.
          this.y += this.radiusX / 2;
        }
        */
        return true;
      }
    }
    return false;
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

  /** Updates the image of the game object. */
  update() {
    const ctx = this.gameArea.context;
    this.pressureType === 'high' ? ctx.fillStyle = 'blue' : ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // Checks if the system is outside the canvas and if it is, repositions it to its initial spot.
    if (this.x - this.radiusX < 0 || this.x + this.radiusX > this.gameArea.canvas.width ||
        this.y - this.radiusX < 0 || this.y + this.radiusY > this.gameArea.canvas.height) {
      this.x = this.initX;
      this.y = this.initY;
    }
    super.update();
  }
}

/** Waits a given number of milliseconds before resuming. */
const sleep = ms => new Promise(r => setTimeout(r, ms));
