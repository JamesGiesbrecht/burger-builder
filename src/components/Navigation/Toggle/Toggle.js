import React from 'react'
import classes from './Toggle.module.css'

const Toggle = (props) => (
    <div className={classes.Toggle} onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default Toggle