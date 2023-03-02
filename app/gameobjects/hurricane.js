import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea, isImage, category, sst) {
    super(x, y, width, height, image, gameArea, isImage);
    this.x = x;
    this.y = y;
    this.prevCategory = 0;
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
    this.closeToEquator = false;
    this.activityLog = [];
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
    // Sets the growth rate for the hurricane's growth of wind speed based on sst.
    this.growthRate = (this.sst / 50);
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

  /** Adds "HIT" location to activity log
   *  Guide:
   *    x = 415: Oahu Pin
   *    x = 690: Mexico City Pin
   *    x = 600: Los Angeles Pin
   *    x = 115: Tokyo Pin
   *    x = 30: Manila Pin
   *    x = 585: Vancouver Pin
   * */
  getHitCity(hitList) {
    for (let i = 0; i < hitList.length; i++) {
      if (hitList[i].x === 415 && !this.activityLog.includes(`Hurricane hit Honolulu, HI`)) {
        this.activityLog.unshift(`Hurricane hit Honolulu, HI`);
      } else if (hitList[i].x === 690 && !this.activityLog.includes(`Hurricane hit Mexico City, Mexico`)) {
        this.activityLog.unshift(`Hurricane hit Mexico City, Mexico`);
      } else if (hitList[i].x === 600 && !this.activityLog.includes(`Hurricane hit Los Angeles, CA`)) {
        this.activityLog.unshift(`Hurricane hit Los Angeles, CA`);
      } else if (hitList[i].x === 115 && !this.activityLog.includes(`Hurricane hit Tokyo, Japan`)) {
        this.activityLog.unshift(`Hurricane hit Tokyo, Japan`);
      } else if (hitList[i].x === 30 && !this.activityLog.includes(`Hurricane hit Manila, Philippines`)) {
        this.activityLog.unshift(`Hurricane hit Manila, Philippines`);
      } else if (hitList[i].x === 585 && !this.activityLog.includes(`Hurricane hit Vancouver, Canada`)) {
        this.activityLog.unshift(`Hurricane hit Vancouver, Canada`);
      }
    }

    this.activityLog.filter((item, i, ar) => ar.indexOf(item) === i);
    document.getElementById("hurr-activity").innerText = this.activityLog.join('\n');
  }

  /** Gets activity log of hurricane behaviour, if it increased/decreased in category or if it decays */
  getActivity(prev, curr) {
    if (prev > curr) {
      this.activityLog.unshift(`Hurricane decreased from Category ${prev} to ${curr}`);
    } else if (prev < curr) {
      this.activityLog.unshift(`Hurricane increased from Category ${prev} to ${curr}`);
    } else if (curr === 0) {
      this.activityLog.unshift(`Hurricane transformed into a Low Pressure System`);
    }

    document.getElementById("hurr-activity").innerText = this.activityLog.join('\n');
  }

  /** Sets the category of the hurricane based on the wind speed of its closest wind arrow. */
  updateCategory() {
    // Checks if there is a closest wind arrow.
    if (this.closestWindArrow !== null) {
      // Tracks previous category to compare to current category
      this.prevCategory = this.category;
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

      // Checks if the current category changed
      if (this.prevCategory !== this.category) {
        this.getActivity(this.prevCategory, this.category);
      }
    }
  }

  /** Reset hurricane to initial position and size. */
  resetHurricane() {
    this.speed = 1;
    this.x = this.initialPoint.x;
    this.y = this.initialPoint.y;
    this.width = this.initialWidth;
    this.height = this.initialWidth;
    this.activityLog = [];
    document.getElementById("hurr-activity").innerText = "";
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

  /** Checks the position of the hurricane in proximity to the equator and decreases itself if it comes by it. */
  checkPos(equator) {
    // Checks if the hurricane is within 20 px of the equator.
    if (this.y > equator.y - 20) {
      this.width -= (0.1 + (this.sst / 100)) / 4;
      this.height -= (0.1 + (this.sst / 100)) / 4;
      this.closeToEquator = true;
    } else {
      this.closeToEquator = false;
    }
  }

  /** Updates the Hurricane object. */
  update() {
    // Wind speeds only increase if the current sst is larger than 80 degrees and is not close to the equator, otherwise decrease.
    if (this.sst >= this.tempMin && !this.closeToEquator) {
      // Checks if wind speed can be updated by growth rate.
      if (this.windTimer % Math.floor(this.windBuffer) === 0) {
          // Increases wind speed by its current growth rate.
          this.windSpeed += 2 * this.growthRate;

          // Only increases radius if less than 100.
          if (this.width < 100) {
            this.width += this.growthRate;
            this.height += this.growthRate;
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
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
