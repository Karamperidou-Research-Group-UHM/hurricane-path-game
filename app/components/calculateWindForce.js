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
}
