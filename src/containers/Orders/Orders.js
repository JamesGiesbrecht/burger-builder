import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios/axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = []
                for (let key in response.data) {
                    //  Taking each order (with the randomly generated key) and spreading its properties into a new object
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                })
                console.log(fetchedOrders)
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)
