import * as actionTypes from './actionTypes'
import axios from '../../axios/axios-orders'

export const changeIngredient = (name, isPlus) => {
    return {
        type: actionTypes.CHANGE_INGREDIENT,
        ingredient: name,
        isPlus: isPlus
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