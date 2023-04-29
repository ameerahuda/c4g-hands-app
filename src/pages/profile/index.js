import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/Modal';
import { useStateContext } from '@/context/context';
import axios from "axios";

const initialFormState = {
    email: '',
    password: ''

}

export default function Profile() {
    const router = useRouter();
    const {
		isAuthenticated,
		token,
        user
	} = useStateContext();

	const [userForm, setUserForm] = useState(initialFormState);
    const [userUpdated, setUserUpdated] = useState(false);
	const [showUpdUserModal, setShowUpdUserModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const formatPhoneNumber = (value) => {
        let val = value;
        val = val.replace(/\D/g, '');
        val = val.slice(0,3) + "-" + val.slice(3,6) + "-" + val.slice(6,15);
        return val;
    }

    useEffect(() => {
        if (!isAuthenticated && !sessionStorage.getItem('user')) {
            router.push("/signin")
        }
    }, [isAuthenticated])

const updUser = async (user) => {
        let config = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_URL}/user/reset-pass`,
            headers: { Authorization: `Bearer ${token}` },
            data: user
        };

        await axios(config)
            .then((response) => {
                setUserUpdated(true);
                setUserForm(initialFormState);
                setShowUpdUserModal(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleUserForm = () => {
		setShowUpdUserModal(true);
	};

    const handleFormChange = (event) => {
        let fieldName = event.target.id;
        setUserForm({...userForm , [fieldName]: event.target.value})
    }

    const validateForm = () => {
        let valid = true;

        if (userForm.email.length === 0) {
            valid = false;
        } else if (userForm.password.length === 0) {
            valid = false;

        }

        return valid;
    }

    const handleUserUpdated = (event) => {
	    event.preventDefault();
	    // Save partner details here

        if (validateForm()) {
            updUser(userForm)
        }
  	};


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
                <div className={styles.userButtons}>
				    <button className={styles.userBtn} onClick={handleUserForm}>Reset Password</button>
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
                        <p className={styles.acctInfoValue}>{formatPhoneNumber(user.phoneNumber)}</p>
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


                <Modal
                    isOpen={showUpdUserModal}
                    header='Reset Password'
                    handleClose={() => {setShowUpdUserModal(false); setUserForm(initialFormState);}}
                >
                    <form className={styles.userForm} onSubmit={handleUserUpdated}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userForm.email}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="password">New Password</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={userForm.password}
                            onChange={handleFormChange}
                            required
                        />

                        {errorMessage && <p>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>
            </main>
        </>
    )
}
