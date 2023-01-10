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
    this.highPressureSize += increment;
  }

  /** Changes the low pressure size by an increment. */
  changeLowSize(increment) {
    this.lowPressureSize += increment;
  }

  /** Changes the temperature change by an increment. */
  changeTemp(increment) {
    this.tempChange += increment;
  }
}
