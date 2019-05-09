

const initialState = {
    showLogin: false,
    showRegister: false,
    showProfileStub: false
}

const SHOW_LOGIN = 'SHOW_LOGIN'
const SHOW_REGISTER = 'SHOW_REGISTER'
const SHOW_PROFILE_STUB = 'SHOW_PROFILE_STUB'

export function showLogin(){
    return {
        type: SHOW_LOGIN,
        payload: {showLogin: true, showRegister: false, showProfileStub: false}
    }
}

export function showRegister(){
    return {
        type: SHOW_REGISTER,
        payload: {showRegister: true, showLogin: false, showProfileStub:false}
    }
}

export function showProfileStub(){
    return {
        type: SHOW_PROFILE_STUB,
        payload: {showProfileStub: true, showLogin: false, showRegister: false}
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SHOW_LOGIN:
            return {...payload}
        case SHOW_REGISTER:
            return {...payload}
        case SHOW_PROFILE_STUB:
            return {...payload}
        default:
            return state
    }
}