/** Provides methods for collisions between objects and an object and a canvas. */
export default class CollisionDetection {
  /** Detects a collision between two objects and return true if they have collided. */
  detectCollision(obj1, obj2) {
    /** TODO */
  }

  /** Detects a collision between an object and the canvas in a gameArea. Returns where the obj is out of bounds. */
  detectCollisionCanvas(obj, gameArea, objType) {
    const canvas = gameArea.canvas;

    // Checks if the object is an ellipse and returns where the obj is out of bounds.
    if (objType === 'ellipse') {
      if (obj.x - obj.width <= 0) {
        return 'left';
      } else if (obj.x + obj.width >= canvas.width) {
        return 'right';
      }
      if (obj.y - obj.height <= 0) {
        return 'top';
      } else if (obj.y + obj.height >= canvas.height) {
        return 'bottom';
      }
    } else {
      if (obj.x <= 0) {
        return 'left';
      } else if (obj.x + obj.width >= canvas.width) {
        return 'right';
      }
      if (obj.y <= 0) {
        return 'top';
      } else if (obj.y + obj.height >= canvas.height) {
        return 'bottom';
      }
    }
    return '';
  }
}
