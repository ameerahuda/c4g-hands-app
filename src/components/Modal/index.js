import React from 'react'
import PropTypes from 'prop-types'
import styles from '@/styles/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ header, isOpen, handleClose, children }) => {
    return (
        <div className={isOpen ? styles.modalShow : styles.modalHide}>
            <div className={styles.modalBackgorund} />
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>{header}</h5>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
                {/* <div className={styles.modalActions}>
                    <div className={styles.actionsContainer}>
                    <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                        Delete
                    </button>
                    <button
                        className={styles.cancelBtn}
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    header: PropTypes.string,
    handleClose: PropTypes.func,
    children: PropTypes.any
}

export default Modal;