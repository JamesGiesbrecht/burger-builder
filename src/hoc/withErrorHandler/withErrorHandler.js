import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import useAjaxErrorHandler from '../../hooks/ajaxErrorHandler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        // this custom hook abstracts the error handling so we can use this anywhere we want and handle the error how we see fit
        const [error, clearError] = useAjaxErrorHandler(axios)

        return (
            <>
                <Modal 
                    show={error}
                    closeModal={clearError}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}

export default withErrorHandler
