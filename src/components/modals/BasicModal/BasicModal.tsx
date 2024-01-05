import { PropsWithChildren } from 'react';
import Modal from 'react-modal';

import styles from './BasicModal.module.css';

interface BasicModalProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '1rem',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const BasicModal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
}: BasicModalProps) => {

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            contentLabel='Create Secret'
            shouldCloseOnOverlayClick={true}
            style={customStyles}>
            <div className={styles.title}>
                <h4>{title}</h4>
                <button onClick={onClose}>Close</button>
            </div>
            {description && <p>{description}</p>}
            <div className={styles.content}>
                {children}
            </div>
        </Modal>
    );

};