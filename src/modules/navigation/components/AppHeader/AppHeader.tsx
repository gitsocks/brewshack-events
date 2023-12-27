'use client';

import { AuthContext } from '@/providers/AuthProvider';
import styles from './AppHeader.module.css';
import { useContext } from 'react';

export const AppHeader = () => {
    const authContext = useContext(AuthContext);

    const handleSignOut = () => authContext.signOut();

    return (
        <div className={styles.appHeaderContainer}>
            <h3>Brewshack</h3>
            <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};;