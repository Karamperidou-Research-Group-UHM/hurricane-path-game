import HeatPoint from '../gameobjects/heatPoint.js';

/** Creates the properties and methods for a HeatMap object. */
export default class HeatMap {
  /** Creates a new HeatMap object. */
  constructor(coordinates, gameArea) {
    this.coordinates = coordinates;
    this.gameArea = gameArea;
    this.heatPoints = [];
    this.addHeatPoints();
  }

  /** Adds a heat point to the canvas given the coordinates given. */
  addHeatPoints() {
    // Loops through each coordinate, adds the heat point to the canvas and the heatPoints array. */
    for (let i = 0; i < this.coordinates.length; i++) {
      const heatPoint = new HeatPoint(this.coordinates[i].x, this.coordinates[i].y, this.coordinates[i].temp, this.gameArea);
      this.heatPoints.push(heatPoint);
    }
  }

  /** Increases the temperature for each coordinate point by a given amount. */
  increaseTemp(amount) {
    for (let i = 0; i < this.heatPoints.length; i++) {
      this.heatPoints[i].temp += amount;
    }
  }

  /** Resets the temperature for each coordinate point to 0. */
  resetTemp() {
    for (let i = 0; i < this.heatPoints.length; i++) {
      this.heatPoints[i].temp = this.coordinates[i].temp;
    }
  }

  /** Updates each heat point object in the heat points array. */
  updateHeatPoints() {
    const context = this.gameArea.context2;
    context.clearRect(0, 0, this.gameArea.offCanvas.width, this.gameArea.offCanvas.height);

    // Updates heat points.
    for(let i = 0; i < this.heatPoints.length; i++) {
      this.heatPoints[i].update();
    }
  }
}
