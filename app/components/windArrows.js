import WindArrow from '../gameobjects/windArrow.js';

/** Creates properties and methods for holding wind arrow game objects. */
export default class WindArrows {
  /** Creates a new WindArrows object. */
  constructor(windArrowData, gameArea) {
    this.gameArea = gameArea;
    this.windArrowData = windArrowData;
    this.windArrows = [];
    this.delete = [];
  }

  /** Adds wind arrow game objects to the wind arrows array. */
  createWindArrows() {
    // Creates WindArrow objects for each element in windArrowData and pushes them to windArrows array.
    for (let i = 0; i < this.windArrowData.length; i++) {
        const windArrow = new WindArrow(this.windArrowData[i].x, this.windArrowData[i].y, 42, 30, '../images/WindArrow.png', this.gameArea, true, this.windArrowData[i].windDir);
        this.windArrows.push(windArrow);
    }
  }

  /** Creates a list of wind arrows that collide with a given object
   *  @param windArrows wind arrow array
   *  @param object: map pins and pressure systems
   * */
  detectCollision(windArrows, object) {
    let squareDistance, radiiSum;
    for (let i = 0; i < windArrows.windArrowData.length; i++) {
      squareDistance = ((object.x - windArrows.windArrowData[i].x) * (object.x - windArrows.windArrowData[i].x)) + ((object.y - windArrows.windArrowData[i].y) * (object.y - windArrows.windArrowData[i].y));
      radiiSum = (object.width + 42) * (object.width + 42);
      // Returns true if the square distance between the circles is less than or equal to the sum of their radii.
      if (squareDistance <= radiiSum) {
         this.delete.push(i);
      }
    }
    return this.delete;
  }

  /** Updates the wind arrow game objects in the wind arrows array. */
  updateWindArrows() {
    for (let i = 0; i < this.windArrows.length; i++) {
      this.windArrows[i].update();
    }
  }
}
