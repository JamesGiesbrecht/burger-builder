import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios/axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        isLoading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({isLoading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({isLoading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({isLoading: false})
            })
    }
    
    render() {
        let form = (
        <>
            <h4>Enter your Contact Data</h4>
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='text' name='email' placeholder='Your Email' />
                <input type='text' name='street' placeholder='Street' />
                <input type='text' name='postalCode' placeholder='Postal Code' />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
