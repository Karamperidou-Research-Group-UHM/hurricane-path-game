import pandas as pd
import numpy as np
import xarray as xr

import pandas as pd
import numpy as np
import xarray as xr

def getSSTData(season):
    ''' Gets the SST data for latitude points: 60 to -60 and longitude points: 100 to -160 for a 
        specific season by reading from one of the NOAA datasets.'''
    
    if season.lower() == 'summer':
        season = 'JJA'
    elif season.lower() == 'fall':
        season = 'SON'
    elif season.lower() == 'winter':
        season = 'DJF'
    elif season.lower() == 'spring':
        season = 'MAM'
    else:
        season = 'JJA'
        
    # Opens the data set.
    url = "sstdata/data/sst.mnmean.nc"
    dataset = xr.open_dataset(url,decode_times=False) 
    
    # Removes unnecessary dimensions.
    dataset = dataset.drop_dims('nbnds').copy()
    
    # Creates a time range for the time series from 1854 to the year at the end of the dataset by months.
    timerange = pd.date_range('1981-01', freq='MS', periods=len(dataset.time)) 
    
    # Sets the time coordinate in dataset to the timerange.
    dataset.coords['time'] = timerange
    
    # Selects the SST variable from the dataset and loads it from the remote source.
    sst = dataset.sst
    sst = sst.load()
    
    # Groups the data by season and gets the mean sst across those months in the season.
    sst_seasonal_means = sst.groupby('time.season').mean()
        
    # Gets the mean sst between 1854 and 2023 for the season from longitudes 120 - 240 and latitudes 60 - -60.
    sst_mean = sst_seasonal_means.sel(lon=slice(100, 260), lat=slice(80, -60), season=season)
    # Converts dataset to dataframe and drops NA values.
    sst_mean_df = sst_mean.to_dataframe()
    sst_mean_df = sst_mean_df.dropna()
    # Flattens the multiindex.
    sst_mean_df = sst_mean_df.reset_index()
    
    # Drops the season column.
    sst_mean_df = sst_mean_df.drop('season', axis=1)
    
    correct_lon = [] 

    # Converts all longitude to correct values.
    for lon in sst_mean_df['lon']:

        if (lon > 180):
            converted_lon = -1 * (180 - (lon - 180))
        else:
            converted_lon = lon
        correct_lon.append(converted_lon)
        
    # Creates correct longitude column in sst_mean_df.
    sst_mean_df['correct-lon'] = correct_lon
    
    # Drops original longitude column and replaces it with the correct-lon column.
    sst_mean_df = sst_mean_df.drop('lon', axis=1)
    sst_mean_df.rename(columns = {'correct-lon':'lon'}, inplace=True)
    
    data_json = []
    lats = np.array(sst_mean_df['lat'])
    lons = np.array(sst_mean_df['lon'])
    sst = np.array(sst_mean_df['sst'])

    # Creates an array of dictionaries which include lat, lon, and sst.
    for i in range(len(lats)):
        data_dict = {
            'lat': lats[i],
            'lon': lons[i],
            # Converts sst to farenheight.
            'sst': (9 / 5) * sst[i] + 32
        }
        
        data_json.append(data_dict)
    
    return data_json