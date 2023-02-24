import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/SignIn.module.css';
import SigninModal from '@/components/SigninModal/SigninModal';

export default function Signin() {
	const router = useRouter();
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = (event) => {
		event.preventDefault();
		// Check email and password here
		router.push('/createPartner')
		setLoggedIn(true);
	};

  	return (
		<>
			<Head>
				<title>HandS</title>
				<meta name="description" content="HandS Dashboard" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.signin}></div>
				{!loggedIn && (
					<SigninModal handleLogin={handleLogin} />
				)}
			</main>
		</>
  	)
}
