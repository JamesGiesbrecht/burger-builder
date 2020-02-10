import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1
        const newIngredients = {...this.state.ingredients}
        newIngredients[type] = newCount
        //  Adding the price of the ingredient to the total
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ ingredients: newIngredients, totalPrice: newPrice})
    }
    
    removeIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] - 1
        if (newCount < 0) {
            return
        }
        const newIngredients = {...this.state.ingredients}
        newIngredients[type] = newCount
        //  Subtracting the price of the ingredient to the total
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({ ingredients: newIngredients, totalPrice: newPrice})
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        //  Modifying the array to indicate whether the ingredient has a value of 0 or less
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </>
        )
    }
}

export default BurgerBuilder