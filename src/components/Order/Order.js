import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.map(ingredient => (
                <span 
                    key={ingredient.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                >
                    {ingredient.name} ({ingredient.amount})
                </span>
            ))}
            </p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
