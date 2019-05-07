import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))