'use client';

import { AuthContext } from '@/providers/AuthProvider';
import styles from './AppHeader.module.css';
import { useContext } from 'react';
import { AppSelectDropdown } from '@/components/dropdowns/AppSelectDropdown/AppSelectDropdown';

export const AppHeader = () => {
    const authContext = useContext(AuthContext);

    const handleSignOut = () => authContext.signOut();

    return (
        <div className={styles.appHeaderContainer}>
            <div className={styles.appHeaderContainerLeftSlot}>
                <h3>Brewshack</h3>
                <AppSelectDropdown />
            </div>
            <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};;