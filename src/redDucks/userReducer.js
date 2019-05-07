

const initialState = {
    userId: null,
    username: null,
    firstname: null,
    lastname: null,
    profileRef: null
}

const UPDATE_USER_ID = 'UPDATE_USER_ID'
const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'
const LOGOUT_USER = 'LOGOUT_USER'
// const  = ''

export function updateUserId(id){
    return {
        type: UPDATE_USER_ID,
        payload: id
    }
}

export function updateUserName(username){
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updateUserDetails(obj){
    return {
        type: UPDATE_USER_DETAILS,
        payload: obj
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: {
            userId: null,
            username: null,
            firstname: null,
            lastname: null,
            profileRef: null
        }
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch (type) {
        case UPDATE_USERNAME:
            return {...state, username: payload}
        case UPDATE_USER_ID:
            return {...state, userId: payload}
        case UPDATE_USER_DETAILS:
            let {firstname, lastname, profileRef} = payload
            return {...state, firstname, lastname, profileRef}
        case LOGOUT_USER:
            return {...payload}
        default:
            return state
    }
}