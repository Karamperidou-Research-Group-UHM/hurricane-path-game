export default class TestData {
  /** Creates test data for heat map. */
  heatMapTestData(coordinates) {
    for (let i = 0; i < 825; i++) {
      for (let j = 0; j < 526; j++) {
        let randomTemp = Math.floor(Math.random() * (((j / 2) + 10) - ((j / 2) - 10)) + (j / 2) - 10);
        // Reduces temperature is heat point is past 260 in the y-axis.
        if (j > 260) {
          randomTemp -= (j - 261);
        }
        // Keeps temp to 134 if its over.
        if (randomTemp > 134) {
          randomTemp = 134;
        }
        coordinates.push({x: i, y: j, temp: randomTemp});
      }
    }
  }

  /** Creates test data for wind arrows. */
  windTestData(windData) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 7; j++) {
        if (j < 4) {
          windData.push({x: (80 * i) + 10, y: (70 * j) + 20, windDir: 140 + Math.pow(2, j)});
        } else {
          windData.push({x: (80 * i) + 50, y: (70 * j) + 20, windDir: -10 - (0.5 * Math.pow(2, j))});
        }
      }
    }
  }
}


