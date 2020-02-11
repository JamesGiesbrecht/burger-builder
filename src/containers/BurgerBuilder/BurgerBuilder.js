import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios/axios-orders'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1
        const newIngredients = {...this.state.ingredients}
        newIngredients[type] = newCount
        //  Adding the price of the ingredient to the total
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ ingredients: newIngredients, totalPrice: newPrice})
        this.updatePurchaseState(newIngredients)
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
        this.setState({ ingredients: newIngredients, totalPrice: newPrice })
        this.updatePurchaseState(newIngredients)
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({isLoading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'James Giesbrecht',
                address: {
                    street: 'Centre St',
                    postalCode: 'R0G 1E0',
                    country: 'Canada'
                },
                email: 'james@jamesgiesbrecht.ca'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false, purchasing: false})
            })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            //  Taking the value of each ingredient and adding it up
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        //  If sum is above 0 it goes to true
        this.setState( {purchasable: sum > 0 })
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        //  Modifying the array to indicate whether the ingredient has a value of 0 or less
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //  Conditionally rendering summary if loading
        const orderSummary = (this.state.isLoading ?
            <Spinner /> :
            <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
            />)

        return (
            <>
                {/* The shouldComponentUpdate method will prevent OrderSummary rendering unnecessarily */}
                <Modal 
                    show={this.state.purchasing}
                    closeModal={this.purchaseCancelHandler}
                >
                    {orderSummary}                    
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                />
            </>
        )
    }
}

export default BurgerBuilder