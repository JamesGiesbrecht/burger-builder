import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AJAX_FAIL,
        error:error
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
                dispatch(authSuccess(response.data))
            })
            .catch(error =>{
                console.log(error)
                dispatch(authFail(error))
            })
    }
}