import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios/axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: ''
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
        isLoading: false
    }

    inputChangedHandler = (e, name) => {
        //  Cloning the form object
        const updatedForm = { ...this.state.orderForm }
        //  Since the spread operator is a shallow clone we also need to copy the affected element
        const updatedElement = { ...updatedForm[name] }
        //  Updating the value of that element
        updatedElement.value = e.target.value
        // copying the new element to the new form
        updatedForm[name] = updatedElement
        this.setState({ orderForm: updatedForm })
    }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({isLoading: true})
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
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false})
            })
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
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        </>
        )

        if (this.state.isLoading) form = <Spinner />

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData
