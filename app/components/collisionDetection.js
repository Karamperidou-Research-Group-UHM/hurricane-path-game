export default class CollisionDetection {
  detectCollison(obj1, obj2) {
    /** TODO */
  }

  detectCollisonCanvas(obj, gameArea, objType) {
    const canvas = gameArea.canvas;

    if (objType === 'ellipse') {
      if (obj.x - obj.width <= 0 || obj.x + obj.width >= canvas.width) {
        return 1;
      }
      if (obj.y - obj.height <= 0 || obj.y + obj.height >= canvas.height) {
        return 2;
      }
    } else {
      if (obj.x <= 0 || obj.x + obj.width >= canvas.width) {
        return 1;
      }
      if (obj.y <= 0 || obj.y + obj.height >= canvas.height) {
        return 2;
      }
    }
    return -1;
  }
}
