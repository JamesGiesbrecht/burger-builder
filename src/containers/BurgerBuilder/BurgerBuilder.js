import React, { useState, useEffect, useCallback } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import {  useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../store/actions/'

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch()
    
    const onInitIngredients = useCallback(() => dispatch(actionTypes.initIngredients()), [dispatch])
    const onIngredientAdded = (type) => dispatch(actionTypes.changeIngredient(type, true))
    const onIngredientRemoved = (type) => dispatch(actionTypes.changeIngredient(type, false))
    const onInitPurchase = () => dispatch(actionTypes.purchaseInit())
    const onSetRedirect = (path) => dispatch(actionTypes.setAuthRedirect(path))

    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const price = useSelector(state => state.burgerBuilder.price)
    const error = useSelector(state => state.burgerBuilder.error)
    const isLoggedIn = useSelector(state => state.auth.token !== null)

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }

    const purchaseHandler = () => {
        if (isLoggedIn) {
            setPurchasing(true)
        } else {
            onSetRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const updatePurchaseState = () => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            //  Taking the value of each ingredient and adding it up
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        //  If sum is above 0 it goes to true
        return sum > 0
    }

    const disabledInfo = {
        ...ingredients
    }
    //  Modifying the array to indicate whether the ingredient has a value of 0 or less
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    //  Conditionally rendering summary if loading
    let orderSummary
    let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />

    //  Display burger after retriving from db
    if (ingredients) {
        burger = 
            <>
                <Burger ingredients={ingredients}/>
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        price={price}
                        purchasable={updatePurchaseState()}
                        purchasing={purchaseHandler}
                        isLoggedIn={isLoggedIn}
                    />
            </>
        orderSummary = 
            <OrderSummary
                ingredients={ingredients}
                price={price}
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

//  method built to take any errors we might recieve with axios and display them in a modal
export default withErrorHandler(BurgerBuilder, axios)