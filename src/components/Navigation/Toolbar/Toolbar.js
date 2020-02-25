import React from 'react'
import classes from './Toolbar.module.css'
import Toggle from '../Toggle/Toggle'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggle
            toggle={props.toggle}
        />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLoggedIn={props.isLoggedIn}/>
        </nav>
    </header>
)

export default Toolbar