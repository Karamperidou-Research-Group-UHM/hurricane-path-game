import GameObject from './gameObject.js';

/** Creates properties and methods for a pin object. */
export default class PinObject extends GameObject {
  /** Creates a wind arrow game object. */
  constructor(x, y, width, height, image, gameArea, isImage) {
    super(x, y, width, height, image, gameArea, isImage);
  }

  /** Updates the pin image. */
  update() {
    super.update();
  }
}
