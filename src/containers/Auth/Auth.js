import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actionTypes from '../../store/actions'
import { connect } from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { updateObject, checkValid } from '../../shared/utility'

const Auth = (props) => {
    const [isSignUp, setIsSignUp] = useState(true)
    // eslint-disable-next-line
    const [testUser, setTestUser] = useState({ 
        email: 'test@jamesgiesbrecht.ca',
        password: 'password'
    })
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                isEmail: true
            },
            validationError: null,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 6
            },
            validationError: null,
            touched: false
        },
        passwordConfirm: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Password'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 6,
                matches: 'password'
            },
            validationError: null,
            touched: false
        }
    })

    const { buildingBurger, authRedirectPath, onSetRedirect} = props
    
    useEffect(() => {
        // If a burger build has not been started and the redirect is not set to root, set redirect to root
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetRedirect()
        }
        // eslint-disable-next-line
    }, [buildingBurger, authRedirectPath])

    const inputChangedHandler = (e, name) => {
        //  Updating value so the most recent values are present for validation
        const updatedElement = updateObject(controls[name], {
            value: e.target.value
        })

        const updatedControls = updateObject(controls, {
            [name]: updateObject(updatedElement, {
                valid: checkValid(updatedElement),
                touched: true
            })
        })
        setControls(updatedControls)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }

    const switchAuthModeHandler = () => {
        // Quick and dirty reset password fields
        const newControls = {...controls}
        const newPassword = {...newControls.password}
        const newPasswordConfirm = {...newControls.passwordConfirm}
        newPassword.value = ''
        newPasswordConfirm.value = ''
        newPassword.touched = false
        newPasswordConfirm.touched = false
        newControls.password = newPassword
        newControls.passwordConfirm = newPasswordConfirm

        setControls(newControls)
        setIsSignUp(!isSignUp)
    }

    const testUserLogin = () => {
        props.onAuth(testUser.email, testUser.password, false)
    }

    //  Redirecting after login to previous page
    if (props.isLoggedIn) {
        return <Redirect to={props.authRedirectPath} />
    }
    const inputs = []
    for (let key in controls) {
        inputs.push({
            id: key,
            config: controls[key],
        })
    }

    const form = props.isLoading ?
        <Spinner />
        :
        inputs.map(input => {
            // displaying the password confirm field if in sign up mode
            if (!isSignUp && input.id === 'passwordConfirm') {
                return null
            } else {
                return (
                    <Input
                        key={input.id}
                        elementType={input.config.elementType}
                        elementConfig={input.config.elementConfig}
                        value={input.config.value}
                        changed={(e) => inputChangedHandler(e, input.id)}
                        isValid={input.config.valid}
                        shouldValidate={input.config.validation}
                        touched={input.config.touched}
                        validationError={input.config.validationError}
                    />
                )
            }
        })

    return (
        <div className={classes.Auth}>
            {props.error ? <p>{props.error.message}</p> : null /* displaying the error message if there is one */}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button
                btnType='Danger'
                clicked={switchAuthModeHandler}
            >
                SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
            <hr/>
            <Button btnType='Success' clicked={testUserLogin}>QUICK SIGN IN WITH TEST USER</Button>
            <p><strong>Email:</strong> {testUser.email}</p>
            <p><strong>Password:</strong> {testUser.password}</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isLoggedIn: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionTypes.auth(email, password, isSignUp)),
        onSetRedirect: () => dispatch(actionTypes.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios))