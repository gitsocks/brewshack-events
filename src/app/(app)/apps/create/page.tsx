import { CreateApplicationForm } from "@/components/forms/CreateApplicationForm/CreateApplicationForm";
import { Container } from "@/components/layout/Container/Container";

import styles from './page.module.css';

const Page = () => {
    return (
        <main>
            <div className={styles.innerContainer}>
                <h2>Create a new application</h2>
                <p>The first step to start tracking your application&apos;s events.</p>
                <CreateApplicationForm />
            </div>
        </main>
    );
};

export default Page;