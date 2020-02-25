import * as actionTypes from './actionTypes'
import axios from '../../axios/axios-orders'

export const ajaxStart = () => {
    return {
        type: actionTypes.AJAX_START
    }
}

export const ajaxFail = (error) => {
    return {
        type: actionTypes.AJAX_FAIL,
        error: error
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(ajaxStart()) // Sets loading to true
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(ajaxFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(ajaxStart())
        axios.get('/orders.json?auth=' + token)
            .then(response => {
                const fetchedOrders = []
                for (let key in response.data) {
                    //  Taking each order (with the randomly generated key) and spreading its properties into a new object
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(ajaxFail(error))
            })
    }
}