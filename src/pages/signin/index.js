import Head from 'next/head';
import styles from '@/styles/SignIn.module.css';
import Image from 'next/image';
import {useState} from 'react';

export default function Signin() {
	const [email, setEmail] = useState('');
	  const [password, setPassword] = useState('');
	  const [loggedIn, setLoggedIn] = useState(false);
	  const [showPartnerForm, setShowPartnerForm] = useState(false);
	  const [partnerName, setPartnerName] = useState('');
	  const [budget, setBudget] = useState('');
	  const [requirement, setRequirement] = useState('');
	  const [partnerCreated, setPartnerCreated] = useState(false);

	  const handleEmailChange = (event) => {
	    setEmail(event.target.value);
	  };

	  const handlePasswordChange = (event) => {
	    setPassword(event.target.value);
	  };

	  const handleLogin = (event) => {
	    event.preventDefault();
	    // Check email and password here
	    setLoggedIn(true);
	  };

	  const handlePartnerForm = () => {
	    setShowPartnerForm(true);
	  };

	  const handlePartnerNameChange = (event) => {
	    setPartnerName(event.target.value);
	  };

	  const handleBudgetChange = (event) => {
	    setBudget(event.target.value);
	  };

	  const handleRequirementChange = (event) => {
	    setRequirement(event.target.value);
	  };

	  const handlePartnerCreated = (event) => {
	    event.preventDefault();
	    // Save partner details here
	    setPartnerCreated(true);
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
		        <form onSubmit={handleLogin}>
		          <label htmlFor="email">Email:</label>
		          <input
		            type="email"
		            id="email"
		            name="email"
		            value={email}
		            onChange={handleEmailChange}
		            required
		          />

		          <label htmlFor="password">Password:</label>
		          <input
		            type="password"
		            id="password"
		            name="password"
		            value={password}
		            onChange={handlePasswordChange}
		            required
		          />

		          <button type="submit">Log in</button>
		        </form>
		      )}

		      {loggedIn && (
		        <>
		          <button onClick={handlePartnerForm}>Create Partner</button>

		          {showPartnerForm && (
		            <form onSubmit={handlePartnerCreated}>
		              <label htmlFor="partnerName">Partner Name:</label>
		              <input
		                type="text"
		                id="partnerName"
		                name="partnerName"
		                value={partnerName}
		                onChange={handlePartnerNameChange}
		                required
		              />

		              <label htmlFor="budget">Budget:</label>
		              <input
		                type="number"
		                id="budget"
		                name="budget"
		                value={budget}
		                onChange={handleBudgetChange}
		                required
		              />

		              <label htmlFor="requirement">Requirement:</label>
		              <textarea
		                id="requirement"
		                name="requirement"
		                value={requirement}
		                onChange={handleRequirementChange}
		                required
		              />

		              <button type="submit">Save</button>
		            </form>
		          )}

		          {partnerCreated && <p>Partner Created</p>}
		        </>
		      )}
      </main>
    </>
  )
}
