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
  }

  /** Mutator method for inBounds. */
  setInBounds(newState) {
    this.inBounds = newState;
  }

  /** Accessor method for pressureType. */
  getPressureType() {
    return this.pressureType;
  }

  /** Moves the pressure system based on where the mouse drags it. */
  move(newX, newY, isAdjusted) {
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

        return true;
      }
    }
    return false;
  }

  /** Changes the size of the pressure system given the amount. */
  changeSize(amount) {
    // Checks the bounds on the pressure system's size.
    if (((this.radiusX / 2) + amount >= 10) && ((this.radiusX / 2) + amount <= 200)) {
      // Increases the radius of the system by a certain amount given.
      this.radiusX += amount;
      this.radiusY += amount;
      this.width += amount;
      this.height += amount;
    }
  }

  /** Updates the image of the game object. */
  update() {
    const ctx = this.gameArea.context;
    this.pressureType === 'high' ? ctx.fillStyle = 'blue' : ctx.fillStyle = 'red';
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    super.update();
  }
}
