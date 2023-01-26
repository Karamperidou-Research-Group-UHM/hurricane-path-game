/** Creates the methods and properties for a Heat Point object. */
export default class HeatPoint {
  /** Creates a new Heat Point object. */
  constructor(x, y, temp, gameArea) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.temp = temp;
    this.gameArea = gameArea;
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
      if (i < 51) {
        g += 4;
      } else if (i > 51 && i <= 102) {
        r -= 4;
      } else if (i > 102 && i <= 153) {
        b += 4;
      } else if (i > 204 && i <= 255) {
        g -= 4;
      } else if (i > 306 && i <= 357) {
        r += 4;
      }
    }

    // Returns the correct rgb color value.
    return `rgb(${r}, ${g}, ${b})`;
  }

  /** Updates the heat point object. */
  update() {
    const pointColor = this.setColor();
    const ctx = this.gameArea.context2;
    ctx.beginPath();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = pointColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
