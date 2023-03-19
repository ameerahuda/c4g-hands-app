import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/SignIn.module.css';
import SigninModal from '@/components/SigninModal';
import { useStateContext } from '@/context/context';

export default function Signin() {
	const { 
		login,
		isAuthenticated 
	} = useStateContext();
	const router = useRouter();


	const handleLogin = (event, email, password) => {
		event.preventDefault();
		login(email, password);
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/profile')
		}
	}, [isAuthenticated]);

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
				{!isAuthenticated && (
					<SigninModal handleLogin={handleLogin} />
				)}
			</main>
		</>
  	)
}
