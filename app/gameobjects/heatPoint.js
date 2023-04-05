/** Creates the methods and properties for a Heat Point object. */
export default class HeatPoint {
  /** Creates a new Heat Point object. */
  constructor(x, y, temp, gameArea) {
    this.x = x;
    this.y = y;
    this.width = 10.3;
    this.height = 10.3;
    this.temp = temp;
    this.gameArea = gameArea;
  }

  /** Returns the correct rgb color value for the heat point. */
  setColor() {
    const maxTemp = 85;
    const tempDifference = maxTemp - this.temp;
    let r = 254;
    let g = 50;
    let b = 50;
    let changeAmount = 24;

    // Change rgb values the number of times the temp is different than the max temp.
    for (let i = 0; i < tempDifference; i++) {
      // Changes rgb values based on what i is.
      if (i < 10) {
        g += changeAmount;
      } else if (i > 10 && i <= 25) {
        r -= changeAmount;
      } else if (i > 25 && i <= 35) {
        b += changeAmount;
      } else if (i > 35 && i <= 45) {
        g -= changeAmount;
      } else if (i > 45 && i <= 50) {
        r += changeAmount;
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
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = pointColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
