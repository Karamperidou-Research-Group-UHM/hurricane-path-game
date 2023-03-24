import pandas as pd
import numpy as np
import xarray as xr

def getSSTData(season):
    # Opens the data set.
    ds = xr.open_dataset('data/{}.nc'.format(season), decode_times=False)
    df = ds.to_dataframe()
    
    # Flattens the multiindex.
    df_single_index = df.reset_index()
    
    # Drops unnecessary rows.
    sst_data = df_single_index.drop(['lev', 'time', 'ssta'], axis=1)
    # Drops NaN values.
    sst_data = sst_data.dropna()
    
    # Creates farenheight sst row.
    farenheight = (9 * sst_data['sst'] / 5 + 32)
    sst_data['sst-f'] = farenheight
    
    # Filters out all unnecessary latitude values.
    pacific_data = sst_data[sst_data['lat'] < 80]
    pacific_data = pacific_data[pacific_data['lat'] > -60]
    
    # Filters out all unnecessary longitude values.
    all_pacific_data = pacific_data[pacific_data['lon'] >= 120]
    all_pacific_data = all_pacific_data[all_pacific_data['lon'] <= 240]
    
    
    correct_lon = [] 

    # Converts all longitude to correct values.
    for lon in all_pacific_data['lon']:
        # Checks if longitude is over 180.
        if (lon > 180):
            converted_lon = -1 * (180 - (lon - 180))
        else:
            converted_lon = lon
        correct_lon.append(converted_lon)
        
    # Creates correct longitude column in all_pacific data.
    all_pacific_data['correct-lon'] = correct_lon
    
    # Drops obsolete columns.
    all_pacific_data = all_pacific_data.drop(['lon', 'sst'], axis=1)
    all_pacific_data.rename(columns = {'correct-lon':'lon', 'sst-f':'sst'}, inplace=True)
    
    # Rearranges the columns.
    all_pacific_data = all_pacific_data.reindex(columns=['lat', 'lon', 'sst'])
    
    data_json = []
    lats = np.array(all_pacific_data['lat'])
    lons = np.array(all_pacific_data['lon'])
    sst = np.array(all_pacific_data['sst'])

    # Creates an array of dictionaries which include lat, lon, and sst.
    for i in range(len(lats)):
        data_dict = {
            'lat': lats[i],
            'lon': lons[i],
            'sst': sst[i]
        }
        
        data_json.append(data_dict)

    # Returns the json array.
    return data_json 