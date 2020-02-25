import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expTime * 1000) // converting the expiration timer to one hour
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        const apiKey = 'AIzaSyDXQ6WV1c-RXafuZzsyVI5dkbE9W5oqmTk'
        const url = isSignUp ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
            :
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        
            axios.post(url + apiKey, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error =>{
                console.log(error)
                dispatch(authFail(error.response.data.error))
            })
    }
}