import * as actionTypes from './actions'
import axios from 'axios'

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    price: 4,
    purchaseable: false
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
        case actionTypes.INITIALIZE_INGREDIENTS:
            axios.get('https://burger-builder-4d3f4.firebaseio.com/ingredients.json')
                .then(response => {
                    console.log(response.data)
                    return {
                        ...state,
                        ingredients: response.data
                    }
                })
                .catch(error => {
                    // this.setState({error: true})
                })
            break
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
            newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            return {
                ...state,
                ingredients: newIngredients,
                price: newPrice
            }
        default:
            return state
    }
}

export default reducer