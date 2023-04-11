import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Users.module.css';
import Table from '@/components/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/Modal';
import { useStateContext } from '@/context/context';
import axios from "axios";

const initialFormState = {
    emailAddress: '',
    firstName: '',
    lastName: '',
    gender: '',
    userType: '',
    partnerName:''
}

export default function Users() {
    const { 
		isAuthenticated,
        token
	} = useStateContext();
    const router = useRouter();
    const [userForm, setUserForm] = useState(initialFormState);
    const [userCreated, setUserCreated] = useState(false);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const getPartners = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/partner`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    setPartners(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (token) {
            getPartners();
        }

    }, [token]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/signin")
        }
    }, [isAuthenticated])

    const createUser = async (user) => {
        let config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
            headers: { Authorization: `Bearer ${token}` },
            data: user
        };

        await axios(config)
            .then((response) => {
                setUsers([...users, user])
                setUserCreated(true);
                setUserForm(initialFormState);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleUserForm = () => {
		setShowCreateUserModal(true);
	};

    const handleFormChange = (event) => {
        let fieldName = event.target.id;
        setUserForm({...userForm , [fieldName]: event.target.value})
    }

    const validateForm = () => {
        let valid = true;

        if (userForm.emailAddress.length === 0) {
            valid = false;
        } else if (userForm.firstName.length === 0) {
            valid = false;
        } else if (userForm.lastName.length === 0) {
                      valid = false;
        } else if (userForm.gender.length === 0) {
                     valid = false;
        } else if (userForm.userType.length === 0) {
                      valid = false;
        }

        return valid;
    }

    const handleUserCreated = (event) => {
	    event.preventDefault();
	    // Save partner details here

        if (validateForm()) {
            createUser(userForm)
        }
  	};

    return isAuthenticated && !isLoading && (
        <>
            <Head>
                <title>HandS</title>
                <meta name="description" content="HandS Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.header}></div>
                <div className={styles.userButtons}>
                    <button className={styles.userBtn} onClick={handleUserForm}>Create User</button>
                </div>

                <Modal
                    isOpen={showCreateUserModal}
                    header='Create User'
                    handleClose={() => {setShowCreateUserModal(false); setUserForm(initialFormState);}}
                >
                    <form className={styles.userForm} onSubmit={handleUserCreated}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            type="text"
                            id="emailAddress"
                            name="emailAddress"
                            value={userForm.emailAddress}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userForm.firstName}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userForm.lastName}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="gender">Gender</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={userForm.gender}
                            onChange={handleFormChange}
                            required
                        />
                        <label htmlFor="userType">User Role</label>
                        <input
                            type="text"
                            id="userType"
                            name="userType"
                            value={userForm.userType}
                            onChange={handleFormChange}
                            required
                        />
                        <label htmlFor="partnerName">Partner</label>
                        <input
                            type="text"
                            id="partnerName"
                            name="partnerName"
                            value={userForm.partnerName}
                            onChange={handleFormChange}
                        />

                        {errorMessage && <p>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>
            </main>
        </>
    )
}
