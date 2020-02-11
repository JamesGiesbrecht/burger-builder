import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

const Toolbar = () => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            LINKS
        </nav>
    </header>
)

export default Toolbar