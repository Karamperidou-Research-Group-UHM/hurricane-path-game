export default class HeatPoint {
  constructor(x, y, temp, gameArea) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.gameArea = gameArea;
    this.temp = temp;
    this.color = 'rgb(254,50,50)';
  }

  /** Returns the correct rgb color value for the heat point. */
  setColor() {
    const maxTemp = 134;
    const tempDifference = maxTemp - this.temp;
    let r = 254;
    let g = 50;
    let b = 50;

    // Change rgb values the number of times the temp is different than the max temp.
    for (let i = 0; i < tempDifference; i++) {
      // Changes rgb values based on what i is.
      if (i < 102) {
        g += 2;
      } else if (i > 102 && i <= 204) {
        r -= 2;
      } else if (i > 204 && i <= 306) {
        b += 2;
      } else if (i > 306 && i <= 408) {
        g -= 2;
      } else if (i > 408 && i <= 439) {
        r += 2;
      }
    }

    // Returns the correct rgb color value.
    return `rgb(${r}, ${g}, ${b})`;
  }


}
