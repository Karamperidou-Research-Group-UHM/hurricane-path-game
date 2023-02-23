export const getWindData = async () => {
  const startLat = 47.570040;
  const endLat = -30.942280;
  const startLong = -233.551298;
  const endLong = -85.389005;
  const windData = [];
  let stopFetching = false;

  if (!stopFetching) {
    // Loops through all possible lat, long points and fetches wind direction for each.
    for (let i = startLong; i < endLong; i += 15) {
      for (let j = startLat; j > endLat; j -= 9) {
        let allData = [];
        // Fetches stations in lat: 120E - 80W and log: 60N - 45S.
        await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${j}, ${i})?key=S4ACFTTPZ8Q7XTJW55N7NCJNA`)
          .then(data => data.json())
          .then((dataJson) => allData = dataJson)
          .then(() => windData.push({
            lat: j,
            long: i,
            windDir: allData.currentConditions.winddir,
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
