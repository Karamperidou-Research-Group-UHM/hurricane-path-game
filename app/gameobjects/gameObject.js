/** Properties and methods for a game object. */
export default class GameObject {
  /** Creates a new game object. */
  constructor(x, y, width, height, image, gameArea, isImage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    /*if (isImage) {
      this.image = new Image();
      this.image.src = image;
    }*/
    this.color = image;
    this.gameArea = gameArea;
    this.isImage = isImage;
  }

  /** Updates the game object. */
  update() {
    const ctx = this.gameArea.context;
    // if (this.isImage) {
      // ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    // } else {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // }
  }
}
