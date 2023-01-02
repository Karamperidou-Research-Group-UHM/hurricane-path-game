import GameObject from './gameObject.js';

/** Properties and methods of a Hurricane game object which extends the GameObject parent class. */
export default class Hurricane extends GameObject {
  /** Creates a new Hurricane object. */
  constructor(x, y, width, height, image, gameArea) {
    super(x, y, width, height, image, gameArea);
  }

  /** Updates the Hurricane object. */
  update() {
    super.update();
  }
}
