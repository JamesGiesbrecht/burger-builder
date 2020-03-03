import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null)

        //  Clearing the error message on each request
        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null)
            return request
        })
        //  If there is an error set it to the error state
        const resInterceptor = axios.interceptors.response.use(response => response, err => {
            setError(err)
        })

        useEffect(() => {
            return () => {
                //  Removing interceptors when done with this class to improve performance and prevent momory leaks and errors
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            };
        }, [reqInterceptor, resInterceptor])


        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <>
                <Modal 
                    show={error}
                    closeModal={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}

export default withErrorHandler
