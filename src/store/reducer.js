import * as actionTypes from './actions'

const initialState = {
    ingredients: null,
    price: 4,
    purchaseable: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {}
        case actionTypes.REMOVE_INGREDIENT:
            return {}
        default:
            return state
    }
}

export default reducer