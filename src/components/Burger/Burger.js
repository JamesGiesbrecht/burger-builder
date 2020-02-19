import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { withRouter } from 'react-router-dom' // wrapping a component with withRouter enables access to the router props

const Burger = (props) => {
    //  Turns object keys (meat, cheese, etc.) into an array
    let ingredients = Object.keys(props.ingredients)
        //  Returning an array that is the same length as the values
        // e.g. meat: 2 would return an array with blank spots that 2 spots long
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
            //  Creates a BurgerIngredient of that type for the array length 
            .map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        //  Reduce takes a function with arguments representing the pervious value and the current value
        //  This will loop through the array and add them to the initial array (which is empty and passed via the second param)
        //  Now if ingredients are 0 it will be removed from the array
        .reduce((arr, el) => {
            return arr.concat(el)
        //  The empty array as the second param of reduce represents the initial value
        }, [])
    
    if(ingredients.length === 0) {
        ingredients = <p>Add those ingredients partner!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(Burger)