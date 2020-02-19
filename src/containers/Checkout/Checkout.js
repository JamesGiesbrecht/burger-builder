import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ContactData from '../ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients : null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query.entries()) {
            if (param[0] === 'totalPrice') {
                this.setState({ totalPrice: +param[1]})
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                {/* Takes the path that is in the url bar and appends contact-data */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => <ContactData
                                            {...props}
                                            ingredients={this.state.ingredients} 
                                            price={this.state.totalPrice}
                                        />}
                />
            </div>
        )
    }
}

export default Checkout
