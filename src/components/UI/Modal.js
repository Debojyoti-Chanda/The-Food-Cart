import React from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";

const Backdrop = (props)=>{
    return <div className={style.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = (props)=>{
    return (
    <div className={style.modal}>
        <div className={style.content}>{props.children}</div>
    </div>
    );
}

const portalElement = document.getElementById("overlays");

const Modal = (props)=>{
    return (
        <React.Fragment>
            {/* <Backdrop/>
            <ModalOverlay>{props.children}</ModalOverlay> */}
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </React.Fragment>
    );
}
export default Modal;