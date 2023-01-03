/** Provides methods and properties to keep track of the path of a hurricane and moves the hurricane in that path. */
export default class HurricaneMovement {
  /** Creates a new HurricaneMovement instance. */
  constructor(hurricaneGameObject, initialTarget) {
    this.hurricaneGameObject = hurricaneGameObject;
    this.initialTarget = initialTarget;
    this.currentPointIndex = 0;
    this.points = [initialTarget];
  }

  /** Returns the array of points. */
  getPoints() {
    return this.points;
  }

  /** Adds a new target point to points. */
  addNewTarget(newTarget) {
    this.points.push(newTarget);
  }

  /** Moves the hurricane in the path given in points. */
  moveHurricane() {

  }
}
