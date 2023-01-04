import GameObject from './gameObject.js';

export default class PressureSystem extends GameObject {
  constructor(x, y, width, height, image, gameArea,pressureType) {
    super(x, y, width, height, image, gameArea);
    this.radiusX = width;
    this.radiusY = height;
    this.pressureType = pressureType;
  }



  update() {
    const ctx = this.gameArea.context;
    ctx.fillStyle = this.image;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}
