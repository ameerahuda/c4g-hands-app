import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Journey.module.css';

import { useStateContext } from '@/context/context';
import axios from "axios";
import Accordion from '@/components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/Modal';

const initialJourneyFormState = {
    "journeyDuration": '',
    "maxAllowance": '',
    "allowanceSpent": '',
    "allowanceRemaining": '',
    "currentPhase": '',
    "totalDebtPaid": '',
    "totalEviction": '',
    "totalSaved": '',
    "creditScoreIncrease": '',
    "isHoused": '',
    "hasGraduated": '',
    "req1Proofsubmitted": '',
    "req1Proofvalidated": '',
    "req2Proofsubmitted": '',
    "req2Proofvalidated": '',
    "req3Proofsubmitted": '',
    "req3Proofvalidated": '',
    "req4Proofsubmitted": '',
    "req4Proofvalidated": '',
    "req5Proofsubmitted": '',
    "req5Proofvalidated": '',
    "req6Proofsubmitted": '',
    "req6Proofvalidated": ''
}

const initialJourneyMonthForm = {
    "month": '',
    "subsidyDT": '',
    "subsidyAmt": '',
    "oneoOnoneDT": '',
    "debtPaid": '',
    "evictionAmt": '',
    "savedAmt": '',
    "apartmentApplication": '',
    "creditScore": '',
    "totalSpent": ''
}

