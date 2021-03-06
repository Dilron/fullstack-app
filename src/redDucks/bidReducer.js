

const initialState = {
    activeBid: false,
    bidTargetPost: {},
    bidToReview: {}
}

const DEACTIVATE_BID = 'DEACTIVATE_BID'
const ACTIVATE_BID = 'ACTIVATE_BID'
const PUSH_TO_BID = 'PUSH_TO_BID'
const PUSH_TO_REVIEW = 'PUSH_TO_REVIEW'
const RESET_REVIEW = 'RESET_REVIEW'
// const  = ''

export function activateBid(){
    return{
        type: ACTIVATE_BID,
        payload: true
    }
} 

export function deactivateBid(){
    return{
        type: DEACTIVATE_BID,
        payload: false
    }
}

export function pushToBid(postObj){
    return{
        type: PUSH_TO_BID,
        payload: postObj
    }
}

export function pushToReview(reviewObj){
    return {
        type: PUSH_TO_REVIEW,
        payload: reviewObj
    }
}

export function resetReview(){
    return {
        type: RESET_REVIEW,
        payload: {}
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case DEACTIVATE_BID:
            return {...state, activeBid: payload}
        case ACTIVATE_BID:
            return {...state, activeBid: payload}
        case PUSH_TO_BID:
            return {...state, bidTargetPost: {...payload}}
        case PUSH_TO_REVIEW:
            return {...state, bidToReview: {...payload}}
        case RESET_REVIEW:
            return {...state, bidToReview: {}}
        default:
            return state
    }
}