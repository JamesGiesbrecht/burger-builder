import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    price: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const reducer = (state = initialState, action) => {
    let newCount
    let newIngredients
    let newPrice
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            newCount = state.ingredients[action.ingredient] + 1
            newIngredients = {...state.ingredients}
            newIngredients[action.ingredient] = newCount
            //  Adding the price of the ingredient to the total
            newPrice = state.price + INGREDIENT_PRICES[action.ingredient]
            return {
                ...state,
                ingredients: newIngredients,
                price: newPrice
            }
        case actionTypes.REMOVE_INGREDIENT:
            newCount = state.ingredients[action.ingredient] - 1
            if (newCount < 0) {
                return state
            }
            newIngredients = {...state.ingredients}
            newIngredients[action.ingredient] = newCount
            //  Subtracting the price of the ingredient to the total
            newPrice = state.price - INGREDIENT_PRICES[action.ingredient]
            return {
                ...state,
                ingredients: newIngredients,
                price: newPrice
            }
        //  After the api call is made this action is called
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                price: 4,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer