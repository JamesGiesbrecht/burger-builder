import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios/axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../../store/actions'
import { updateObject, checkValid } from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                validationError: null,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                validationError: null,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                validationError: null,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                validationError: null,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                validationError: null,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', display: 'Fastest'},
                              {value: 'cheapest', display: 'Cheapest'}]
                },
                value: 'fastest'
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (e, name) => {
        //  Since the spread operator is a shallow clone we also need to copy the affected element
        let updatedElement = updateObject(this.state.orderForm[name], {
            value: e.target.value
        })
        //  Updating the value of that element
        if (updatedElement.validation) {
            const isValid = checkValid(updatedElement)
            updatedElement = updateObject(updatedElement, {
                valid: isValid,
                touched: true,
                validationError: isValid ? null : "Please enter a valid " + name
            })
        }

        // copying the new element to the new form
        const updatedForm = updateObject(this.state.orderForm, {
            [name]: updatedElement
        })
        
        //  Defaulting overall validity to true
        let formIsValid = true
        for (let input in updatedForm) {
            //  Not checking validity if input doesnt have validation rules
            if (updatedForm[input].validation) {
                formIsValid = updatedForm[input].valid
            }
            //  breaking out of the loop if any of the elements is invalid
            if (!formIsValid) break
        }
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid })
    }

    orderHandler = (e) => {
        e.preventDefault()
        const formData = {}
        //  Mapping each element in orderform to its value
        for (let formName in this.state.orderForm) {
            formData[formName] = this.state.orderForm[formName].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)
    }
    
    render() {
        const inputs = []
        for (let key in this.state.orderForm) {
            inputs.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
        <>
            <h4>Enter your Contact Data</h4>
            <form onSubmit={this.orderHandler}>
                {inputs.map(input => (
                    <Input
                        key={input.id}
                        elementType={input.config.elementType}
                        elementConfig={input.config.elementConfig}
                        value={input.config.value}
                        changed={(e) => this.inputChangedHandler(e, input.id)}
                        isValid={input.config.valid}
                        shouldValidate={input.config.validation}
                        touched={input.config.touched}
                        validationError={input.config.validationError}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        </>
        )

        if (this.props.isLoading) form = <Spinner />

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        isLoading: state.order.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
