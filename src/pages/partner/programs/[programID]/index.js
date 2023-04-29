import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Program.module.css';
import Table from '@/components/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faMinus, faPlus, faPencil, faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/Modal';
import { useStateContext } from '@/context/context';
import axios from "axios";
import Link from 'next/link';

const initialFormState = {
    partnerStaffName: '',
    fk_User_email: '',
    householdName: '',
    enrollmentDate: '',
    locationEntry: '',
    motelName: '',
    motelAddress: '',
    motelZip: '',
    educationStatus: '',
    employmentType: '',
    militaryStatus: '',
    maritalStatus: '',
    incomeSource: '',
    monthlyIncome: '',
    haveKids: '',
    adultCount: '',
    kidsCount: '',
    adultNameAge: '',
    kidsNameAge: '',
    prehousingDT: '',
    apartmentLandlordName: '',
    prehousingAddress: '',
    prehouseCity: '',
    prehoseZip: '',
    preHouseCounty: '',
    monthlyRent: '',
    graduationDT: '',
    sureImpactStatus: '',
    sureImpactNotes: ''
}

export default function Programs() {
    const { 
		isAuthenticated,
        token,
        user
	} = useStateContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [program, setProgram] = useState({});
    const [programEdit, setProgramEdit] = useState({});
    const [showEditProgramModal, setShowEditProgramModal] = useState(false);
    const [programHouseholds, setProgramHouseholds] = useState([]);
    const [householdToEdit, setHouseholdToEdit] = useState({});
    const [showEditHouseholdModal, setShowEditHouseholdModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [tableSearchTerm, setTableSearchTerm] = useState('');
    const [searchedItems, setSearchedItems] = useState();
    const [householdForm, setHouseholdForm] = useState(initialFormState);
    const [showCreateHouseholdModal, setShowCreateHouseholdModal] = useState(false);

    const formatDate = (strDate) => {
        let date = new Date(strDate);
        return date.toLocaleString().split(',')[0];
    }

    const columns = useMemo(
        () => [
            {
                // Build our expander column
                id: "expander", // Make sure it has an ID
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span className={styles.rowAction} {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                ),
                Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span className={styles.rowAction} {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronRight} />}
                    </span>
                )
            },
            {
                Header: 'Team Member',
                accessor: 'partnerStaffName'
            },
            {
                Header: 'Email',
                accessor: 'fk_User_email'
            },
            {
                Header: 'Household Name',
                accessor: 'householdName'
            },
            {
                Header: 'Enrollment Date',
                accessor: 'enrollmentDate',
                Cell: ({ row }) => (
                    <p>{formatDate(row.original.enrollmentDate)}</p>
                )
            },
            {
                id: "view", 
                Header: 'View Journey',
                Cell: ({ row }) => (
                    <Link
                        href={{
                        pathname: `/household/${row.original.householdIntakeID}/journey`,
                        query: { household: JSON.stringify(row.original) },
                        }} as={`/household/${row.original.householdIntakeID}/journey`}
                    >
                        <span className={styles.rowAction}>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                    </Link>
                )
            },
            {
                id: "edit", 
                Header: 'Edit',
                Cell: ({ row }) => (
                    <span className={styles.rowAction} onClick={() => {setHouseholdToEdit(row.original); setShowEditHouseholdModal(true);}}>
                        <FontAwesomeIcon icon={faPencil} />
                    </span>
                )
            }
        ], []
    );

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <div className={styles.expandedContent}>
                <span>
                    <p className={styles.expandedHeader}>Location at Entry</p>
                    <p>{row.original.locationEntry}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Motel Name</p>
                    <p>{row.original.motelName}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Motel Address</p>
                    <p>{row.original.motelAddress}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Motel Zipcode</p>
                    <p>{row.original.motelZip}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Education</p>
                    <p>{row.original.educationStatus}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Employment Type</p>
                    <p>{row.original.employmentType}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Military Service</p>
                    <p>{row.original.militaryStatus}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Marital Status</p>
                    <p>{row.original.maritalStatus}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Income Source</p>
                    <p>{row.original.incomeSource}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Monthly Income</p>
                    <p>$ {row.original.monthlyIncome}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Have kids?</p>
                    <p>{row.original.haveKids}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}># of Adults</p>
                    <p>{row.original.adultCount}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}># of Kids</p>
                    <p>{row.original.kidsCount}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Adult(s) Name/Age</p>
                    <p>{row.original.adultNameAge}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Kid(s) Name/Age</p>
                    <p>{row.original.kidsNameAge}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Pre-House Date</p>
                    <p>{formatDate(row.original.prehousingDT)}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Apartment Name/Landlord</p>
                    <p>{row.original.apartmentLandlordName}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Pre-House Address</p>
                    <p>{row.original.prehousingAddress}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Pre-House City</p>
                    <p>{row.original.prehouseCity}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Pre-House Zipcode</p>
                    <p>{row.original.prehoseZip}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Pre-House County</p>
                    <p>{row.original.preHouseCounty}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Monthly Rent</p>
                    <p>$ {row.original.monthlyRent}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Graduation Date</p>
                    <p>{formatDate(row.original.graduationDT)}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Sure Impact Status</p>
                    <p>{row.original.sureImpactStatus}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Sure Impact Notes</p>
                    <p>{row.original.sureImpactNotes}</p>
                </span>
            </div>
        ),
        []
    );

    useEffect(() => {
        const getProgramById = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/program/${router.query.programID}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    setProgram(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const getProgramHouseholds = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/household?partnerID=${user.partnerID}&programID=${router.query.programID}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    setProgramHouseholds(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setProgramHouseholds([]);
                    setIsLoading(false);
                    console.log(error);
                });
        }

        if (token && router.isReady) {
            getProgramById();
            getProgramHouseholds();
        }

    }, [router.isReady, token]);

    const editProgram = async () => {
        let config = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_URL}/program`,
            headers: { Authorization: `Bearer ${token}` },
            data: programEdit
        };

        await axios(config)
            .then((response) => {
                setShowEditProgramModal(false);
                setProgram(programEdit);
                setErrorMessage('')
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Unable to save. Try again.')
            });
    }

    const handleFormChange = (event) => {
        let fieldName = event.target.id;
        setHouseholdForm({...householdForm , [fieldName]: event.target.value})
    }

    const handleEditFormChange = (event, toEdit, setToEdit) => {
        let fieldName = event.target.id;
        setToEdit({...toEdit , [fieldName]: event.target.value})
    }

    const handleHouseholdCreated = async (event) => {
	    event.preventDefault();

        let tempHouseholdForm = householdForm;
        tempHouseholdForm.fk_Partner_partnerID = user.partnerID;
        tempHouseholdForm.fk_Program_programID = router.query.programID;

        let config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/household`,
            headers: { Authorization: `Bearer ${token}` },
            data: tempHouseholdForm
        };

        await axios(config)
            .then((response) => {
                setProgramHouseholds([...programHouseholds, householdForm]);
                setShowCreateHouseholdModal(false);
                setHouseholdForm(initialFormState);
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.data?.sqlMessage?.includes('FOREIGN KEY (`fk_User_email`)')) {
                    setErrorMessage("Specified Household Email doesn't exist in database. Need to create household user with this email or specify an existing user email.")
                }
            });
  	};

    const handleProgramEdited = (event) => {
	    event.preventDefault();
        editProgram(programEdit)
  	};

    const handleHouseholdEdited = async (event) => {
	    event.preventDefault();
        let config = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_URL}/household`,
            headers: { Authorization: `Bearer ${token}` },
            data: householdToEdit
        };

        await axios(config)
            .then((response) => {
                let tempHouseholds = [...programHouseholds];
                let index = tempHouseholds.findIndex((obj) =>  obj.householdIntakeID === householdToEdit.householdIntakeID)
                tempHouseholds[index] = householdToEdit;
                setProgramHouseholds(tempHouseholds);
                setShowEditHouseholdModal(false);
                setHouseholdToEdit({});
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Unable to save. Try again.')
            });
  	};
    
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

    function formatDateForInput(str) {
        return str?.split('T')[0];
    }

    function filterTable(arr, searchKey) {
        return arr.filter(function(obj) {
            return Object.keys(obj).some(function(key) {
                if (typeof obj[key] === 'string') {
                    return obj[key].toLowerCase().includes(searchKey.toLowerCase());
                } else {
                    return false;
                }
            })
        });
    }

    useEffect(() => {
        setSearchedItems(programHouseholds);
    }, [programHouseholds])

    const handleSearch = () => {
        if (tableSearchTerm.length > 0) {
            let tempArray = filterTable(programHouseholds, tableSearchTerm);
            setSearchedItems(tempArray);
        } else {
            setSearchedItems(programHouseholds);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const handleClearSearch = () => {
        setTableSearchTerm(''); 
        setSearchedItems(programHouseholds);
    }

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
                <div className={styles.programHeader}>
                    <p className={styles.programName}>{program?.programName}</p>
                    <button className={styles.programBtn} onClick={() => {setProgramEdit(program); setShowEditProgramModal(true)}}>Edit Program</button>
                </div>
                <div className={styles.programContainer}>
                    <span>
                        <p className={styles.containerHeader}>Program Budget</p>
                        <p>$ {program?.programBudget}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Moving Allowance</p>
                        <p>$ {program?.movingAllowance}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-House Months</p>
                        <p>{program?.prehouseMonths}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Post-House Months</p>
                        <p>{program?.posthouseMonths}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Pre-Monthly Allowance</p>
                        <p>$ {program?.preMonthlyallownce}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Post-Monthly Allowance</p>
                        <p>$ {program?.postMonthlyallowance}</p>
                    </span>
                </div>
                <div className={styles.programContainer}>
                    <span>
                        <p className={styles.containerHeader}>Requirement 1</p>
                        <p>{program?.req1}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Requirement 2</p>
                        <p>{program?.req2}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Requirement 3</p>
                        <p>{program?.req3}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Requirement 4</p>
                        <p>{program?.req4}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Requirement 5</p>
                        <p>{program?.req5}</p>
                    </span>
                    <span>
                        <p className={styles.containerHeader}>Requirement 6</p>
                        <p>{program?.req6}</p>
                    </span>
                </div>
                <div className={styles.tableActions}>
                    <div className={styles.tableSearch}>
                        <input type="search" id="site-search" name="q" value={tableSearchTerm} onChange={(e) => setTableSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
                        <button onClick={() => handleSearch()}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        <button onClick={() => handleClearSearch()}>Clear</button>
                    </div>
                    <button className={styles.addHousehold} onClick={() => setShowCreateHouseholdModal(true)}>Add Household</button>
                </div>
                <Table
                    tableColumns={columns}
                    tableData={searchedItems}
                    renderRowSubComponent={renderRowSubComponent}
                />

                <Modal 
                    isOpen={showEditProgramModal}
                    header='Edit Program'
                    handleClose={() => {setShowEditProgramModal(false)}}
                >
                    <form className={styles.programForm} onSubmit={handleProgramEdited}>
                        <label htmlFor="programName">Program Name</label>
                        <input
                            type="text"
                            id="programName"
                            name="programName"
                            value={programEdit?.programName}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="programBudget">Budget</label>
                        <input
                            type="number"
                            id="programBudget"
                            name="programBudget"
                            value={programEdit?.programBudget}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="prehouseMonths">Pre-house Months</label>
                        <input
                            type="number"
                            id="prehouseMonths"
                            name="prehouseMonths"
                            value={programEdit?.prehouseMonths}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="posthouseMonths">Post-house Months</label>
                        <input
                            type="number"
                            id="posthouseMonths"
                            name="posthouseMonths"
                            value={programEdit?.posthouseMonths}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="preMonthlyallownce">Pre-monthly Allowance</label>
                        <input
                            type="number"
                            id="preMonthlyallownce"
                            name="preMonthlyallownce"
                            value={programEdit?.preMonthlyallownce}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="postMonthlyallowance">Post-monthly Allowance</label>
                        <input
                            type="number"
                            id="postMonthlyallowance"
                            name="postMonthlyallowance"
                            value={programEdit?.postMonthlyallowance}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="movingAllowance">Moving Allowance</label>
                        <input
                            type="number"
                            id="movingAllowance"
                            name="movingAllowance"
                            value={programEdit?.movingAllowance}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="req1">Requirement 1</label>
                        <textarea
                            id="req1"
                            name="req1"
                            value={programEdit?.req1}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="req2">Requirement 2</label>
                        <textarea
                            id="req2"
                            name="req2"
                            value={programEdit?.req2}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="req3">Requirement 3</label>
                        <textarea
                            id="req3"
                            name="req3"
                            value={programEdit?.req3}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="req4">Requirement 4</label>
                        <textarea
                            id="req4"
                            name="req4"
                            value={programEdit?.req4}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="req5">Requirement 5</label>
                        <textarea
                            id="req5"
                            name="req5"
                            value={programEdit?.req5}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />

                        <label htmlFor="req6">Requirement 6</label>
                        <textarea
                            id="req6"
                            name="req6"
                            value={programEdit?.req6}
                            onChange={(e) => handleEditFormChange(e, programEdit, setProgramEdit)}
                            required
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>

                <Modal 
                    isOpen={showEditHouseholdModal}
                    header='Edit Household'
                    handleClose={() => {setShowEditHouseholdModal(false); setHouseholdToEdit({});}}
                >
                    <form className={styles.programForm} onSubmit={handleHouseholdEdited}>
                        <label htmlFor="partnerStaffName">Team Member</label>
                        <input
                            type="text"
                            id="partnerStaffName"
                            name="partnerStaffName"
                            value={householdToEdit?.partnerStaffName}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="householdName">Household Name</label>
                        <input
                            type="text"
                            id="householdName"
                            name="householdName"
                            value={householdToEdit?.householdName}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="enrollmentDate">Enrollment Date</label>
                        <input
                            type="date"
                            id="enrollmentDate"
                            name="enrollmentDate"
                            value={formatDateForInput(householdToEdit?.enrollmentDate)}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="locationEntry">Location at Entry</label>
                        <input
                            type="text"
                            id="locationEntry"
                            name="locationEntry"
                            value={householdToEdit?.locationEntry}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="motelName">Motel Name</label>
                        <input
                            type="text"
                            id="motelName"
                            name="motelName"
                            value={householdToEdit?.motelName}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="motelAddress">Motel Address</label>
                        <input
                            type="text"
                            id="motelAddress"
                            name="motelAddress"
                            value={householdToEdit?.motelAddress}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="motelZip">Motel Zipcode</label>
                        <input
                            type="text"
                            id="motelZip"
                            name="motelZip"
                            value={householdToEdit?.motelZip}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="educationStatus">Education</label>
                        <input
                            type="text"
                            id="educationStatus"
                            name="educationStatus"
                            value={householdToEdit?.educationStatus}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="employmentType">Employment Type</label>
                        <input
                            type="text"
                            id="employmentType"
                            name="employmentType"
                            value={householdToEdit?.employmentType}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="militaryStatus">Military Service</label>
                        <input
                            type="text"
                            id="militaryStatus"
                            name="militaryStatus"
                            value={householdToEdit?.militaryStatus}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="maritalStatus">Marital Status</label>
                        <input
                            type="text"
                            id="maritalStatus"
                            name="maritalStatus"
                            value={householdToEdit?.maritalStatus}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="incomeSource">Income Source</label>
                        <input
                            type="text"
                            id="incomeSource"
                            name="incomeSource"
                            value={householdToEdit?.incomeSource}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="monthlyIncome">Monthly Income</label>
                        <input
                            type="number"
                            id="monthlyIncome"
                            name="monthlyIncome"
                            value={householdToEdit?.monthlyIncome}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="haveKids">Have kids?</label>
                        <input
                            type="text"
                            id="haveKids"
                            name="haveKids"
                            value={householdToEdit?.haveKids}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="adultCount"># of Adults</label>
                        <input
                            type="number"
                            id="adultCount"
                            name="adultCount"
                            value={householdToEdit?.adultCount}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="kidsCount"># of Kids</label>
                        <input
                            type="number"
                            id="kidsCount"
                            name="kidsCount"
                            value={householdToEdit?.kidsCount}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="adultNameAge">Adult(s) Name/Age</label>
                        <input
                            type="text"
                            id="adultNameAge"
                            name="adultNameAge"
                            value={householdToEdit?.adultNameAge}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="kidsNameAge">Kid(s) Name/Age</label>
                        <input
                            type="text"
                            id="kidsNameAge"
                            name="kidsNameAge"
                            value={householdToEdit?.kidsNameAge}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="prehousingDT">Pre-House Date</label>
                        <input
                            type="date"
                            id="prehousingDT"
                            name="prehousingDT"
                            value={formatDateForInput(householdToEdit?.prehousingDT)}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="apartmentLandlordName">Apartment Name/Landlord</label>
                        <input
                            type="text"
                            id="apartmentLandlordName"
                            name="apartmentLandlordName"
                            value={householdToEdit?.apartmentLandlordName}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="prehousingAddress">Pre-House Address</label>
                        <input
                            type="text"
                            id="prehousingAddress"
                            name="prehousingAddress"
                            value={householdToEdit?.prehousingAddress}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="prehouseCity">Pre-House City</label>
                        <input
                            type="text"
                            id="prehouseCity"
                            name="prehouseCity"
                            value={householdToEdit?.prehouseCity}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="prehoseZip">Pre-House Zipcode</label>
                        <input
                            type="text"
                            id="prehoseZip"
                            name="prehoseZip"
                            value={householdToEdit?.prehoseZip}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="preHouseCounty">Pre-House County</label>
                        <input
                            type="text"
                            id="preHouseCounty"
                            name="preHouseCounty"
                            value={householdToEdit?.preHouseCounty}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="monthlyRent">Monthly Rent</label>
                        <input
                            type="number"
                            id="monthlyRent"
                            name="monthlyRent"
                            value={householdToEdit?.monthlyRent}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="graduationDT">Graduation Date</label>
                        <input
                            type="date"
                            id="graduationDT"
                            name="graduationDT"
                            value={formatDateForInput(householdToEdit?.graduationDT)}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="sureImpactStatus">Sure Impact Status</label>
                        <input
                            type="text"
                            id="sureImpactStatus"
                            name="sureImpactStatus"
                            value={householdToEdit?.sureImpactStatus}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        <label htmlFor="sureImpactNotes">Sure Impact Status</label>
                        <input
                            type="text"
                            id="sureImpactNotes"
                            name="sureImpactNotes"
                            value={householdToEdit?.sureImpactNotes}
                            onChange={(e) => handleEditFormChange(e, householdToEdit, setHouseholdToEdit)}
                            required
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>

                <Modal 
                    isOpen={showCreateHouseholdModal}
                    header='Add Household'
                    handleClose={() => {setShowCreateHouseholdModal(false); setHouseholdForm({});}}
                >
                    <form className={styles.programForm} onSubmit={handleHouseholdCreated}>
                        <label htmlFor="partnerStaffName">Team Member</label>
                        <input
                            type="text"
                            id="partnerStaffName"
                            name="partnerStaffName"
                            value={householdForm?.partnerStaffName}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="fk_User_email">Household Email</label>
                        <input
                            type="email"
                            id="fk_User_email"
                            name="fk_User_email"
                            value={householdForm?.fk_User_email}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="householdName">Household Name</label>
                        <input
                            type="text"
                            id="householdName"
                            name="householdName"
                            value={householdForm?.householdName}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="enrollmentDate">Enrollment Date</label>
                        <input
                            type="date"
                            id="enrollmentDate"
                            name="enrollmentDate"
                            value={householdForm?.enrollmentDate}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="locationEntry">Location at Entry</label>
                        <input
                            type="text"
                            id="locationEntry"
                            name="locationEntry"
                            value={householdForm?.locationEntry}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="motelName">Motel Name</label>
                        <input
                            type="text"
                            id="motelName"
                            name="motelName"
                            value={householdForm?.motelName}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="motelAddress">Motel Address</label>
                        <input
                            type="text"
                            id="motelAddress"
                            name="motelAddress"
                            value={householdForm?.motelAddress}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="motelZip">Motel Zipcode</label>
                        <input
                            type="text"
                            id="motelZip"
                            name="motelZip"
                            value={householdForm?.motelZip}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="educationStatus">Education</label>
                        <input
                            type="text"
                            id="educationStatus"
                            name="educationStatus"
                            value={householdForm?.educationStatus}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="employmentType">Employment Type</label>
                        <input
                            type="text"
                            id="employmentType"
                            name="employmentType"
                            value={householdForm?.employmentType}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="militaryStatus">Military Service</label>
                        <input
                            type="text"
                            id="militaryStatus"
                            name="militaryStatus"
                            value={householdForm?.militaryStatus}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="maritalStatus">Marital Status</label>
                        <input
                            type="text"
                            id="maritalStatus"
                            name="maritalStatus"
                            value={householdForm?.maritalStatus}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="incomeSource">Income Source</label>
                        <input
                            type="text"
                            id="incomeSource"
                            name="incomeSource"
                            value={householdForm?.incomeSource}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="monthlyIncome">Monthly Income</label>
                        <input
                            type="number"
                            id="monthlyIncome"
                            name="monthlyIncome"
                            value={householdForm?.monthlyIncome}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="haveKids">Have kids?</label>
                        <input
                            type="text"
                            id="haveKids"
                            name="haveKids"
                            value={householdForm?.haveKids}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="adultCount"># of Adults</label>
                        <input
                            type="number"
                            id="adultCount"
                            name="adultCount"
                            value={householdForm?.adultCount}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="kidsCount"># of Kids</label>
                        <input
                            type="number"
                            id="kidsCount"
                            name="kidsCount"
                            value={householdForm?.kidsCount}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="adultNameAge">Adult(s) Name/Age</label>
                        <input
                            type="text"
                            id="adultNameAge"
                            name="adultNameAge"
                            value={householdForm?.adultNameAge}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="kidsNameAge">Kid(s) Name/Age</label>
                        <input
                            type="text"
                            id="kidsNameAge"
                            name="kidsNameAge"
                            value={householdForm?.kidsNameAge}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="prehousingDT">Pre-House Date</label>
                        <input
                            type="date"
                            id="prehousingDT"
                            name="prehousingDT"
                            value={householdForm?.prehousingDT}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="apartmentLandlordName">Apartment Name/Landlord</label>
                        <input
                            type="text"
                            id="apartmentLandlordName"
                            name="apartmentLandlordName"
                            value={householdForm?.apartmentLandlordName}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="prehousingAddress">Pre-House Address</label>
                        <input
                            type="text"
                            id="prehousingAddress"
                            name="prehousingAddress"
                            value={householdForm?.prehousingAddress}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="prehouseCity">Pre-House City</label>
                        <input
                            type="text"
                            id="prehouseCity"
                            name="prehouseCity"
                            value={householdForm?.prehouseCity}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="prehoseZip">Pre-House Zipcode</label>
                        <input
                            type="text"
                            id="prehoseZip"
                            name="prehoseZip"
                            value={householdForm?.prehoseZip}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="preHouseCounty">Pre-House County</label>
                        <input
                            type="text"
                            id="preHouseCounty"
                            name="preHouseCounty"
                            value={householdForm?.preHouseCounty}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="monthlyRent">Monthly Rent</label>
                        <input
                            type="number"
                            id="monthlyRent"
                            name="monthlyRent"
                            value={householdForm?.monthlyRent}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="graduationDT">Graduation Date</label>
                        <input
                            type="date"
                            id="graduationDT"
                            name="graduationDT"
                            value={householdForm?.graduationDT}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="sureImpactStatus">Sure Impact Status</label>
                        <input
                            type="text"
                            id="sureImpactStatus"
                            name="sureImpactStatus"
                            value={householdForm?.sureImpactStatus}
                            onChange={(e) => handleFormChange(e, householdForm)}
                            required
                        />
                        <label htmlFor="sureImpactNotes">Sure Impact Status</label>
                        <input
                            type="text"
                            id="sureImpactNotes"
                            name="sureImpactNotes"
                            value={householdForm?.sureImpactNotes}
                            onChange={(e) => handleFormChange(e, householdForm)}
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
