import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

import { persistStore, autoRehydrate} from 'redux-persist'
import { AsyncStorage } from 'react-native'

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
)

persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['mapLocation']
})

export default store