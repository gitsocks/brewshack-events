import { PropsWithChildren, useState } from "react";

import styles from './ConfirmButton.module.css';

interface ConfirmButtonProps extends PropsWithChildren {
    confirmLabel?: string;
    onConfirm: () => void;
}

export const ConfirmButton = ({
    confirmLabel = 'Confirm',
    onConfirm,
    children
}: ConfirmButtonProps) => {
    const [mustConfirm, setMustConfirm] = useState(false);

    return !mustConfirm ? (
        <button onClick={() => setMustConfirm(true)}>{children}</button>
    ) : (
        <div className={styles.buttonGroup}>
            <button onClick={() => setMustConfirm(false)}>Cancel</button>
            <button onClick={onConfirm}>{confirmLabel}</button>
        </div>
    );
};