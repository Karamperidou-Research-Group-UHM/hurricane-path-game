/** Gets the wind direction data for each lat and lon for the given season from the api. */
export const getWindData = async (season) => {
  let allData = [];
  await fetch(`http://0.0.0.0:8000/winddata/${season}`)
    .then(data => data.json())
    .then(dataJson => allData = dataJson)
    .then(() => console.log(allData))
    .catch(error => console.log(error));
}

/** Gets the sst data for each lat and lon for the given season from the api. */
export const getSSTData = async (season) => {
  let allData = [];
  await fetch(`http://0.0.0.0:8000/sstdata/${season}`)
    .then(data => data.json())
    .then(dataJson => allData = dataJson)
    .then(() => console.log(allData))
    .catch(error => console.log(error));
}
