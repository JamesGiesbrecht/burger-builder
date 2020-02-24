import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject( state, {purchased: false})
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject( state, {isLoading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId})
            return updateObject( state, {
                orders: state.orders.concat(newOrder), // concat updates the state immutability
                isLoading: false,
                purchased: true
            })
        case actionTypes.PURCHASE_BURGER_FAIL:
            console.log(action.error)
            return updateObject( state, {isLoading: false})
        case actionTypes.FETCH_ORDERS_START:
            return updateObject( state, {isLoading: true})
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject( state, {
                isLoading: false,
                orders: action.orders
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            console.log(action.error)
            return updateObject( state, {isLoading: false})
        default:
            return state
    }
}

export default reducer