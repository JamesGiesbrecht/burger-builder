import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/'
import { Redirect } from 'react-router-dom'

const Logout = (props) => {
    useEffect(() => {
        props.onLogout()
        // eslint-disable-next-line
    }, [])

    return (
        <Redirect to='/' />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionTypes.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)