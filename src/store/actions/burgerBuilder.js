import * as actionTypes from './actionTypes'
import axios from '../../axios/axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    // can execute asynch code and dispatch a new action
    return dispatch => {
        axios.get('https://burger-builder-4d3f4.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}