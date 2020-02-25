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
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expTime)
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
                //  Calculating the time that the token expires
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000)) // converting the expiration timer to one hour
            })
            .catch(error =>{
                console.log(error)
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout(expirationDate - new Date()))
            } else {
                dispatch(logout())
            }
        }
    }
}