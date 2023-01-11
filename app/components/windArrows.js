import WindArrow from '../gameobjects/windArrow.js';

/** Creates properties and methods for holding wind arrow game objects. */
export default class WindArrows {
  /** Creates a new WindArrows object. */
  constructor(gameArea) {
    this.gameArea = gameArea;
    this.windArrows = [];
  }

  /** Adds wind arrow game objects to the wind arrows array. */
  createWindArrows() {
    // Creates 11 rows of 42 wind arrows each.
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 21; j++) {
        const windArrow = new WindArrow((j * 40) + 5, (i * 100) + 5, 42, 30, '../images/WindArrow.png', this.gameArea, true);
        // const windArrow = new WindArrow((j * 40) + 5, (i * 100) + 5, 10, 10, 'black', this.gameArea, false);
        this.windArrows.push(windArrow);
      }
    }
  }

  /** Updates the wind arrow game objects in the wind arrows array. */
  updateWindArrows() {
    for (let i = 0; i < 126; i++) {
      this.windArrows[i].update();
    }
  }
}
