import React, { Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    //  Modal will only rerender if it is set to show
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return (
        <>
            <Backdrop
                show={this.props.show}
                clicked={this.props.closeModal}
            />
            <div
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
            >
                {this.props.children}
            </div>
        </>
        )
   }
}

export default Modal