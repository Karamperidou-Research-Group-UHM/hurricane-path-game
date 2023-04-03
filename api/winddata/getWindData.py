import pandas as pd
import numpy as np
import xarray as xr

def get_mean_wind_data(season, wind_vector_component):
    '''Gets the mean wind data for the given wind vector component (u or v) and the given season.'''

    # Checks which wind vector was inputted and sets vector_component to the correct string.
    if (wind_vector_component == 'u'):
        vector_component = 'uwnd'
    else:
        vector_component = 'vwnd'

    # Default date.
    data_date = '2020-03-01'
    
    # Sets the correct date based on the season given.
    if (season == 'spring'):
        data_date = '2020-03-01'
    elif (season == 'summer'):
        data_date = '2020-06-01'
    elif (season == 'fall'):
        data_date = '2020-09-01'
    elif (season == 'winter'):
        data_date = '2020-12-01'
        
    # Opens the data set corresponding to the correct wind vector component given.
    ds = xr.open_dataset('winddata/data/{}.mon.ltm.1991-2020.nc'.format(vector_component), decode_times=True)
    df = ds.to_dataframe()
    
    # Flattens the multiindex.
    df = df.reset_index()
    
    # Filters out winds that are not in the 500 mb level. 
    wind_data = df[df['level'] == 500]
    
    # Drops unnecessary rows.
    wind_data = wind_data.drop(['level', 'time', 'nbnds', 'valid_yr_count'], axis=1)
    
    # Filters out all unnecessary latitude values.
    wind_data = wind_data[wind_data['lat'] < 60]
    wind_data = wind_data[wind_data['lat'] > -20]
    
    # Filters out all unncessary longitude values.
    wind_data = wind_data[wind_data['lon'] >= 120]
    wind_data = wind_data[wind_data['lon'] <= 240]
    
    # Gets the wind data from the correct season.
    season_wind = wind_data[wind_data['climatology_bounds'] == data_date]

    mean_winds = []
    lats = []
    lons = []

    # Adds the mean winds and lat and lon to the three arrays.
    def get_avg_winds(data):
        mean_winds.append(data[vector_component].mean())
        lats.append(data['lat'].mean())
        lons.append(data['lon'].mean())

    # Groups the data by lat and lon and calls get_avg_winds for each lat and lon group.
    season_wind.groupby(['lat', 'lon']).apply(lambda x: get_avg_winds(x))

    # Creates a new dataframe with the data.
    mean_wind_data_type = pd.DataFrame({'lat': lats, 'lon': lons, vector_component: mean_winds, 'season': season})
    
    correct_lon = [] 

    # Converts all longitude to correct values.
    for lon in mean_wind_data_type['lon']:

        if (lon > 180):
            converted_lon = -1 * (180 - (lon - 180))
        else:
            converted_lon = lon
        correct_lon.append(converted_lon)
    
    # Adds the correct longitude values as a column.
    mean_wind_data_type['correct-lon'] = correct_lon
    
    # Drops the old longitude column and renames the new one to lon.
    mean_wind_data_type = mean_wind_data_type.drop(['lon'], axis=1)
    mean_wind_data_type = mean_wind_data_type.rename(columns={'correct-lon': 'lon'})
    
    # Reorders columns.
    mean_wind_data_type = mean_wind_data_type.reindex(columns=['lat', 'lon', vector_component, 'season'])

    return mean_wind_data_type


def get_wind_direction_data(season):
    '''Calculates the wind direction from the u and v wind vectors given at each lat and longitude point 
       and returns a json object of of the lat, lon, and wind direction.'''
    
    # Gets the u and v wind vectors for the given season.
    u_wind_data = get_mean_wind_data(season, 'u')
    v_wind_data = get_mean_wind_data(season, 'v')
    
    data_json = []
    lats = np.array(u_wind_data['lat'])
    lons = np.array(u_wind_data['lon'])
    u_winds = np.array(u_wind_data['uwnd'])
    v_winds = np.array(v_wind_data['vwnd'])
    
    # Creates an array of dictionaries which include lat, lon, and uwnd.
    for i in range(len(lats)):
        # Checks if longitude is divisible by 10.
        if (lons[i] % 10 == 0):
            # Computes the angle of the wind based on the coordindate from the u and v wind vectors.
            wind_direction = np.arctan2(v_winds[i], u_winds[i])
            
            # Creates a dictionary with fields, lat, lon, and windir.
            data_dict = {
                'lat': lats[i],
                'lon': lons[i],
                'windir': wind_direction
            }
            
            data_json.append(data_dict)
        
    return data_json