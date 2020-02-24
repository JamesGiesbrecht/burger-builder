import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {