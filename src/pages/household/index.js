import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Household.module.css';

import { useStateContext } from '@/context/context';
import axios from "axios";
import Accordion from '@/components/Accordion';

export default function Household() {
    const { 
		isAuthenticated,
        token,
        user
	} = useStateContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [householdIntake, setHouseholdIntake] = useState();
    const [journeyID, setJourneyID] = useState();
    const [journeyDetails, setJourneyDetails] = useState({});
    const [journeyMonths, setJourneyMonths] = useState([]);

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
                    setHouseholdIntake(response.data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        }

        const getHouseholdJourney = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/journey?email=${user.email}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    setJourneyDetails(response.data[0]);
                    setJourneyID(response.data[0].journeyID);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        }

        if (token) {
            getHouseholdIntake();
            getHouseholdJourney();
        }

    }, [router.isReady, token]);

    useEffect(() => {
        const getHouseholdJourneyMonths = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/journey-month/${journeyID}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    setJourneyMonths(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        }
        if (token && journeyID) {
            getHouseholdJourneyMonths();
        }
    }, [token, journeyID]);

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
                <Accordion
                    header='Household Intake'
                >
                    <div className={styles.householdContainer}>
                        <span>
                            <p className={styles.containerHeader}>Location at Entry</p>
                            <p>{householdIntake?.locationEntry}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Motel Name</p>
                            <p>{householdIntake?.motelName}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Motel Address</p>
                            <p>{householdIntake?.motelAddress}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Motel Zipcode</p>
                            <p>{householdIntake?.motelZip}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Education</p>
                            <p>{householdIntake?.educationStatus}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Employment Type</p>
                            <p>{householdIntake?.employmentType}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Military Service</p>
                            <p>{householdIntake?.militaryStatus}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Marital Status</p>
                            <p>{householdIntake?.maritalStatus}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Income Source</p>
                            <p>{householdIntake?.incomeSource}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Monthly Income</p>
                            <p>$ {householdIntake?.monthlyIncome}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Have kids?</p>
                            <p>{householdIntake?.haveKids}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}># of Adults</p>
                            <p>{householdIntake?.adultCount}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}># of Kids</p>
                            <p>{householdIntake?.kidsCount}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Adult(s) Name/Age</p>
                            <p>{householdIntake?.adultNameAge}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Kid(s) Name/Age</p>
                            <p>{householdIntake?.kidsNameAge}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Pre-House Date</p>
                            <p>{formatDate(householdIntake?.prehousingDT)}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Apartment Name/Landlord</p>
                            <p>{householdIntake?.apartmentLandlordName}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Pre-House Address</p>
                            <p>{householdIntake?.prehousingAddress}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Pre-House City</p>
                            <p>{householdIntake?.prehouseCity}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Pre-House Zipcode</p>
                            <p>{householdIntake?.prehoseZip}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Pre-House County</p>
                            <p>{householdIntake?.preHouseCounty}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Monthly Rent</p>
                            <p>$ {householdIntake?.monthlyRent}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Graduation Date</p>
                            <p>{formatDate(householdIntake?.graduationDT)}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Sure Impact Status</p>
                            <p>{householdIntake?.sureImpactStatus}</p>
                        </span>
                        <span>
                            <p className={styles.containerHeader}>Sure Impact Notes</p>
                            <p>{householdIntake?.sureImpactNotes}</p>
                        </span>
                    </div>
                </Accordion>

                <div className={styles.sectionBreak}></div>

                <Accordion
                    header='Household Journey Details'
                >
                    {journeyID ? 
                        <div className={styles.householdContainer}>
                            <span>
                                <p className={styles.containerHeader}>Max Allowance</p>
                                <p>$ {journeyDetails?.maxAllowance}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Journey Duration</p>
                                <p>{journeyDetails?.journeyDuration}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Allowance Spent</p>
                                <p>$ {journeyDetails?.allowanceSpent}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Allowance Remaining</p>
                                <p>$ {journeyDetails?.allowanceRemaining}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Current Phase</p>
                                <p>{journeyDetails?.currentPhase}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Total Debt Paid</p>
                                <p>$ {journeyDetails?.totalDebtPaid}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Total Eviction Amount</p>
                                <p>$ {journeyDetails?.totalEviction}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Total Saved</p>
                                <p>$ {journeyDetails?.totalSaved}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Credit Score Increase</p>
                                <p>{journeyDetails?.creditScoreIncrease}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Is Housed?</p>
                                <p>{journeyDetails?.isHoused}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Graduated?</p>
                                <p>{journeyDetails?.hasGraduated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 1 Proof Submitted</p>
                                <p>{journeyDetails?.req1Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 1 Proof Validated</p>
                                <p>{journeyDetails?.req1Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 2 Proof Submitted</p>
                                <p>{journeyDetails?.req2Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 2 Proof Validated</p>
                                <p>{journeyDetails?.req2Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 3 Proof Submitted</p>
                                <p>{journeyDetails?.req3Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 3 Proof Validated</p>
                                <p>{journeyDetails?.req3Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 4 Proof Submitted</p>
                                <p>{journeyDetails?.req4Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 4 Proof Validated</p>
                                <p>{journeyDetails?.req4Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 5 Proof Submitted</p>
                                <p>{journeyDetails?.req5Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 5 Proof Validated</p>
                                <p>{journeyDetails?.req5Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 6 Proof Submitted</p>
                                <p>{journeyDetails?.req6Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 6 Proof Validated</p>
                                <p>{journeyDetails?.req6Proofvalidated}</p>
                            </span>
                        </div>
                    : <p>No details</p>}
                </Accordion> 

                <div className={styles.sectionBreak}></div>

                {journeyID &&
                    <>
                        <Accordion
                            header='Household Journey by Months'
                        >
                            {journeyID ? 
                                journeyMonths.map((item, index) => {
                                    return <div key={index} className={styles.householdContainer}>
                                        <span className={styles.householdContainerHeader}>
                                            <p className={styles.containerHeader}>Month {item?.month}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Subsidy Date</p>
                                            <p>{formatDate(item?.subsidyDT)}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Subsidy Amount</p>
                                            <p>$ {item?.subsidyAmt}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>1-on-1 Date</p>
                                            <p>{formatDate(item?.oneoOnoneDT)}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Saved Amount</p>
                                            <p>$ {item?.savedAmt}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Eviction Amount</p>
                                            <p>$ {item?.evictionAmt}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Debt Paid Amount</p>
                                            <p>$ {item?.debtPaid}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Apartment Application</p>
                                            <p>{item?.apartmentApplication}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Credit Score</p>
                                            <p>{item?.creditScore}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Total Spent</p>
                                            <p>$ {item?.totalSpent}</p>
                                        </span>
                                    </div>
                                })
                                : <p>No details</p>
                            }
                        </Accordion> 
                        <div className={styles.sectionBreak}></div>
                    </>
                }

            </main>
        </>
    )
}