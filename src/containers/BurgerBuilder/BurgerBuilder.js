import React, { useState, useEffect } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/'

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false)

    const { onInitIngredients } = props

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }

    const purchaseHandler = () => {
        if (props.isLoggedIn) {
            setPurchasing(true)
        } else {
            props.onSetRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const updatePurchaseState = () => {
        const sum = Object.keys(props.ingredients)
            .map(igKey => {
                return props.ingredients[igKey]
            })
            //  Taking the value of each ingredient and adding it up
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        //  If sum is above 0 it goes to true
        return sum > 0
    }

    const disabledInfo = {
        ...props.ingredients
    }
    //  Modifying the array to indicate whether the ingredient has a value of 0 or less
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    //  Conditionally rendering summary if loading
    let orderSummary
    let burger = props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

    //  Display burger after retriving from db
    if (props.ingredients) {
        burger = 
            <>
                <Burger ingredients={props.ingredients}/>
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={props.price}
                        purchasable={updatePurchaseState()}
                        purchasing={purchaseHandler}
                        isLoggedIn={props.isLoggedIn}
                    />
            </>
        orderSummary = 
            <OrderSummary
                ingredients={props.ingredients}
                price={props.price}
                cancel={purchaseCancelHandler}
                continue={purchaseContinueHandler}
            />
    }
    if ( props.isLoading ) {
        orderSummary = <Spinner />
    }

    return (
        <>
            <Modal 
                show={purchasing}
                closeModal={purchaseCancelHandler}
            >
                {orderSummary}                    
            </Modal>
            {burger}
        </>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isLoggedIn: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onIngredientAdded: (type) => dispatch(actionTypes.changeIngredient(type, true)),
        onIngredientRemoved: (type) => dispatch(actionTypes.changeIngredient(type, false)),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onSetRedirect: (path) => dispatch(actionTypes.setAuthRedirect(path))
    }
}

//  method built to take any errors we might recieve with axios and display them in a modal
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))