import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

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

export default NavigationItems