export default function Journey() {
    const { 
		isAuthenticated,
        token,
        user
	} = useStateContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [householdIntake, setHouseholdIntake] = useState();
    const [journeyID, setJourneyID] = useState();
    const [journeyDetails, setJourneyDetails] = useState(initialJourneyFormState);
    const [journeyForm, setJourneyForm] = useState();
    const [showUpdateJourneyDetailsModal, setShowUpdateJourneyDetailsModal] = useState(false);
    const [journeyMonths, setJourneyMonths] = useState([]);
    const [journeyMonthForm, setJourneyMonthForm] = useState(initialJourneyMonthForm);
    const [showUpdateJourneyMonthModal, setShowUpdateJourneyMonthModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formatDate = (strDate) => {
        let tempStrDate = strDate?.includes('T') ? strDate : strDate + 'T00:00-0800';
        let date = new Date(tempStrDate);
        return date.toLocaleString().split(',')[0];
    }

    function formatDateForInput(str) {
        return str?.split('T')[0];
    }

    const getHouseholdJourney = async () => {
        let config = {
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_API_URL}/journey?email=${householdIntake?.fk_User_email}`,
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

    useEffect(() => {
        const getHouseholdIntake = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/household/${router.query.householdID}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then(async (response) => {
                    setHouseholdIntake(response.data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        }

        if (token && router.isReady) {
            if (router.query.householdID && !householdIntake) {
                getHouseholdIntake();
            }
        }

    }, [router.isReady, token]);

    useEffect(() => {
        if (householdIntake && (!journeyDetails || !journeyID)) {
            getHouseholdJourney();
        }

    }, [householdIntake]);

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
    }, [token, journeyID])

    const handleUpdateJourney = async (e, updateType) => {
        e.preventDefault();
        setIsLoading(true);
        let tempJourneyDetails = journeyForm;
        tempJourneyDetails.fk_User_email = householdIntake.fk_User_email;
        tempJourneyDetails.fk_Program_programID = householdIntake.fk_Program_programID;

        let config = {
            method: updateType === 'ADD' ? 'post' : 'put',
            url: `${process.env.NEXT_PUBLIC_API_URL}/journey`,
            headers: { Authorization: `Bearer ${token}` },
            data: tempJourneyDetails
        };

        await axios(config)
            .then((response) => {
                setIsLoading(false);
                setJourneyID(response.data.journeyID);
                setJourneyDetails(tempJourneyDetails);
                setShowUpdateJourneyDetailsModal(false);
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Unable to save. Try again.');
                setIsLoading(false);
            });
        
    }

    const handleUpdateJourneyMonth = async (e, updateType) => {
        e.preventDefault();
        let tempJourneyMonth = journeyMonthForm;

        let valid = true;
        if (journeyMonths.length > 0) {
            if (tempJourneyMonth.subsidyDT < journeyMonths[journeyMonths.length-1].subsidyDT 
                || new Date(tempJourneyMonth.subsidyDT).getMonth() <= new Date(journeyMonths[journeyMonths.length-1].subsidyDT).getMonth()) {
                setErrorMessage('Unable to save. Subsidy Date must at least a month greater than Subsidy Date of previous month.');
                valid = false;
            } else setErrorMessage('');
        } else {
            if (tempJourneyMonth.subsidyDT < householdIntake.prehousingDT) {
                setErrorMessage('Unable to save. Subsidy Date of first month must be greater than PreHousing Date.');
                valid = false;
            } else setErrorMessage('');
        }

        if (valid) {
            let config = {
                method: updateType === 'ADD' ? 'post' : 'put',
                url: `${process.env.NEXT_PUBLIC_API_URL}/journey-month`,
                headers: { Authorization: `Bearer ${token}` },
                data: tempJourneyMonth
            };

            tempJourneyMonth.journeyID = journeyID;
            if (updateType === 'ADD') {
                tempJourneyMonth.month = journeyMonths.length + 1;
            }

            await axios(config)
                .then(async (response) => {
                    setIsLoading(false);
                    if (updateType === 'ADD') {
                        setJourneyMonths([...journeyMonths, tempJourneyMonth]);
                    } else {
                        let tempJourneyMonths = journeyMonths;
                        let index = tempJourneyMonths.findIndex((item) => item.month === tempJourneyMonth.month);
                        tempJourneyMonths[index] = tempJourneyMonth;
                        setJourneyMonths(tempJourneyMonths);
                        setErrorMessage('');
                    }
                    setShowUpdateJourneyMonthModal(false);
                    setJourneyMonthForm(initialJourneyMonthForm);
                    await getHouseholdJourney();
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage('Unable to save. Try again.')
                    setIsLoading(false);
                });
        }
    }

    const handleFormChange = (event) => {
        let fieldName = event.target.id;
        setJourneyForm({...journeyForm , [fieldName]: event.target.value})
    }

    const handleMonthFormChange = (event) => {
        let fieldName = event.target.id;
        setJourneyMonthForm({...journeyMonthForm , [fieldName]: event.target.value})
    }

    useEffect(() => {
        if (!isAuthenticated && !sessionStorage.getItem('user')) {
            router.push("/signin")
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && user?.user_type !== 'Partner Staff') {
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
                <div className={styles.journeyButtons}>
                    {journeyID ? 
                        <button className={styles.journeyBtn} onClick={() => {setJourneyForm(journeyDetails); setShowUpdateJourneyDetailsModal(true)}}>Edit Household Journey</button>
                        : <button className={styles.journeyBtn} onClick={() => {setJourneyForm(journeyDetails); setShowUpdateJourneyDetailsModal(true)}}>Add Household Journey</button>
                    }       
                </div>
                <Accordion
                    header='Household Journey Details'
                >
                    {journeyID ? 
                        <div className={styles.householdContainer}>
                            <span>
                                <p className={styles.containerHeader}>Max Allowance</p>
                                <p>$ {journeyDetails.maxAllowance}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Journey Duration</p>
                                <p>{journeyDetails.journeyDuration}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Allowance Spent</p>
                                <p>$ {journeyDetails.allowanceSpent}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Allowance Remaining</p>
                                <p>$ {journeyDetails.allowanceRemaining}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Current Phase</p>
                                <p>{journeyDetails.currentPhase}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Total Debt Paid</p>
                                <p>$ {journeyDetails.totalDebtPaid}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Total Eviction Amount</p>
                                <p>$ {journeyDetails.totalEviction}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Total Saved</p>
                                <p>$ {journeyDetails.totalSaved}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Credit Score Increase</p>
                                <p>{journeyDetails.creditScoreIncrease}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Is Housed?</p>
                                <p>{journeyDetails.isHoused}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Graduated?</p>
                                <p>{journeyDetails.hasGraduated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 1 Proof Submitted</p>
                                <p>{journeyDetails.req1Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 1 Proof Validated</p>
                                <p>{journeyDetails.req1Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 2 Proof Submitted</p>
                                <p>{journeyDetails.req2Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 2 Proof Validated</p>
                                <p>{journeyDetails.req2Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 3 Proof Submitted</p>
                                <p>{journeyDetails.req3Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 3 Proof Validated</p>
                                <p>{journeyDetails.req3Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 4 Proof Submitted</p>
                                <p>{journeyDetails.req4Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 4 Proof Validated</p>
                                <p>{journeyDetails.req4Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 5 Proof Submitted</p>
                                <p>{journeyDetails.req5Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 5 Proof Validated</p>
                                <p>{journeyDetails.req5Proofvalidated}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 6 Proof Submitted</p>
                                <p>{journeyDetails.req6Proofsubmitted}</p>
                            </span>
                            <span>
                                <p className={styles.containerHeader}>Requirement 6 Proof Validated</p>
                                <p>{journeyDetails.req6Proofvalidated}</p>
                            </span>
                        </div>
                    : <p>No details</p>}
                </Accordion> 

                <Modal 
                    isOpen={showUpdateJourneyDetailsModal}
                    header={`${journeyID ? 'Edit' : 'Add'} Household Journey Details`}
                    handleClose={() => {
                        setShowUpdateJourneyDetailsModal(false); 
                        setJourneyForm(initialJourneyFormState);
                        setErrorMessage('');
                    }}
                >
                    <form className={styles.journeyForm} onSubmit={(e) => handleUpdateJourney(e, journeyID ? 'EDIT' : 'ADD')}>
                        <label htmlFor="maxAllowance">Max Allowance</label>
                        <input
                            type="number"
                            id="maxAllowance"
                            name="maxAllowance"
                            value={journeyForm?.maxAllowance}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="journeyDuration">Journey Duration</label>
                        <input
                            type="number"
                            id="journeyDuration"
                            name="journeyDuration"
                            value={journeyForm?.journeyDuration}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="allowanceSpent">Allowance Spent</label>
                        <input
                            type="number"
                            id="allowanceSpent"
                            name="allowanceSpent"
                            value={journeyForm?.allowanceSpent}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="allowanceRemaining">Allowance Remaining</label>
                        <input
                            type="number"
                            id="allowanceRemaining"
                            name="allowanceRemaining"
                            value={journeyForm?.allowanceRemaining}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="currentPhase">Current Phase</label>
                        <input
                            type="text"
                            id="currentPhase"
                            name="currentPhase"
                            value={journeyForm?.currentPhase}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="totalDebtPaid">Total Debt Paid</label>
                        <input
                            type="number"
                            id="totalDebtPaid"
                            name="totalDebtPaid"
                            value={journeyForm?.totalDebtPaid}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="totalEviction">Total Eviction Amount</label>
                        <input
                            type="number"
                            id="totalEviction"
                            name="totalEviction"
                            value={journeyForm?.totalEviction}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="totalSaved">Total Saved</label>
                        <input
                            type="number"
                            id="totalSaved"
                            name="totalSaved"
                            value={journeyForm?.totalSaved}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="creditScoreIncrease">Credit Score Increase</label>
                        <input
                            type="text"
                            id="creditScoreIncrease"
                            name="creditScoreIncrease"
                            value={journeyForm?.creditScoreIncrease}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="isHoused">Is Housed?</label>
                        <input
                            type="text"
                            id="isHoused"
                            name="isHoused"
                            value={journeyForm?.isHoused}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="hasGraduated">Graduated?</label>
                        <input
                            type="text"
                            id="hasGraduated"
                            name="hasGraduated"
                            value={journeyForm?.hasGraduated}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req1Proofsubmitted">Requirement 1 Proof Submitted</label>
                        <input
                            type="text"
                            id="req1Proofsubmitted"
                            name="req1Proofsubmitted"
                            value={journeyForm?.req1Proofsubmitted}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req1Proofvalidated">Requirement 1 Proof Validated</label>
                        <input
                            type="text"
                            id="req1Proofvalidated"
                            name="req1Proofvalidated"
                            value={journeyForm?.req1Proofvalidated}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req2Proofsubmitted">Requirement 2 Proof Submitted</label>
                        <input
                            type="text"
                            id="req2Proofsubmitted"
                            name="req2Proofsubmitted"
                            value={journeyForm?.req2Proofsubmitted}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req2Proofvalidated">Requirement 2 Proof Validated</label>
                        <input
                            type="text"
                            id="req2Proofvalidated"
                            name="req2Proofvalidated"
                            value={journeyForm?.req2Proofvalidated}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req3Proofsubmitted">Requirement 3 Proof Submitted</label>
                        <input
                            type="text"
                            id="req3Proofsubmitted"
                            name="req3Proofsubmitted"
                            value={journeyForm?.req3Proofsubmitted}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req3Proofvalidated">Requirement 3 Proof Validated</label>
                        <input
                            type="text"
                            id="req3Proofvalidated"
                            name="req3Proofvalidated"
                            value={journeyForm?.req3Proofvalidated}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req4Proofsubmitted">Requirement 4 Proof Submitted</label>
                        <input
                            type="text"
                            id="req4Proofsubmitted"
                            name="req4Proofsubmitted"
                            value={journeyForm?.req4Proofsubmitted}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req4Proofvalidated">Requirement 4 Proof Validated</label>
                        <input
                            type="text"
                            id="req4Proofvalidated"
                            name="req4Proofvalidated"
                            value={journeyForm?.req4Proofvalidated}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req5Proofsubmitted">Requirement 5 Proof Submitted</label>
                        <input
                            type="text"
                            id="req5Proofsubmitted"
                            name="req5Proofsubmitted"
                            value={journeyForm?.req5Proofsubmitted}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req5Proofvalidated">Requirement 5 Proof Validated</label>
                        <input
                            type="text"
                            id="req5Proofvalidated"
                            name="req5Proofvalidated"
                            value={journeyForm?.req5Proofvalidated}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req6Proofsubmitted">Requirement 6 Proof Submitted</label>
                        <input
                            type="text"
                            id="req6Proofsubmitted"
                            name="req6Proofsubmitted"
                            value={journeyForm?.req6Proofsubmitted}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req6Proofvalidated">Requirement 6 Proof Validated</label>
                        <input
                            type="text"
                            id="req6Proofvalidated"
                            name="req6Proofvalidated"
                            value={journeyForm?.req6Proofvalidated}
                            onChange={handleFormChange}
                            required
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>

                {journeyID &&
                    <>
                        <div className={styles.journeyButtons}>
                            <button className={styles.journeyBtn} onClick={() => setShowUpdateJourneyMonthModal(true)}>Add Jounrey Month</button>
                        </div>
                        <Accordion
                            header='Household Journey by Months'
                        >
                            {journeyMonths.length > 0 ? 
                                journeyMonths.map((item, index) => {
                                    return <div key={index} className={styles.householdContainer}>
                                        <span className={styles.householdContainerHeader}>
                                            <p className={styles.containerHeader}>Month {item.month}</p>
                                            <FontAwesomeIcon icon={faPencil} onClick={() => {setJourneyMonthForm(item); setShowUpdateJourneyMonthModal(true)}}/>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Subsidy Date</p>
                                            <p>{formatDate(item.subsidyDT)}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Subsidy Amount</p>
                                            <p>$ {item.subsidyAmt}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>1-on-1 Date</p>
                                            <p>{formatDate(item.oneoOnoneDT)}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Saved Amount</p>
                                            <p>$ {item.savedAmt}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Eviction Amount</p>
                                            <p>$ {item.evictionAmt}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Debt Paid Amount</p>
                                            <p>$ {item.debtPaid}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Apartment Application</p>
                                            <p>{item.apartmentApplication}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Credit Score</p>
                                            <p>{item.creditScore}</p>
                                        </span>
                                        <span>
                                            <p className={styles.containerHeader}>Total Spent</p>
                                            <p>$ {item.totalSpent}</p>
                                        </span>
                                    </div>
                                })
                                : <p>No details</p>
                            }
                        </Accordion> 
                    </>
                }

                <Modal 
                    isOpen={showUpdateJourneyMonthModal}
                    header={`${journeyMonthForm?.month ? 'Edit': 'Add'} Journey Month`}
                    handleClose={() => {
                        setShowUpdateJourneyMonthModal(false); 
                        setJourneyMonthForm(initialJourneyMonthForm);
                        setErrorMessage('');
                    }}
                >
                    <form className={styles.journeyForm} onSubmit={(e) => handleUpdateJourneyMonth(e, journeyMonthForm?.month ? 'EDIT' : 'ADD')}>
                        {journeyMonthForm?.month && 
                            <>
                                <label htmlFor="month">Month</label>
                                <input
                                    type="number"
                                    id="month"
                                    name="month"
                                    value={journeyMonthForm?.month}
                                    disabled
                                />
                            </>
                        }
                        
                        <label htmlFor="subsidyDT">Subsidy Date</label>
                        <input
                            type="date"
                            id="subsidyDT"
                            name="subsidyDT"
                            value={formatDateForInput(journeyMonthForm?.subsidyDT)}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="subsidyAmt">Subsidy Amount</label>
                        <input
                            type="number"
                            id="subsidyAmt"
                            name="subsidyAmt"
                            value={journeyMonthForm?.subsidyAmt}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="oneoOnoneDT">1-on-1 Date</label>
                        <input
                            type="date"
                            id="oneoOnoneDT"
                            name="oneoOnoneDT"
                            value={formatDateForInput(journeyMonthForm?.oneoOnoneDT)}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="debtPaid">Debt Paid</label>
                        <input
                            type="number"
                            id="debtPaid"
                            name="debtPaid"
                            value={journeyMonthForm?.debtPaid}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="evictionAmt">Eviction Amount</label>
                        <input
                            type="number"
                            id="evictionAmt"
                            name="evictionAmt"
                            value={journeyMonthForm?.evictionAmt}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="savedAmt">Saved Amount</label>
                        <input
                            type="number"
                            id="savedAmt"
                            name="savedAmt"
                            value={journeyMonthForm?.savedAmt}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="apartmentApplication">Apartment Application</label>
                        <input
                            type="text"
                            id="apartmentApplication"
                            name="apartmentApplication"
                            value={journeyMonthForm?.apartmentApplication}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="creditScore">Credit Score</label>
                        <input
                            type="number"
                            id="creditScore"
                            name="creditScore"
                            value={journeyMonthForm?.creditScore}
                            onChange={handleMonthFormChange}
                            required
                        />

                        <label htmlFor="totalSpent">Total Spent</label>
                        <input
                            type="number"
                            id="totalSpent"
                            name="totalSpent"
                            value={journeyMonthForm?.totalSpent}
                            onChange={handleMonthFormChange}
                            required
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>
            </main>
        </>
    )
}