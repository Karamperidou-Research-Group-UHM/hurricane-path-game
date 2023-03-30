/** Gets the wind direction data for each lat and lon for the given season from the api. */
export const getWindData = async (season) => {
  // Returns the data as a promise.
  return await fetch(`http://0.0.0.0:8000/winddata/${season}`)
    .then(data => data.json())
    .catch(error => console.log(error));
}

/** Gets the sst data for each lat and lon for the given season from the api. */
export const getSSTData = async (season) => {
  // Returns the data as a promise.
  return await fetch(`http://0.0.0.0:8000/sstdata/${season}`)
    .then(data => data.json())
    .catch(error => console.log(error));
}
