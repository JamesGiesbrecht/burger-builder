import React, { memo } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    console.log('Rendering modal')
    return (
    <>
        <Backdrop
            show={props.show}
            clicked={props.closeModal}
        />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </>
    )
}

export default memo(Modal, (prevProps, nextProps) => {
    //  Modal will only rerender if it is set to the show state or children change
    return nextProps.show === prevProps.show || nextProps.children === prevProps.children
})