import pandas as pd
import numpy as np
import xarray as xr

def get_wind_vector_data(season, wind_vector):
    '''Gets the mean wind data for the given wind vector component (uwnd or vwnd) and the given season.'''
    # Opens the netcdf file for the correct wind vector data and stores it as a dataset.
    url = 'winddata/data/{}.mon.ltm.1991-2020.nc'.format(wind_vector.lower())
    dataset = xr.open_dataset(url, decode_times=False)
    
    # Gets the wind variable of the dataset.
    wind_data = dataset[wind_vector.lower()]
    
    # Gets the correct latitude and longitude.
    wind_data = wind_data.sel(lon=slice(100, 260), lat=slice(60, -40))
    
    wind_data_seasonal_mean = []
    
    # Selects the correct months of the season for the data and takes the mean uwnd for the season.
    if season.lower() == 'spring':
        wind_data_seasonal_mean = wind_data[2:5].mean('time')
    elif season.lower() == 'summer':
        wind_data_seasonal_mean = wind_data[5:8].mean('time')
    elif season.lower() == 'fall':
        wind_data_seasonal_mean = wind_data[8:11].mean('time')
    elif season.lower() == 'winter':
        wind_data_seasonal_mean = wind_data[[11, 0, 1]].mean('time')
        
        
    # Convertes to dataframe and flattens the multiindex.
    wind_dataframe = wind_data_seasonal_mean.to_dataframe()
    wind_dataframe = wind_dataframe.reset_index()
    
    # Gets the correct level range.
    wind_dataframe = wind_dataframe[(wind_dataframe['level'] >= 300) & (wind_dataframe['level'] <= 700)]
    
    # Groups by lat and lon and takes the mean of the uwnd and level.
    wind_dataframe_means = wind_dataframe.groupby(['lon','lat']).mean()
    # Flattens the multiindex.
    wind_dataframe_means = wind_dataframe_means.reset_index()
    
    correct_lon = [] 

    # Converts all longitude to correct values.
    for lon in wind_dataframe_means['lon']:
        if (lon > 180):
            converted_lon = -1 * (180 - (lon - 180))
        else:
            converted_lon = lon
        correct_lon.append(converted_lon)
        
    # Adds a correct longitude column to the dataframe.
    wind_dataframe_means['correct-lon'] = correct_lon
    # Drops the original longitude and level columns.
    wind_dataframe_means = wind_dataframe_means.drop(['lon', 'level'], axis=1)
    # Renames the correct lon column to lon.
    wind_dataframe_means = wind_dataframe_means.rename(columns={'correct-lon': 'lon'})
    # Rearranges the columns.
    wind_dataframe_means = wind_dataframe_means.reindex(columns=['lat', 'lon', wind_vector.lower()])
    
    return wind_dataframe_means


def get_wind_direction_data(season):
    '''Calculates the wind direction from the u and v wind vectors given at each lat and longitude point 
       and returns a json object of of the lat, lon, and wind direction.'''
    # Gets the u and v wind vectors for the given season.
    u_wind_data = get_wind_vector_data(season, 'uwnd')
    v_wind_data = get_wind_vector_data(season, 'vwnd')
    
    data_json = []
    lats = np.array(u_wind_data['lat'])
    lons = np.array(u_wind_data['lon'])
    u_winds = np.array(u_wind_data['uwnd'])
    v_winds = np.array(v_wind_data['vwnd'])
    
    # Creates an array of dictionaries which include lat, lon, and uwnd.
    for i in range(len(lats)):

        if lons[i] % 10 == 0 and lats[i] % 5 == 0:
            # Computes the angle of the wind based on the coordindate from the u and v wind vectors.
            wind_direction = np.arctan2(v_winds[i], u_winds[i])
            
            data_dict = {
                'lat': lats[i],
                'lon': lons[i],
                'windir': wind_direction
            }
            
            data_json.append(data_dict)
        
    return data_json