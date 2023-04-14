import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/HouseholdIntake.module.css';

import { useStateContext } from '@/context/context';
import axios from "axios";

export default function HouseholdIntake() {
    const { 
		isAuthenticated,
        token,
        user
	} = useStateContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [householdIntake, setHouseholdIntake] = useState();

    const formatDate = (strDate) => {
        let date = new Date(strDate);
        return date.toLocaleString().split(',')[0];
    }

    useEffect(() => {
        const getHouseholdIntake = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/household?email=${user.email}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    console.log('response.data', response.data)
                    setHouseholdIntake(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (token) {
            getHouseholdIntake();
        }

    }, [router.isReady, token]);
    
    useEffect(() => {
        if (!isAuthenticated && !sessionStorage.getItem('user')) {
            router.push("/signin")
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && user?.user_type !== 'Household') {
            router.push("/profile")
        }
    }, [isAuthenticated, user]);

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
                <div className={styles.householdContainer}>
                    <span>
                        <p className={styles.containerHeader}>Location at Entry</p>
                        <p>{householdIntake.locationEntry}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Motel Name</p>
                        <p>{householdIntake.motelName}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Motel Address</p>
                        <p>{householdIntake.motelAddress}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Motel Zipcode</p>
                        <p>{householdIntake.motelZip}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Education</p>
                        <p>{householdIntake.educationStatus}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Employment Type</p>
                        <p>{householdIntake.employmentType}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Military Service</p>
                        <p>{householdIntake.militaryStatus}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Marital Status</p>
                        <p>{householdIntake.maritalStatus}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Income Source</p>
                        <p>{householdIntake.incomeSource}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Monthly Income</p>
                        <p>{householdIntake.monthlyIncome}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Have kids?</p>
                        <p>{householdIntake.haveKids}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}># of Adults</p>
                        <p>{householdIntake.adultCount}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}># of Kids</p>
                        <p>{householdIntake.kidsCount}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Adult(s) Name/Age</p>
                        <p>{householdIntake.adultNameAge}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Kid(s) Name/Age</p>
                        <p>{householdIntake.kidsNameAge}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-House Date</p>
                        <p>{formatDate(householdIntake.prehousingDT)}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Apartment Name/Landlord</p>
                        <p>{householdIntake.apartmentLandlordName}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-House Address</p>
                        <p>{householdIntake.prehousingAddress}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-House City</p>
                        <p>{householdIntake.prehouseCity}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-House Zipcode</p>
                        <p>{householdIntake.prehoseZip}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-House County</p>
                        <p>{householdIntake.preHouseCounty}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Monthly Rent</p>
                        <p>{householdIntake.monthlyRent}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Graduation Date</p>
                        <p>{formatDate(householdIntake.graduationDT)}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Sure Impact Status</p>
                        <p>{householdIntake.sureImpactStatus}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Sure Impact Notes</p>
                        <p>{householdIntake.sureImpactNotes}</p>
                    </span>
                </div>
            </main>
        </>
    )
}
