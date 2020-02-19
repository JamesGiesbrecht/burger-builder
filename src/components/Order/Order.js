import React from 'react'
import classes from './Order.module.css'

const Order = (props) => (
    <div className={classes.Order}>
        <p>Ingrdients: </p>
        <p>Price: <strong>{props.price}</strong></p>
    </div>
)

export default Order
