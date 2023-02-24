import React, { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/CreatePartner.module.css';

export default function CreatePartner() {
	const [showPartnerForm, setShowPartnerForm] = useState(false);
	const [partnerName, setPartnerName] = useState('');
	const [budget, setBudget] = useState('');
	const [requirement, setRequirement] = useState('');
	const [partnerCreated, setPartnerCreated] = useState(false);

	const handlePartnerForm = () => {
		setShowPartnerForm(true);
		setPartnerCreated(false);
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
        setShowPartnerForm(false);
        setPartnerName('');
        setBudget('');
        setRequirement('');
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
                <div className={styles.header}></div>
                <button className={styles.partnerBtn} onClick={handlePartnerForm}>Create Partner</button>

                {showPartnerForm && (
                    <form className={styles.partnerForm} onSubmit={handlePartnerCreated}>
                        <label htmlFor="partnerName">Partner Name</label>
                        <input
                            type="text"
                            id="partnerName"
                            name="partnerName"
                            value={partnerName}
                            onChange={handlePartnerNameChange}
                            required
                        />

                        <label htmlFor="budget">Budget</label>
                        <input
                            type="number"
                            id="budget"
                            name="budget"
                            value={budget}
                            onChange={handleBudgetChange}
                            required
                        />

                        <label htmlFor="requirement">Requirement</label>
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

                {partnerCreated && <p>Partner Created!</p>}
            </main>
        </>
    )
}
