import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.order.id
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder), // concat updates the state immutability
                isLoading: false
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer