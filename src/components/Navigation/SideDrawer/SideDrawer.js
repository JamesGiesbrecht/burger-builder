import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.module.css'

const SideDrawer = (props) => {
    
    return (
        <>
            <Backdrop
                clicked={props.toggle}
                show={props.isOpen}
            />
            <div className={classes.SideDrawer + ' ' + [props.isOpen ? classes.Open : classes.Close]}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <div onClick={props.toggle}>
                        <NavigationItems isLoggedIn={props.isLoggedIn}/>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default SideDrawer
