/** Provides methods and properties to keep track of the path of a hurricane and moves the hurricane in that path. */
export default class HurricaneMovement {
  /** Creates a new HurricaneMovement instance. */
  constructor(hurricaneGameObject, initialTarget) {
    this.hurricaneGameObject = hurricaneGameObject;
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
    // Checks if the index is less than the points array.
    if (this.currentPointIndex < this.points.length) {
      // Moves hurricane to the coordinates at index.
      const isAtPoint = this.hurricaneGameObject.move(this.points[this.currentPointIndex]);
      // Moves to the next index in the array if the hurricane is at the last point.
      if (isAtPoint) {
        this.currentPointIndex++;
      }
    }
  }
}
