import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { connect } from 'react-redux'

const Checkout = (props) => {
    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    //  If there are ingredients and purchsed is false show the form
    //  If there are no ingredients or purchased is true redirect to root
    const summary = (
        props.ingredients && !props.purchased ? 
            <div>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                {/* Takes the path that is in the url bar and appends contact-data */}
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        :
            <Redirect to='/'/>
    )

    return summary
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)
