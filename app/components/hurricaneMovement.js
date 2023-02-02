/** Provides methods and properties to keep track of the current target point of the hurricane and moves it to that point. */
export default class HurricaneMovement {
  /** Creates a new HurricaneMovement instance. */
  constructor(hurricaneGameObject, initialTarget) {
    this.hurricaneGameObject = hurricaneGameObject;
    this.currentPoint = initialTarget;
  }

  /** Returns the current point. */
  getPoints() {
    return this.currentPoint;
  }

  /** Adds a new target point. */
  addNewTarget(newTarget) {
    this.currentPoint = newTarget;
  }

  /** Moves the hurricane to the current point. Changes direction immediately when a new target is added. */
  moveHurricane(gameStart) {
    if (gameStart) {
      // Moves hurricane to the current point,
      this.hurricaneGameObject.move(this.currentPoint);
    }
  }
}
