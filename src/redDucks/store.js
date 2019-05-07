import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import navReducer from './navReducer'

const rootReducer = combineReducers({
    user: userReducer,
    nav: navReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))