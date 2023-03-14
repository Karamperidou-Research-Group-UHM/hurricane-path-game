/** Calculates the longitude and latitude given x, y coordinates. */
export const coordinatesToLatLong = (x, y) => {
  // Top Left Corner: (Long: 100, Lat: 60) -> (21, 90) and Bottom Left Corner: (Long: 120, Lat: -20) -> (21, 507).
  // Top Right Corner: (Long: -120, Lat: 60) -> (813, 90) and Bottom Right Corner: (Long: 120, Lat: -20) -> (813, 507).
  // Lat, Long width = 140, Coordinates width = 792.
  // Lat, Long height = 80, Coordinates height = 417.
  // Converts the longitude and latitude.
  let lon = x * 0.176 + 96.3;
  let lat = y * -0.19 + 77;
  if (lon > 180) {
    const difference = lon - 180;
    lon = 180 - difference;
    lon *= -1;
  }
  return { lon: Math.round(lon * 100) / 100, lat: Math.round(lat * 100) / 100 };
};

/** Calculates the x and y coordinates given longitude and latitude. */
export const latLongToCoordinates = (lon, lat) => {
  // Checks if longitude is negative.
  if (lon < 0) {
    // Adjusts longitude to be positive by adding the different of the absolute value on lon by 180 and adding 180.
    lon = (180 - Math.abs(lon)) + 180;
  }

  // Converts x and y from lon and lat.
  let x = ((lon - 96.3) / 0.176);
  let y = ((lat - 77) / -0.19);
  return { x: Math.floor(x), y: Math.floor(y) };
};
