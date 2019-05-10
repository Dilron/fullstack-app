import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import navReducer from './navReducer'
import bidReducer from './bidReducer'

const rootReducer = combineReducers({
    bid: bidReducer,
    user: userReducer,
    nav: navReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))