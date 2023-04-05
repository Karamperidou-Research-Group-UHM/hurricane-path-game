import WindArrow from '../gameobjects/windArrow.js';

/** Creates properties and methods for holding wind arrow game objects. */
export default class WindArrows {
  /** Creates a new WindArrows object. */
  constructor(windArrowData, gameArea, highPressureSystem, lowPressureSystem, hurricane) {
    this.gameArea = gameArea;
    this.windArrowData = windArrowData;
    this.highPressureSystem = highPressureSystem;
    this.lowPressureSystem = lowPressureSystem;
    this.hurricane = hurricane;
    this.windArrows = [];
  }

  /** Adds wind arrow game objects to the wind arrows array. */
  createWindArrows() {
    // Creates WindArrow objects for each element in windArrowData and pushes them to windArrows array.
    for (let i = 0; i < this.windArrowData.length; i++) {
      // const windArrow = new WindArrow(this.windArrowData[i].x, this.windArrowData[i].y, 21, 15, '../images/WindArrow.png', this.gameArea, true, this.windArrowData[i].windDir, this.highPressureSystem, this.lowPressureSystem, this.hurricane);
      const windArrow = new WindArrow(this.windArrowData[i].x, this.windArrowData[i].y, 21, 15, '../images/WindArrow.png', this.gameArea, true, this.windArrowData[i].windDir, this.highPressureSystem, this.lowPressureSystem, this.hurricane);
      this.windArrows.push(windArrow);
    }
  }

  /** Updates the wind arrow game objects in the wind arrows array. */
  updateWindArrows() {
    for (let i = 0; i < this.windArrows.length; i++) {
      this.windArrows[i].update();
    }
  }
}
