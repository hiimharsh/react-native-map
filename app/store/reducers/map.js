import _ from 'lodash'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
    mapLoc: {}
}

export default function (
    state = initialState, action
) {
    switch (action.type) {
        case 'UPDATE_MAP_LOCATION':
            return {
                mapLoc: action.mapLocation
            }
        default:
            return state
    }
}