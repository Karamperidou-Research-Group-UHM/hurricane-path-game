import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea, isImage, category, sst) {
    super(x, y, width, height, image, gameArea, isImage);
    this.category = category;
    this.sst = sst;
    this.speed = 1;
    this.lastPoint = { x: this.x, y: this.y };
    this.width *= 3;
    this.height *= 3;
    this.angle = null;
    this.closestWindArrow = null;
  }

  /** Gives the hurricane a new angle. */
  changeAngle(windArrow) {
    if (this.closestWindArrow === null) {
      this.closestWindArrow = windArrow;
    } else {
      const dist1 = Math.sqrt(((this.x - windArrow.x) * (this.x - windArrow.x)) + ((this.y - windArrow.y) * (this.y - windArrow.y)));
      const dist2 = Math.sqrt(((this.x - this.closestWindArrow.x) * (this.x - this.closestWindArrow.x)) + ((this.y - this.closestWindArrow.y) * (this.y - this.closestWindArrow.y)));

      // Checks if new wind arrow is closer to the current closest one and changes it if it is.
      if (dist2 > dist1) {
        this.closestWindArrow = windArrow;
      }
    }
    this.angle = (this.closestWindArrow.currentAngle * (180 / Math.PI));
  }

  /** Moves the Hurricane object in the direction of the next point given. */
  move(target) {
    let dx = 0;
    let dy = 0;
    // Checks if hurricane is within x bounds.
    if (this.x - this.width >= 0 && this.x + this.width <= 825) {
      // Finds the change in x between the target point and last point.
      dx = target.x - this.lastPoint.x;
    }
    // Checks if hurricane is within y bounds.
    if (this.y - this.height >= 0 && this.y + this.height <= 526) {
      // Finds the change in y between the target point and last point.
      dy = target.y - this.lastPoint.y;
    }

    if (this.x === 89) {
      this.speed = 0;
    }
    // Gets the direction the hurricane needs to move in.
    const direction = Math.atan2(dx, dy);
    // Moves the hurricane in the direction.
    this.x += this.speed * Math.sin(direction);
    this.y += this.speed * Math.cos(direction);
  }

  /** Moves the hurricane given its angle. */
  moveHurricane(gameStart) {
    if (gameStart) {
      const vx = -1 * this.speed * Math.cos(this.angle * (Math.PI / 180));
      const vy = -1 * this.speed * Math.sin(this.angle * (Math.PI / 180));
      this.x += vx;
      this.y += vy;
      console.log(vx, vy);
    }
  }

  /** Updates the hurricane's y position by an amount.*/
  updateY(amount) {
    if (this.y - this.height >= 0 && this.y + this.height <= 526) {
      this.y += amount;
    }
  }

  /** Updates the Hurricane object. */
  update() {
    let sst_xPosition = 0;
    if (this.sst >= 0 && this.sst <= 99) {
        sst_xPosition = 40;
    } else if (this.sst > 99) {
        sst_xPosition = 50;
    }
    const ctx = this.gameArea.context;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.font = 'bold 25px lato';
    ctx.beginPath();
    ctx.fillText(`SST: ${this.sst}F`, (this.x - sst_xPosition), (this.y + 60));
    ctx.fillText(`Category ${this.category}`, (this.x - 50), (this.y + 85));
    ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
