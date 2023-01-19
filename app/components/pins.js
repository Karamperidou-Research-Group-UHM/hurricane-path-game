import PinObject from '../gameobjects/pinObject.js';

/** Creates properties and methods for holding pin game objects. */
export default class Pins {

  /** Creates a new Pin object. */
  constructor(gameArea, image, width, height) {
    this.gameArea = gameArea;
    this.image = image;
    this.height = height;
    this.width = width;
    this.pinList = [];
  }

  createPins() {
    const oahuPin = new PinObject(415, 185, this.width, this.height, this.image, this.gameArea, true);
    const mexicoCityPin = new PinObject(690, 197, this.width, this.height, this.image, this.gameArea, true);
    const losAngelesPin = new PinObject(600, 105, this.width, this.height, this.image, this.gameArea, true);
    const sydneyPin = new PinObject(170, 462, this.width, this.height, this.image, this.gameArea, true);
    const tokyoPin = new PinObject(115, 110, this.width, this.height, this.image, this.gameArea, true);
    const manilaPin = new PinObject(30, 225, this.width, this.height, this.image, this.gameArea, true);
    const pngPin = new PinObject(135, 320, this.width, this.height, this.image, this.gameArea, true);
    const fijiPin = new PinObject(297, 377, this.width, this.height, this.image, this.gameArea, true);
    const vancouverPin = new PinObject(585, 20, this.width, this.height, this.image, this.gameArea, true);
    this.pinList.push(oahuPin, mexicoCityPin, losAngelesPin, sydneyPin, tokyoPin, manilaPin, pngPin, fijiPin, vancouverPin);
  }

  updatePins() {
    for (let i = 0; i < this.pinList.length; i++) {
      this.pinList[i].update();
    }
  }
}
