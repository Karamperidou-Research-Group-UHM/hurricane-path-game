/** Calculates the wind arrows wind direction based on the angle between the x axis and the wind arrow relative to the pressure system's center. */
export const windArrowCalculator = (pressureSystem, windArrow) => {
  // Gets the square distance between the pressure system and the arrow.
  const squareDistance = ((pressureSystem.x - windArrow.x) * (pressureSystem.x - windArrow.x)) + ((pressureSystem.y - windArrow.y) * (pressureSystem.y - windArrow.y));
  const distance = Math.sqrt(squareDistance);
  const xDifference = windArrow.x - pressureSystem.x;
  const xDistance = pressureSystem.x + xDifference;

  const relativeAngle = Math.acos(xDistance / distance) * (180 / Math.PI);
  const windDirection = 270 - relativeAngle;

  windArrow.rotate(windDirection);
};
