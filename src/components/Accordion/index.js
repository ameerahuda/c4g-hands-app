import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '@/styles/Accordion.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const Accordion = ({ header, children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.accordionContainer}>
            <div className={styles.accordionHeader} onClick={() => setIsActive(!isActive)}>
                <div>{header}</div>
                <div>{isActive ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}</div>
            </div>
            {isActive && <div className={styles.accordionContent}>{children}</div>}
        </div>
    )
}

Accordion.propTypes = {
    header: PropTypes.string,
    isOpen: PropTypes.bool,
    children: PropTypes.any
}

export default Accordion