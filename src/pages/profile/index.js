import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Profile.module.css';
import { useStateContext } from '@/context/context';
import { useRouter } from 'next/router';

export default function Profile() {
    const router = useRouter();
    const { 
		isAuthenticated,
        user
	} = useStateContext();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/signin")
        }
    }, [])

    return isAuthenticated && (
        <>
            <Head>
                <title>HandS</title>
                <meta name="description" content="HandS Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.header}></div>
                <div className={styles.profileHeader}>
                    <img src="/images/profile_bg.jpg" alt="Profile background img" height={100} width={100}></img>
                    <p className={styles.title}>Hello {user.first_name}!</p>
                </div>
                <p className={styles.acctInfo}>Account Information</p>
                <div className={styles.acctInfoSection}>
                    <span className={styles.acctInfoContent}>
                        <p className={styles.acctInfoLabel}>Name</p>
                        <p className={styles.acctInfoValue}>{user.first_name} {user.last_name}</p>
                    </span>
                    <span>
                        <p className={styles.acctInfoLabel}>Email</p>
                        <p className={styles.acctInfoValue}>{user.email}</p>
                    </span>
                    <span>
                        <p className={styles.acctInfoLabel}>Gender</p>
                        <p className={styles.acctInfoValue}>{user.gender}</p>
                    </span>
                    <span>
                        <p className={styles.acctInfoLabel}>Phone Number</p>
                        <p className={styles.acctInfoValue}>{user.phoneNumber}</p>
                    </span>
                    <span>
                        <p className={styles.acctInfoLabel}>Race</p>
                        <p className={styles.acctInfoValue}>{user.race}</p>
                    </span>
                    <span>
                        <p className={styles.acctInfoLabel}>User Type</p>
                        <p className={styles.acctInfoValue}>{user.user_type}</p>
                    </span>
                </div>
            </main>
        </>
    )
}
