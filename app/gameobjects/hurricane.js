import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea, isImage, category, sst) {
    super(x, y, width, height, image, gameArea, isImage);
    this.category = category;
    this.sst = sst;
    this.speed = 0.5;
    this.initialPoint = { x: this.x, y: this.y };
    this.width *= 3;
    this.height *= 3;
    this.initialWidth = this.width;
    this.closestWindArrow = null;
    this.windSpeed = 60.0;
    this.windTimer = 0;
    this.windBuffer = 30;
    this.tempMin = 80;
    this.tempTimer = 0;
  }

  /** Gives the hurricane a new angle. */
  changeSizeAndAngle(windArrow) {
    // Checks if a wind arrow was assigned to closest wind arrow.
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
    // Sets the angle of the hurricane to the wind arrow in degrees.
    this.angle = (this.closestWindArrow.currentAngle * (180 / Math.PI));
    // Sets the growth rate for the hurricane's growth of wind speed based on wind arrow wind strength and the sst.
    this.growthRate = (this.sst / 50) + this.closestWindArrow.windStrength;
  }

  /** Moves the hurricane given its angle. */
  moveHurricane(gameStart) {
    if (gameStart) {
      // Sets x speed and y speed of the hurricane based on the angle.
      const vx = -1 * this.speed * Math.cos(this.angle * (Math.PI / 180));
      const vy = -1 * this.speed * Math.sin(this.angle * (Math.PI / 180));
      this.x += vx;
      this.y += vy;
    }
  }

  /** Sets the category of the hurricane based on the wind speed of its closest wind arrow. */
  updateCategory() {
    // Checks if there is a closest wind arrow.
    if (this.closestWindArrow !== null) {
      // Wind strength indicators for categories divided by 1.2 for scale reasons.
      if (this.windSpeed < 74) {
        this.category = 0;
      } else if (this.windSpeed >= 74 && this.windSpeed < 95) {
        this.category = 1;
      } else if (this.windSpeed >= 96 && this.windSpeed < 110) {
        this.category = 2;
      } else if (this.windSpeed >= 111 && this.windSpeed < 129) {
        this.category = 3;
      } else if (this.windSpeed >= 130 && this.windSpeed < 156) {
        this.category = 4;
      } else if (this.windSpeed >= 156) {
        this.category = 5;
      }
    }
  }

  /** Reset hurricane to initial position and size. */
  resetHurricane() {
    this.x = this.initialPoint.x;
    this.y = this.initialPoint.y;
    this.width = this.initialWidth;
    this.height = this.initialWidth;
    this.speed = 1;
  }

  /** Checks current sea surface temperature. */
  checkSST(tempCoordinates) {
    // Checks temp every few ms.
    if (this.tempTimer % 20 === 0) {
      // Gets the current sst of the heat point closest to the hurricane.
      const currentSST = tempCoordinates.find(heatPoint => (this.x >= heatPoint.x - 1 && this.x <= heatPoint.x + 1) && (this.y >= heatPoint.y - 1 && this.y <= heatPoint.y + 1));
      this.sst = currentSST.temp;
    }
    this.tempTimer += 1;
  }

  /** Updates the Hurricane object. */
  update() {
    let sst_xPosition = 0;
    if (this.sst >= 0 && this.sst <= 99) {
        sst_xPosition = 40;
    } else if (this.sst > 99) {
        sst_xPosition = 50;
    }

    // Wind speeds only increase if the current sst is larger than 80 degrees, otherwise decrease.
    if (this.sst >= this.tempMin) {
      // Checks if wind speed can be updated by growth rate.
      if (this.windTimer % Math.floor(this.windBuffer) === 0) {
        // Checks if the distance between the closest arrow and the high pressure system is greater than 350.
        if (this.closestWindArrow.distance >= 250) {
          // Decreases wind speed by its current growth rate times 2.
          this.windSpeed -= 2 / this.growthRate;
          // Only reduces radius if its greater than its initial radius.
          if (this.width > this.initialWidth) {
            this.width -= (0.1 + (this.windSpeed / 100)) / 4;
            this.height -= (0.1 + (this.windSpeed / 100)) / 4;
          }
          // Checks if buffer is at its maximum
          if (this.windBuffer > 40) {
            // Increases the buffer the closer the hurricane is.
            this.windBuffer += this.growthRate;
          }
        } else {
          // Increases wind speed by its current growth rate.
          this.windSpeed += 2 * this.growthRate;

          // Only increases radius if less than 100.
          if (this.width < 100) {
            this.width += this.growthRate;
            this.height += this.growthRate;
          }

          // Checks if buffer is at its minimum.
          if (this.windBuffer > 10) {
            // Decreases the buffer the closer the hurricane is.
            this.windBuffer -= this.growthRate;
          }
        }
      }
    } else {
      // Only reduces wind speed if its greater than 60.
      if (this.windSpeed > 60) {
        this.windSpeed -= 0.1 + (this.sst / 100);
        // Only reduces radius if its greater than its initial radius.
        if (this.width > this.initialWidth) {
          this.width -= (0.1 + (this.sst / 100)) / 4;
          this.height -= (0.1 + (this.sst / 100)) / 4;
        }
      }
    }
    this.windTimer += 1;
    this.updateCategory();
    const ctx = this.gameArea.context;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.font = 'bold 25px lato';
    ctx.beginPath();
    ctx.fillText(`SST: ${this.sst}F`, (this.x - sst_xPosition), (this.y + 60));
    ctx.fillText(this.category === 0 ? `Low Pressure System` : `Category ${this.category}`, (this.x - 50), (this.y + 85));
    ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
