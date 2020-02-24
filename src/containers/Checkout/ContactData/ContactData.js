import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios/axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../../store/actions'

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
                    required: true
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

    checkValid = (el) => {
        let isValid = true

        if (el.validation.required && el.value.trim() === '') {
            //  if value is empty, valid is false
            isValid = false
        }

        if (el.validation.minLength && el.value.length < el.validation.minLength) {
            // if value is less than min length, valid is false
            isValid = false
        }

        if (el.validation.maxLength && el.value.length > el.validation.maxLength) {
            // if value is more than max length, valid is false
            isValid = false
        }

        return isValid
    }

    inputChangedHandler = (e, name) => {
        //  Cloning the form object
        const updatedForm = { ...this.state.orderForm }
        //  Since the spread operator is a shallow clone we also need to copy the affected element
        const updatedElement = { ...updatedForm[name] }
        //  Updating the value of that element
        updatedElement.value = e.target.value
        if (updatedElement.validation) {
            updatedElement.valid = this.checkValid(updatedElement)
            updatedElement.touched = true
            updatedElement.validationError = updatedElement.valid ? null : "Please enter a valid " + name
        }
        // copying the new element to the new form
        updatedForm[name] = updatedElement
        
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
            orderData: formData
        }

        this.props.onOrderBurger(order)
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
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actionTypes.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
