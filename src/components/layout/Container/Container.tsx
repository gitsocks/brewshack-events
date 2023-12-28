import { PropsWithChildren } from "react";
import styles from './Container.module.css';

export const Container = ({ children }: PropsWithChildren) => (
    <div className={styles.container}>
        {children}
    </div>
);