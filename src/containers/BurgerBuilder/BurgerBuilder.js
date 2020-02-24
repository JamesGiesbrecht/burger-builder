import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/'

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    updatePurchaseState() {
        const sum = Object.keys(this.props.ingredients)
            .map(igKey => {
                return this.props.ingredients[igKey]
            })
            //  Taking the value of each ingredient and adding it up
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        //  If sum is above 0 it goes to true
        return sum > 0
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        //  Modifying the array to indicate whether the ingredient has a value of 0 or less
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //  Conditionally rendering summary if loading
        let orderSummary
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

        //  Display burger after retriving from db
        if (this.props.ingredients) {
            burger = 
                <>
                    <Burger ingredients={this.props.ingredients}/>
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState()}
                            purchasing={this.purchaseHandler}/>
                </>
            orderSummary = 
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                />
        }
        if ( this.state.isLoading ) {
            orderSummary = <Spinner />
        }

        return (
            <>
                {/* The shouldComponentUpdate method will prevent OrderSummary rendering unnecessarily */}
                <Modal 
                    show={this.state.purchasing}
                    closeModal={this.purchaseCancelHandler}
                >
                    {orderSummary}                    
                </Modal>
                {burger}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onIngredientAdded: (type) => dispatch(actionTypes.addIngredient(type)),
        onIngredientRemoved: (type) => dispatch(actionTypes.removeIngredient(type))
    }
}

//  method built to take any errors we might recieve with axios and display them in a modal
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))