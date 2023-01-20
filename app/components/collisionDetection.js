/** Provides methods for collisions between objects and an object and a canvas. */
export default class CollisionDetection {
  /** Detects a collision between two objects and return true if they have collided. */
  detectCollision(obj1, obj2, objType) {
    if (objType === 'ellipse') {
      // Gets the square distance between the centers of both circles.
      const squareDistance = ((obj1.x - obj2.x) * (obj1.x - obj2.x)) + ((obj1.y - obj2.y) * (obj1.y - obj2.y));
      // Returns true if the square distance between the circles is less than or equal to the sum of their radii.
      return squareDistance <= (obj1.width + obj2.width) * (obj1.width + obj2.width);
    }
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

  /** Detects the boundaries for a pressure object. */
  detectBoundary(xBoundary, yBoundary, obj) {
    // Checks for x boundaries.
    if (obj.x - obj.width <= xBoundary.min) {
      return 'left';
    } else if (obj.x + obj.width >= xBoundary.max) {
      return 'right';
    }
    // Checks for y boundaries.
    if (obj.y - obj.height <= yBoundary.min) {
      return 'top';
    } else if (obj.y + obj.height >= yBoundary.max) {
      return 'bottom';
    }
  }
}
