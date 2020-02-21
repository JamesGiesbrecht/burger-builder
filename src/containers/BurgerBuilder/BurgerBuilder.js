import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,

        //  Following 3 are more local UI state
        purchasing: false,
        isLoading: false,
        error: false
    }

    componentDidMount() {
        // this.props.initializeIngredients()
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const burgerParams = []
        for (let i in this.state.ingredients) {
            //  encodeURIComponent isnt neccassary since these are simple components
            burgerParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        burgerParams.push('totalPrice=' + encodeURIComponent(this.state.totalPrice))

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + burgerParams.join('&')
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
            ...this.props.ingredients
        }
        //  Modifying the array to indicate whether the ingredient has a value of 0 or less
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //  Conditionally rendering summary if loading
        let orderSummary
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

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
                            purchasable={this.props.purchasable}
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
        ingredients: state.ingredients,
        price: state.price,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeIngredients: () => dispatch({type: actionTypes.INITIALIZE_INGREDIENTS}),
        onIngredientAdded: (type) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: type}),
        onIngredientRemoved: (type) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: type})
    }
}

//  method built to take any errors we might recieve with axios and display them in a modal
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))