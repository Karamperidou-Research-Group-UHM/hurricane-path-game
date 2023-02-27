export const getWindData = async () => {
  const startLat = 50;
  const endLat = -40;
  const startLong = -120;
  const endLong = 120;
  const windData = [];
  let stopFetching = false;

  if (!stopFetching) {
    // Loops through all possible lat, long points and fetches wind direction for each.
    for (let i = startLong; i < endLong; i += 15) {
      for (let j = startLat; j > endLat; j -= 9) {
        let allData = [];
        // Fetches stations in lat: 120E - 80W and log: 60N - 45S.
        await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${j}&longitude=${i}&current_weather=true`)
          .then(data => data.json())
          .then(dataJson => allData = dataJson)
          .then(() => windData.push({
            lat: j,
            long: i,
            windDir: allData.current_weather.winddirection,
          }))
          .then(() => console.log(windData))
          .catch(error => console.log(error));


        if (windData.length >= 70) {
          stopFetching = true;
          break;
        }
      }
    }
  }
};

export const testAPI= () => {
  fetch('https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&stations=USC00457180,USC00390043,LLNR26950&startDate=2022-07-04&endDate=2022-07-23&format=json')
    .then(data => data.json())
    .then(dataJson => console.log(dataJson))
    .catch(error => console.log(`Error: ${error}`));
};
