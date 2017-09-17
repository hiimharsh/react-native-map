import _ from 'lodash'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
    mapLoc: {}
}

export default function (
    state = initialState, action
) {
    switch (action.type) {
        case 'update':
            return {
                mapLoc: action.mapLocation
            }
        default:
            return state
    }
}