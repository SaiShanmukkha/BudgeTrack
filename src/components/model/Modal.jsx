import styles from "../../../styles/RTModal.module.css"
import { createPortal } from "react-dom";

function Modal({isOpen, children, close}) {
    return ( 
        isOpen ? 
        createPortal(
        <>
            <div onClick={close} className={styles.overlay}></div>
            <div className={styles.rtModal}>
                <button className={styles.closeModalbtn} onClick={close}>&times;</button>
                <div className={styles.rtModalContent} >
                    { children }
                </div>
            </div>
        </>
        , document.getElementById("reactProtalOne")) : null
     );
}

export default Modal;