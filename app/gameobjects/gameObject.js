/** Properties and methods for a game object. */
export default class GameObject {
  /** Creates a new game object. */
  constructor(x, y, width, height, image, gameArea) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.gameArea = gameArea;
  }

  /** Updates the game object. */
  update() {
    const ctx = this.gameArea.context;
    ctx.fillStyle = this.image;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
