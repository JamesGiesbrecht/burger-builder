export const updateObject = (oldObj, newProperties) => {
    return {
        ...oldObj,
        ...newProperties
    }
}

export const checkValid = (el) => {
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