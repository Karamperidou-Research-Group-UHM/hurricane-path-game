import PinObject from '../gameobjects/pinObject.js';
import { latLongToCoordinates, coordinatesToLatLong } from '../components/coodinateConversion.js';

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
        if ((squareDistance <= (hurricane.width + this.pinList[i].width) * (hurricane.width + this.pinList[i].width)) && (i <= 9)) {
          // Only pushes to the hitList if the pin is a part of the original list (indices 0-9)
          this.hitList.push(this.pinList[i]);
        }
    }
    this.hitList = (this.hitList.filter((item, i, ar) => ar.indexOf(item) === i));
    // console.log(this.hitList);
    return this.hitList;
  }

  /** Initializes a list of cities/countries in the Pacific and adds them to an array */
  createPins() {
    const safeImage = '../images/green-pin.png';

    const oahu = latLongToCoordinates(-157.8, 21.5);
    const oahuPin = new PinObject((oahu.x - 75), (oahu.y - 65), this.width, this.height, safeImage, this.gameArea, true);

    const seattle = latLongToCoordinates(-122, 47.6)
    const seattlePin = new PinObject((seattle.x - 95), (seattle.y - 50), this.width, this.height, safeImage, this.gameArea, true);

    const la = latLongToCoordinates(-118, 34);
    const losAngelesPin = new PinObject((la.x - 110), (la.y - 60), this.width, this.height, safeImage, this.gameArea, true);

    const tokyo = latLongToCoordinates(139, 35.65);
    const tokyoPin = new PinObject((tokyo.x - 50), (tokyo.y - 50), this.width, this.height, safeImage, this.gameArea, true);

    const hongkong = latLongToCoordinates(114, 22);
    const hongKongPin = new PinObject((hongkong.x - 20), (hongkong.y - 70), this.width, this.height, safeImage, this.gameArea, true);

    const manila = latLongToCoordinates(121, 14.6);
    const manilaPin = new PinObject((manila.x - 35), (manila.y - 60), this.width, this.height, safeImage, this.gameArea, true);

    this.pinList.push(oahuPin, seattlePin, tokyoPin, losAngelesPin, hongKongPin, manilaPin);
  }

  /** Changes marker if the pin has been hit by the hurricane */
  changeMarker(pin) {
    this.pinList.push(new PinObject(pin?.x, pin?.y, this.width, this.height, '../images/red-pin.png', this.gameArea, true));
  }

  /** Resets the pins, removes the marked pins from the canvas */
  resetPins() {
    if (this.pinList.length > 9) {
      this.pinList = this.pinList.slice(0, 9);
      this.hitList = [];
    }
    return this.pinList;
  }

  /** Updates the canvas to display all the city pins */
  updatePins() {
    for (let j = 0; j < this.pinList.length; j++) {
      this.pinList[j].update();
    }

    for (let i = 0; i < this.hitList.length; i++) {
      this.changeMarker(this.hitList[i], i);
    }
  }
}
