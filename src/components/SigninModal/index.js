import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '@/styles/SigninModal.module.css';

const SigninModal = ({ handleLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (event) => {
	    setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		};

	return (
		<div className={styles.signinModalContainer}>
			<div className={styles.leftContent}>
				<img src="/images/signin_bg.jpg" alt="Sign in background img" height={100} width={100}></img>
				<span className={styles.header}>
					<p className={styles.title}>Welcome Back</p>
					<p className={styles.subtitle}>Sign in to continue</p>
				</span>
			</div>
			<div className={styles.rightContent}>
				<div className={styles.shortHeader}>
					<p className={styles.shortTitle}>Welcome Back</p>
					<p className={styles.shortSubtitle}>Sign in to continue</p>
				</div>
				<form className={styles.formContainer} onSubmit={(event) => handleLogin(event, email, password)}>
		        	<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						required
					/>
					<label htmlFor="password">Password</label>
					<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
					required
					/>
					<button type="submit">Continue</button>
		        </form>
			</div>
		</div>
	)
}

SigninModal.propTypes = {
	handleLogin: PropTypes.func
}

export default SigninModal