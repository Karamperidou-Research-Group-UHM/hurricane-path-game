/** Calculates the wind arrows wind direction based on the angle between the x axis and the wind arrow relative to the pressure system's center. */
export const windArrowCalculator = (pressureSystem, windArrow) => {
  // Gets the angle between the wind arrow and the x-axis with the center of the pressure system being the origin.
  const relativeAngle = Math.atan2(pressureSystem.y - windArrow.y, pressureSystem.x - windArrow.x) * (180 / Math.PI);

  // Checks pressure system type.
  if (pressureSystem.pressureType === 'high') {
    // Gets the wind direction based on relativeAngle.
    const windDirection = relativeAngle - 270;
    // Rotates the wind arrow.
    // windArrow.rotate(windDirection);
    return windDirection;
  } else {
    // Gets the wind direction based on relativeAngle.
    const windDirection = relativeAngle - 90;
    // Rotates the wind arrow.
    // windArrow.rotate(windDirection);
    return windDirection;
  }
};

/** Calculates the distance between the windArrow and pressureSystem given. */
export const distanceFromPressureSystem = (pressureSystem, windArrow) => {
  return (((pressureSystem.x - windArrow.x) * (pressureSystem.x - windArrow.x)) + ((pressureSystem.y - windArrow.y) * (pressureSystem.y - windArrow.y)));
};
