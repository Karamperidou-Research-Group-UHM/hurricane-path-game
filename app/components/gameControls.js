/** Provides methods and properties for game controls. */
export default class GameControls {
  /** Creates a new GameControls object. */
  constructor() {
    this.highPressureSize = 0;
    this.lowPressureSize = 0;
    this.tempChange = 0;
  }

  /** Changes the high pressure size by an increment. */
  changeHighSize(increment) {
    if (increment === 0) {
      this.highPressureSize = 0;
    } else {
      this.highPressureSize += increment;
    }
  }

  /** Changes the low pressure size by an increment. */
  changeLowSize(increment) {
    if (increment === 0) {
      this.lowPressureSize = 0;
    } else {
      this.lowPressureSize += increment;
    }
  }

  /** Changes the temperature change by an increment. */
  changeTemp(increment, heatmap) {
    if (increment === 0) {
      this.tempChange = 0;
    } else {
      this.tempChange += increment;

      // Adjusts the color of the heatmap given the increase in temperature.
      heatmap.increaseTemp(increment);
      // Redraws the correct heatmap.
      heatmap.updateHeatPoints();
    }
  }

  /** Returns the temp change. */
  getTempChange() {
    return this.tempChange;
  }
}
