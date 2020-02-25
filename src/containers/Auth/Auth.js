import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actionTypes from '../../store/actions'
import { connect } from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios/axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

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
        isSignUp: true
    }

    checkValid = (el) => {
        let isValid = true

        if (el.validation.required && el.value.trim() === '') {
            //  if value is empty, valid is false
            isValid = false
        }

        if (el.validation.minLength && el.value.length < el.validation.minLength) {
            // if value is less than min length, valid is false
            isValid = false
        }

        if (el.validation.maxLength && el.value.length > el.validation.maxLength) {
            // if value is more than max length, valid is false
            isValid = false
        }

        if (el.validation.isEmail) {
            // eslint-disable-next-line
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if ( !emailRegex.test(el.value) ) {
                isValid = false
            }
        }

        if (el.validation.matches) {
            if (this.state.controls[el.validation.matches].value !== el.value) {
                isValid = false
            }
        }

        return isValid
    }

    inputChangedHandler = (e, name) => {
        //  Updating value so the most recent values are present for validation
        const updatedElement = {...this.state.controls[name]}
        updatedElement.value = e.target.value

        const updatedControls = {
            ...this.state.controls,
            [name]: {
                ...updatedElement,
                valid: this.checkValid(updatedElement),
                touched: true
            }
        }
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

    render() {
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionTypes.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios))