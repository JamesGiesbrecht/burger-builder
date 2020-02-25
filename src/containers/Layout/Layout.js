import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/'

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
                    onLogout={this.props.onLogout}
                    toggle={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isLoggedIn={this.props.isLoggedIn}
                    onLogout={this.props.onLogout}
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionTypes.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)