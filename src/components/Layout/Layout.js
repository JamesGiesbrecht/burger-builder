import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({
            showSideDrawer: !prevState.showSideDrawer
        }))
    }
    
    render() {
        return (
            <>
                <Toolbar
                    toggle={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isOpen={this.state.showSideDrawer}
                    toggle={this.sideDrawerToggleHandler}
                />
                <div>Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout