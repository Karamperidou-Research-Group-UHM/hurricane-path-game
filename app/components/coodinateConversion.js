export const coordinatesToLatLong = (x, y) => {
  // Top Left Corner: (Long: 120, Lat: 40) -> (102, 96) and Bottom Left Corner: (Long: 120, Lat: -40) -> (102, 476).
  // Top Right Corner: (Long: -120, Lat: 40) -> (722, 96) and Bottom Right Corner: (Long: 120, Lat: -40) -> (722, 476).
  // Lat, Long width = 120, Coordinates width = 620.
  // Lat, Long height = 80, Coordinates height = 380.
  // Map Width = 825, Map Height = 759
  const mapWidth = 825;
  const mapHeight = 759;

  let lon = x * 0.19 + 102;
  const lat = y * 1.63 + 96;
  if (lon > 180) {
    const difference = lon - 180;
    lon = 180 - difference;
    lon *= -1;
  }
  // const y =  (mapHeight / 180.0) * (90 - lat);
  console.log(lon);
};
