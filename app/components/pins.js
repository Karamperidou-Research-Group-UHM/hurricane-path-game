import PinObject from '../gameobjects/pinObject.js';

/** Creates properties and methods for holding pin game objects. */
export default class Pins {

  /** Creates a new Pin object. */
  constructor(gameArea, width, height) {
    this.gameArea = gameArea;
    this.height = height;
    this.width = width;
    this.pinList = [];
    this.hitList = [];
  }

  /** Detects collision with hurricane, creates a new list of pins that were hit by the hurricane */
  hurricaneCollision(hurricane) {
    for (let i = 0; i < this.pinList.length; i++) {
      // Gets the square distance between the centers of both circles.
      const squareDistance = ((hurricane.x - this.pinList[i].x) * (hurricane.x - this.pinList[i].x)) + ((hurricane.y - this.pinList[i].y) * (hurricane.y - this.pinList[i].y));

      // Returns true if the square distance between the circles is less than or equal to the sum of their radii.
      if ((squareDistance <= (hurricane.width + this.pinList[i].width) * (hurricane.width + this.pinList[i].width))) {
        this.hitList.push(this.pinList[i].x);
      }
    }
    this.hitList = (this.hitList.filter((item, i, ar) => ar.indexOf(item) === i));
    // console.log(this.hitList);
    return this.hitList;
  }

  /** Initializes a list of cities/countries in the Pacific and adds them to an array */
  createPins() {
    let safeImage = '../images/green-pin.png';

    const oahuPin = new PinObject(415, 185, this.width, this.height, safeImage, this.gameArea, true);
    const mexicoCityPin = new PinObject(690, 197, this.width, this.height, safeImage, this.gameArea, true);
    const losAngelesPin = new PinObject(600, 105, this.width, this.height, safeImage, this.gameArea, true);
    const sydneyPin = new PinObject(170, 462, this.width, this.height, safeImage, this.gameArea, true);
    const tokyoPin = new PinObject(115, 110, this.width, this.height, safeImage, this.gameArea, true);
    const manilaPin = new PinObject(30, 225, this.width, this.height, safeImage, this.gameArea, true);
    const pngPin = new PinObject(135, 320, this.width, this.height, safeImage, this.gameArea, true);
    const fijiPin = new PinObject(297, 377, this.width, this.height, safeImage, this.gameArea, true);
    const vancouverPin = new PinObject(585, 20, this.width, this.height, safeImage, this.gameArea, true);
    this.pinList.push(oahuPin, mexicoCityPin, losAngelesPin, sydneyPin, tokyoPin, manilaPin, pngPin, fijiPin, vancouverPin);
  }

  /** Changes marker if the pin has been hit by the hurricane */
  changeMarker(pin) {
    let markedImage = '../images/red-pin.png';

    pin.image = markedImage;
  }

  /** Updates the canvas to display all the city pins */
  updatePins() {
    for (let j = 0; j < this.pinList.length; j++) {
      this.pinList[j].update();
    }
  }
}
