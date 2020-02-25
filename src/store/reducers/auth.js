import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        isLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START:    return updateObject(state, {error: null, isLoading: true})
        case actionTypes.AUTH_SUCCESS:  return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:     return updateObject(state, {error: action.error, isLoading: false})
        case actionTypes.AUTH_LOGOUT:   return updateObject(state, {token: null, userId: null})
        default:                        return state
    }
}

export default reducer