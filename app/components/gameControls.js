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

  /** Resets the game controls to initial values. */
  resetGameControls() {
    this.highPressureSize = 0;
    this.lowPressureSize = 0;
    this.tempChange = 0;

    // Enables pressure system low buttons and disables pressure system high buttons.
    document.getElementById("high-").disabled = true;
    document.getElementById("low-").disabled = true;
    document.getElementById("high+").disabled = false;
    document.getElementById("low+").disabled = false;

    // Enables temp buttons and start button and disables reset button.
    document.getElementById("start").disabled = false;
    document.getElementById("temp+").disabled = false;
    document.getElementById("temp-").disabled = false;
    document.getElementById("reset").disabled = true;
  }

  /** Converts the given data into 1x-5x to display on the control panel
   *  Guide:
   *    1x: 6400
   *    2x: 7225
   *    3x: 8100
   *    4x: 9025
   *    5x: 10000
   * */
  convertObjectSizeData(size) {
    if (size === 6400) {
      return 1;
    } else if (size === 7225) {
      return 2;
    } else if (size === 8100) {
      return 3;
    } else if (size === 9025) {
      return 4;
    } else if (size === 10000) {
      return 5;
    } else {
      return 1;
    }
  }

  /** Set City to "HIT" */
  setHit(city) {
    document.getElementById(city).innerText = "HIT";
    document.getElementById(city).style.color = "red";
  }

  /** Changes the text of the city to "HIT" if it's marker collides with the hurricane
   *  Guide:
   *    x = 415: Oahu Pin
   *    x = 690: Mexico City Pin
   *    x = 600: Los Angeles Pin
   *    x = 115: Tokyo Pin
   *    x = 30: Manila Pin
   *    x = 585: Vancouver Pin
   * */
  changeCityStatus(hitList, cities) {
    for (let i = 0; i < hitList.length; i++) {
      if (hitList[i].x === 415) {
        this.setHit(cities[0]);
      } else if (hitList[i].x === 690) {
        this.setHit(cities[1]);
      } else if (hitList[i].x === 600) {
        this.setHit(cities[2]);
      } else if (hitList[i].x === 115) {
        this.setHit(cities[3]);
      } else if (hitList[i].x === 30) {
        this.setHit(cities[4]);
      } else if (hitList[i].x === 585) {
        this.setHit(cities[5]);
      }
    }
  }

  /** Enables and disables the game controls based on pressure size, and if the game started. */
  enableControls(highPressureSys, lowPressureSys, gameStart) {
    // Enables and disables high pressure system button based on size limits.
    if ((this.convertObjectSizeData(highPressureSys.getSize()) === 1)) {
      document.getElementById("high-").disabled = true;
    } else if ((this.convertObjectSizeData(highPressureSys.getSize()) === 5)) {
      document.getElementById("high+").disabled = true;
    } else {
      document.getElementById("high-").disabled = false;
      document.getElementById("high+").disabled = false;
    }

    // Enables and disables low pressure system button based on size limits.
    if ((this.convertObjectSizeData(lowPressureSys.getSize()) === 1)) {
      document.getElementById("low-").disabled = true;
    } else if ((this.convertObjectSizeData(lowPressureSys.getSize()) === 5)) {
      document.getElementById("low+").disabled = true;
    } else {
      document.getElementById("low-").disabled = false;
      document.getElementById("low+").disabled = false;
    }

    // If the game started, disable start and temp change buttons.
    if (gameStart) {
      document.getElementById("start").disabled = true;
      document.getElementById("temp+").disabled = true;
      document.getElementById("temp-").disabled = true;
      document.getElementById("reset").disabled = false;
    } else {
      document.getElementById("start").disabled = false;
      document.getElementById("temp+").disabled = false;
      document.getElementById("temp-").disabled = false;
      document.getElementById("reset").disabled = true;
    }
  }
}
