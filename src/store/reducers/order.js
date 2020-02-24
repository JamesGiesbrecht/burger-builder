import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder), // concat updates the state immutability
                isLoading: false,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            console.log(action.error)
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer