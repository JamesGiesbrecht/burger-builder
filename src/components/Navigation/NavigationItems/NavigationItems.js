import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import * as actionTypes from '../../../store/actions/'
import { connect } from 'react-redux'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link={'/'}
            exact
        >
            Burger Builder
        </NavigationItem>
        {props.isLoggedIn ?
            <>
                <NavigationItem
                    link={'/orders'}
                >
                    Orders
                </NavigationItem>
                <NavigationItem
                    onClick={props.onLogout}
                    link={'/'}
                >
                    Logout
                </NavigationItem>
            </>
            :
            <NavigationItem
                link={'/auth'}
            >
                Login
            </NavigationItem>
        }
    </ul>
)

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionTypes.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems)
