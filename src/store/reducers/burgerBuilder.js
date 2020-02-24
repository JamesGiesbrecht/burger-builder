import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

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
    switch(action.type) {
        case actionTypes.CHANGE_INGREDIENT:
            const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + (action.isPlus? 1 : -1) }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                price: state.price + (action.isPlus? INGREDIENT_PRICES[action.ingredient] : -INGREDIENT_PRICES[action.ingredient]) 
            }
            return updateObject(state, updatedState)
        //  After the api call is made this action is called
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                price: 4,
                error: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer