import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Programs.module.css';
import Table from '@/components/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faMinus, faPlus, faEye, faPencil } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/Modal';
import { useStateContext } from '@/context/context';
import axios from "axios";
import Link from 'next/link';

const initialFormState = {
    programName: '',
    programBudget: '',
    prehouseMonths: '',
    posthouseMonths: '',
    preMonthlyallownce: '',
    postMonthlyallowance: '',
    movingAllowance: '',
    req1: '',
    req2: '',
    req3: '',
    req4: '',
    req5: '',
    req6: ''
}

export default function Programs() {
    const { 
		isAuthenticated,
        token,
        user
	} = useStateContext();
    const router = useRouter();
    const [programForm, setProgramForm] = useState(initialFormState);
    const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
    const [showEditProgramModal, setShowEditProgramModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [programs, setPrograms] = useState([]);
    const [programToEdit, setProgramToEdit] = useState({});

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
                Header: 'Name',
                accessor: 'programName'
            },
            {
                Header: 'Budget',
                accessor: 'programBudget'
            },
            {
                Header: 'Prehouse Months',
                accessor: 'prehouseMonths'
            },
            {
                Header: 'Posthouse Months',
                accessor: 'posthouseMonths'
            },
            {
                // Build our expander column
                id: "view", // Make sure it has an ID
                Header: 'View Details',
                Cell: ({ row }) => (
                    <Link
                        href={{
                        pathname: `/partner/programs/${row.original.programID}`,
                        query: { program: JSON.stringify(row.original) },
                        }} as={`/partner/programs/${row.original.programID}`}
                    >
                        <span className={styles.rowAction}>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                    </Link>
                )
            },
            {
                // Build our expander column
                id: "edit", // Make sure it has an ID
                Header: 'Edit',
                Cell: ({ row }) => (
                    <span className={styles.rowAction} onClick={() => {setProgramToEdit(row.original); setShowEditProgramModal(true)}}>
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
                    <p className={styles.expandedHeader}>Premonthly Allowance</p>
                    <p>{row.original.preMonthlyallownce}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Postmonthly Allowance</p>
                    <p>{row.original.postMonthlyallowance}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Moving Allowance</p>
                    <p>{row.original.movingAllowance}</p>
                </span>
            </div>
        ),
        []
    );
    
    useEffect(() => {
        const getPrograms = async () => {
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/program?partnerID=${user.partnerID}`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    setPrograms(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (token) {
            getPrograms();
        }

    }, [token]);

    const createProgram = async (program) => {
        let config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/program`,
            headers: { Authorization: `Bearer ${token}` },
            data: program
        };

        await axios(config)
            .then((response) => {
                setPrograms([...programs, program]);
                setShowCreateProgramModal(false);
                setProgramForm(initialFormState);
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Unable to save. Try again.')
            });
    }

    const editProgram = async (program) => {
        let config = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_URL}/program`,
            headers: { Authorization: `Bearer ${token}` },
            data: program
        };

        await axios(config)
            .then((response) => {
                let tempPrograms = [...programs];
                let index = tempPrograms.findIndex((obj) =>  obj.programID === program.programID)
                tempPrograms[index] = program;
                setPrograms(tempPrograms);
                setShowEditProgramModal(false);
                setProgramToEdit({});
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Unable to save. Try again.')
            });
    }

    const handleProgramForm = () => {
		setShowCreateProgramModal(true);
	};

    const handleFormChange = (event) => {
        let fieldName = event.target.id;
        setProgramForm({...programForm , [fieldName]: event.target.value})
    }

    const handleEditFormChange = (event) => {
        let fieldName = event.target.id;
        setProgramToEdit({...programToEdit , [fieldName]: event.target.value})
    }
    
    const handleProgramCreated = (event) => {
	    event.preventDefault();
        createProgram(programForm)
  	};

    const handleProgramEdited = (event) => {
	    event.preventDefault();
        editProgram(programToEdit)
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
                <div className={styles.programButtons}>
                    <button className={styles.programBtn} onClick={handleProgramForm}>Create Program</button>
                </div>

                <Table
                    tableColumns={columns}
                    tableData={programs}
                    renderRowSubComponent={renderRowSubComponent}
                />

                <Modal 
                    isOpen={showCreateProgramModal}
                    header='Create Program'
                    handleClose={() => {setShowCreateProgramModal(false); setProgramForm(initialFormState);}}
                >
                    <form className={styles.programForm} onSubmit={handleProgramCreated}>
                        <label htmlFor="programName">Program Name</label>
                        <input
                            type="text"
                            id="programName"
                            name="programName"
                            value={programForm.programName}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="programBudget">Budget</label>
                        <input
                            type="number"
                            id="programBudget"
                            name="programBudget"
                            value={programForm.programBudget}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="prehouseMonths">Pre-house Months</label>
                        <input
                            type="number"
                            id="prehouseMonths"
                            name="prehouseMonths"
                            value={programForm.prehouseMonths}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="posthouseMonths">Post-house Months</label>
                        <input
                            type="number"
                            id="posthouseMonths"
                            name="posthouseMonths"
                            value={programForm.posthouseMonths}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="preMonthlyallownce">Pre-monthly Allowance</label>
                        <input
                            type="number"
                            id="preMonthlyallownce"
                            name="preMonthlyallownce"
                            value={programForm.preMonthlyallownce}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="postMonthlyallowance">Post-monthly Allowance</label>
                        <input
                            type="number"
                            id="postMonthlyallowance"
                            name="postMonthlyallowance"
                            value={programForm.postMonthlyallowance}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="movingAllowance">Moving Allowance</label>
                        <input
                            type="number"
                            id="movingAllowance"
                            name="movingAllowance"
                            value={programForm.movingAllowance}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req1">Requirement 1</label>
                        <textarea
                            id="req1"
                            name="req1"
                            value={programForm.req1}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req2">Requirement 2</label>
                        <textarea
                            id="req2"
                            name="req2"
                            value={programForm.req2}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req3">Requirement 3</label>
                        <textarea
                            id="req3"
                            name="req3"
                            value={programForm.req3}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req4">Requirement 4</label>
                        <textarea
                            id="req4"
                            name="req4"
                            value={programForm.req4}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req5">Requirement 5</label>
                        <textarea
                            id="req5"
                            name="req5"
                            value={programForm.req5}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="req6">Requirement 6</label>
                        <textarea
                            id="req6"
                            name="req6"
                            value={programForm.req6}
                            onChange={handleFormChange}
                            required
                        />
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>

                <Modal 
                    isOpen={showEditProgramModal}
                    header='Edit Program'
                    handleClose={() => {setShowEditProgramModal(false); setProgramToEdit({});}}
                >
                    <form className={styles.programForm} onSubmit={handleProgramEdited}>
                        <label htmlFor="programName">Program Name</label>
                        <input
                            type="text"
                            id="programName"
                            name="programName"
                            value={programToEdit.programName}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="programBudget">Budget</label>
                        <input
                            type="number"
                            id="programBudget"
                            name="programBudget"
                            value={programToEdit.programBudget}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="prehouseMonths">Pre-house Months</label>
                        <input
                            type="number"
                            id="prehouseMonths"
                            name="prehouseMonths"
                            value={programToEdit.prehouseMonths}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="posthouseMonths">Post-house Months</label>
                        <input
                            type="number"
                            id="posthouseMonths"
                            name="posthouseMonths"
                            value={programToEdit.posthouseMonths}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="preMonthlyallownce">Pre-monthly Allowance</label>
                        <input
                            type="number"
                            id="preMonthlyallownce"
                            name="preMonthlyallownce"
                            value={programToEdit.preMonthlyallownce}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="postMonthlyallowance">Post-monthly Allowance</label>
                        <input
                            type="number"
                            id="postMonthlyallowance"
                            name="postMonthlyallowance"
                            value={programToEdit.postMonthlyallowance}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="movingAllowance">Moving Allowance</label>
                        <input
                            type="number"
                            id="movingAllowance"
                            name="movingAllowance"
                            value={programToEdit.movingAllowance}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="req1">Requirement 1</label>
                        <textarea
                            id="req1"
                            name="req1"
                            value={programToEdit.req1}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="req2">Requirement 2</label>
                        <textarea
                            id="req2"
                            name="req2"
                            value={programToEdit.req2}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="req3">Requirement 3</label>
                        <textarea
                            id="req3"
                            name="req3"
                            value={programToEdit.req3}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="req4">Requirement 4</label>
                        <textarea
                            id="req4"
                            name="req4"
                            value={programToEdit.req4}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="req5">Requirement 5</label>
                        <textarea
                            id="req5"
                            name="req5"
                            value={programToEdit.req5}
                            onChange={handleEditFormChange}
                            required
                        />

                        <label htmlFor="req6">Requirement 6</label>
                        <textarea
                            id="req6"
                            name="req6"
                            value={programToEdit.req6}
                            onChange={handleEditFormChange}
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
