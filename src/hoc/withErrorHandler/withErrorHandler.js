import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        constructor() {
            super()
            this.state = {
                error: null
            }
            //  Clearing the error message on each request
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null})
                return request
            })
            //  If there is an error set it to the error state
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error})
            })
        }


        //  Removing interceptors when done with this class to improve performance and prevent momory leaks and errors
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <>
                    <Modal 
                        show={this.state.error}
                        closeModal={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler
