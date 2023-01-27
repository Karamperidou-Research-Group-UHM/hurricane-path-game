export default class TestData {
  /** Creates test data for heat map. */
  heatMapTestData(coordinates) {
    for (let i = 0; i < 825; i++) {
      for (let j = 0; j < 526; j++) {
        const randomTemp = Math.floor(Math.random() * (j - 128));
        coordinates.push({x: i, y: j, temp: randomTemp});
      }
    }
  }

  /** Creates test data for wind arrows. */
  windTestData(windData) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 7; j++) {
        windData.push({x: (100 * i) + 30, y: (100 * j) + 50, windDir: Math.floor(Math.random() * (0 - 360))});
      }
    }
  }
}


