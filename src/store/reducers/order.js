import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    isLoading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject( state, {
        orders: state.orders.concat(newOrder), // concat updates the state immutability
        isLoading: false,
        purchased: true
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AJAX_START: return updateObject( state, {isLoading: true})
        case actionTypes.AJAX_FAIL: return updateObject( state, {isLoading: false})
        case actionTypes.PURCHASE_INIT: return updateObject( state, {purchased: false})
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject( state, {isLoading: false, orders: action.orders})
        default: return state
    }
}

export default reducer