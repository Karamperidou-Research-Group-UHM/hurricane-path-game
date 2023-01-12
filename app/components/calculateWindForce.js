/** Creates properties and methods for calculating the wind force placed on the hurricane from a pressure system. */
export default class CalculateWindForce {
  /** Creates a CalcuateWindForce object. */
  constructor(hurricane, pressureSystem) {
    this.hurricane = hurricane;
    this.pressureSystem = pressureSystem;
  }

  /** Returns the square distance between the hurricane and pressure system. */
  getDistance() {
    const squareDistance = ((this.hurricane.x - this.pressureSystem.x) * (this.hurricane.x - this.pressureSystem.x)) + ((this.hurricane.y - this.pressureSystem.y) * (this.hurricane.y - this.pressureSystem.y));
    return squareDistance;
  }

  /** Returns the wind force magnitude. */
  getWindForceMagnitude() {
    return 100 / this.getDistance();
  }

  /** Returns the hurricane's angle relative to the pressure system. */
  getAngle() {
    const pointX = this.pressureSystem.x + this.hurricane.x;
    const pointY = this.pressureSystem.y + this.hurricane.y;
    return Math.atan2(pointY, pointX);
  }
}
