import React, { useState } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)
    
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer)
    }
    
    return (
        <>
            <Toolbar
                isLoggedIn={props.isLoggedIn}
                toggle={sideDrawerToggleHandler}
            />
            <SideDrawer
                isLoggedIn={props.isLoggedIn}
                isOpen={showSideDrawer}
                toggle={sideDrawerToggleHandler}
            />
            <div>Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    )
    
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)