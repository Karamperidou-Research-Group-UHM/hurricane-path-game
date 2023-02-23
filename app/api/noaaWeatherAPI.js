export const getStation = async () => {
  // Fetches stations in lat: 120E - 80W and log: 60N - 45S.
  await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/(120E, 80W)?key=S4ACFTTPZ8Q7XTJW55N7NCJNA')
    .then(data => data.json())
    .then((dataJson) => console.log(dataJson))
    .catch(error => console.log(error));
};
