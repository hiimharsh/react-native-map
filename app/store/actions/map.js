import { AsyncStorage } from 'react-native'

export const updateMapLocation = (mapLocation) => {
    AsyncStorage.setItem('mapLocation', JSON.stringify(mapLocation), () => {});

    return {
        type: 'UPDATE_MAP_LOCATION',
        mapLocation
    }
}