/** Detects if a hurricane has been hit by a high pressure system object. */
export const hurricaneCollisionDetect = (colDetect, highPressureSys, hurricane, screenPressed) => {
  // Detects if a hurricane and high pressure system collide and add a new target point to the hurricane accordingly.
  if (colDetect.detectCollision(highPressureSys, hurricane, 'ellipse')) {
    // Checks where each object is relative to each other on the x axis when collided and adjusts their position accordingly.
    if (highPressureSys.x <= hurricane.x) {
      // Checks if the hurricane hit the high pressure system or if the high pressure system hit the hurricane.
      screenPressed ? hurricane.updateX(5) : hurricane.updateX(1);
    } else {
      screenPressed ? hurricane.updateX(-5) : hurricane.updateX(-1);
    }
    // Checks where each object is relative to each other on the y axis when collided and adjusts their position accordingly.
    if (highPressureSys.y <= hurricane.y) {
      screenPressed ? hurricane.updateY(5) : hurricane.updateY(1);
    } else {
      screenPressed ? hurricane.updateY(-5) : hurricane.updateY(-1);
    }
  }
};
