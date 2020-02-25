import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

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
                    isLoggedIn={this.props.isLoggedIn}
                    toggle={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isLoggedIn={this.props.isLoggedIn}
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)