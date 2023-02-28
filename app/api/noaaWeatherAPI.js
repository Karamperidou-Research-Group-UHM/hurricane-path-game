/** Gets 70 data points containing wind direction from API. */
export const getWindData = async (season) => {
  let startDate = '';
  let endDate = '';
  // Sets the start and end date based on the season.
  if (season === 'Spring') {
    startDate = '2022-03-01';
    endDate = '2022-05-31';
  } else if (season === 'Summer') {
    startDate = '2022-06-01';
    endDate = '2022-08-31';
  } else if (season === 'Fall') {
    startDate = '2022-09-01';
    endDate = '2022-11-30';
  } else {
    startDate = '2022-12-01';
    endDate = '2023-2-28';
  }
  const startLat = 50;
  const startLong = 120;
  const windData = [];

  // Longitude points.
  for (let i = 0; i < 10; i++) {
    let long = (i * 12) + startLong;

    // Checks if longitude is at 180 and needs to be decreased.
    if (i > 5) {
      long = -1 * (i * 12) + startLong;
    } else if (i === 5) {
      long -= 1;
    }
    // Latitude points.
    for (let j = 0; j < 7; j++) {
      const lat = -1 * (j * 13) + startLat;
      let allData = [];
      // Fetches stations in lat: 120E - 80W and log: 60N - 45S.
      await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`)
        .then(data => data.json())
        .then(dataJson => allData = dataJson)
        .then(() => windData.push({
          lat: lat,
          long: long,
          windDir: allData.current_weather.winddirection,
        }))
        .then(() => console.log(windData))
        .catch(error => console.log(error));
    }
  }
};

export const testAPI= () => {
  fetch('https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&stations=USC00457180,USC00390043,LLNR26950&startDate=2022-07-04&endDate=2022-07-23&format=json')
    .then(data => data.json())
    .then(dataJson => console.log(dataJson))
    .catch(error => console.log(`Error: ${error}`));
};
