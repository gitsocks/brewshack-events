import styles from './LoadingPage.module.css';

export interface LoadingPageProps {
    message?: string;
}

export const LoadingPage = ({
    message = 'Loading page ...'
}: LoadingPageProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <img className={styles.animatedImage} src='./assets/Brewshack Logo.png' />
                <p>{message}</p>
            </div>
        </div>
    );
};