import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'

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
            }
        }
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

    render() {
        const inputs = []
        for (let key in this.state.controls) {
            inputs.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        const form = inputs.map(input => (
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
        ))

        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth