import React, { Component } from 'react'
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

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignUp: true,
        testEmail: 'test@jamesgiesbrecht.ca',
        testPassword: 'password'
    }

    componentDidMount() {
        // If a burger build has not been started and the redirect is not set to root, set redirect to root
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetRedirect()
        }
    }

    inputChangedHandler = (e, name) => {
        //  Updating value so the most recent values are present for validation
        const updatedElement = updateObject(this.state.controls[name], {
            value: e.target.value
        })

        const updatedControls = updateObject(this.state.controls, {
            [name]: updateObject(updatedElement, {
                valid: checkValid(updatedElement),
                touched: true
            })
        })
        
        this.setState({controls: updatedControls})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        // Quick and dirty reset password fields
        const newControls = {...this.state.controls}
        const newPassword = {...newControls.password}
        const newPasswordConfirm = {...newControls.passwordConfirm}
        newPassword.value = ''
        newPasswordConfirm.value = ''
        newPassword.touched = false
        newPasswordConfirm.touched = false
        newControls.password = newPassword
        newControls.passwordConfirm = newPasswordConfirm

        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
                controls: newControls
            }
        })
    }

    testUserLogin = () => {
        this.props.onAuth(this.state.testEmail, this.state.testPassword, false)
    }

    render() {
        //  Redirecting after login to previous page
        if (this.props.isLoggedIn) {
            return <Redirect to={this.props.authRedirectPath} />
        }
        const inputs = []
        for (let key in this.state.controls) {
            inputs.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        const form = this.props.isLoading ?
            <Spinner />
            :
            inputs.map(input => {
                // displaying the password confirm field if in sign up mode
                if (!this.state.isSignUp && input.id === 'passwordConfirm') {
                    return null
                } else {
                    return (
                        <Input
                            key={input.id}
                            elementType={input.config.elementType}
                            elementConfig={input.config.elementConfig}
                            value={input.config.value}
                            changed={(e) => this.inputChangedHandler(e, input.id)}
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
                {this.props.error ? <p>{this.props.error.message}</p> : null /* displaying the error message if there is one */}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    btnType='Danger'
                    clicked={this.switchAuthModeHandler}
                >
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
                <hr/>
                <Button btnType='Success' clicked={this.testUserLogin}>QUICK SIGN IN WITH TEST USER</Button>
                <p><strong>Email:</strong> {this.state.testEmail}</p>
                <p><strong>Password:</strong> {this.state.testPassword}</p>
            </div>
        )
    }
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