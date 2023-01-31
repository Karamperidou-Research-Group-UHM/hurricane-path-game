/** Calculates the wind arrows wind direction based on the angle between the x axis and the wind arrow relative to the pressure system's center. */
export const windArrowCalculator = (pressureSystem, windArrow) => {
  const relativeAngle = Math.atan2(pressureSystem.y - windArrow.y, pressureSystem.x - windArrow.x) * (180 / Math.PI);
  // Gets the wind direction based on relativeAngle.
  const windDirection = relativeAngle - 270;
  // Rotates the wind arrow.
  windArrow.rotate(windDirection);
};
