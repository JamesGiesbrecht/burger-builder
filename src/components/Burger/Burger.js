import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    //  Turns object keys (meat, cheese, etc.) into an array
    const ingredients = Object.keys(props.ingredients)
        //  Returning an array that is the same length as the values
        // e.g. meat: 2 would return an array with blank spots that 2 spots long
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
            //  Creates a BurgerIngredient of that type for the array length 
            .map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger