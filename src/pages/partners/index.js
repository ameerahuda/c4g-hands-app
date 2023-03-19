import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Partners.module.css';
import Table from '@/components/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/Modal';
import { useStateContext } from '@/context/context';
import axios from "axios";

const initialFormState = {
    partnerName: '',
    partnerAddress: '',
    partnerBudget: ''
}

export default function Partners() {
    const { 
		isAuthenticated,
        token
	} = useStateContext();
    const [partnerForm, setPartnerForm] = useState(initialFormState);
	const [partnerCreated, setPartnerCreated] = useState(false);
    const [showCreatePartnerModal, setShowCreatePartnerModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const getPartners = async () => {
            console.log('in getPartners token', token)
            let config = {
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_API_URL}/partner`,
                headers: { Authorization: `Bearer ${token}` }
            };
    
            await axios(config)
                .then((response) => {
                    console.log('partners', response);
                    setPartners(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (token) {
            getPartners();
        }

    }, [token])

    const createPartner = async (partner) => {
        let config = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/partner`,
            headers: { Authorization: `Bearer ${token}` },
            data: partner
        };

        await axios(config)
            .then((response) => {
                setPartners([...partners, partner])
                setPartnerCreated(true);
                setShowCreatePartnerModal(false);
                setPartnerForm(initialFormState);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const columns = useMemo(
        () => [
            {
                // Build our expander column
                id: "expander", // Make sure it has an ID
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                    {isAllRowsExpanded ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                ),
                Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronRight} />}
                    </span>
                )
            },
            {
                Header: 'Name',
                accessor: 'partnerName'
            },
            {
                Header: 'Address',
                accessor: 'partnerAddress'
            },
            {
                Header: 'Budget',
                accessor: 'partnerBudget'
            },
            {
                Header: 'Number of Households',
                accessor: 'numOfHouseholds'
            }
        ], []
    )

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <div className={styles.expandedContent}>
                <span>
                    <p className={styles.expandedHeader}>Money Spent</p>
                    <p>{row.original.moneySpent}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Money Remaining</p>
                    <p>{row.original.moneyRemaining}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Households Completed</p>
                    <p>{row.original.householdsCompleted}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Households Dropped</p>
                    <p>{row.original.householdsDropped}</p>
                </span>
                <span>
                    <p className={styles.expandedHeader}>Households In Progress</p>
                    <p>{row.original.householdsInProgress}</p>
                </span>
            </div>
        ),
        []
    );

    const handlePartnerForm = () => {
		setShowCreatePartnerModal(true);
	};

    const handleFormChange = (event) => {
        let fieldName = event.target.id;
        setPartnerForm({...partnerForm , [fieldName]: event.target.value})
    }

    const validateForm = () => {
        let valid = true;

        if (partnerForm.partnerName.length === 0) {
            valid = false;
        } else if (partnerForm.partnerAddress.length === 0) {
            valid = false;
        } else if (partnerForm.partnerBudget < 0) {
            valid = false;
            setErrorMessage('Budget cannot be less than 0.')
        }

        return valid;
    }

    const handlePartnerCreated = (event) => {
	    event.preventDefault();
	    // Save partner details here

        if (validateForm()) {
            createPartner(partnerForm)
        }
  	};

    const getExportCSVUrl = () => {
        const csvData = [];

        let headerRow = ['Id', 'Name', 'Address', 'Budget', 'Number of Households', 'Money Spent', 'Money Remaining', 'Households Completed', 'Households Dropped', 'Households In Progress'];

        csvData.push(headerRow);
        partners.forEach(item => {
            console.log('item', item)
            csvData.push(Object.values(item));
        });

        let csvContent = '';

        csvData.forEach(row => {
            csvContent += row.join(';') + '\n';
        });

        const strToBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
        const objUrl = URL.createObjectURL(strToBlob);
        return objUrl;
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
                <div className={styles.partnerButtons}>
                    <button className={styles.partnerBtn} onClick={handlePartnerForm}>Create Partner</button>
                    <button className={styles.partnerBtn}>
                        <a href={getExportCSVUrl()} download='PartnerInformation'>Export Partner Information
                        </a>
                    </button>
                </div>

                <Table
                    tableColumns={columns}
                    tableData={partners}
                    renderRowSubComponent={renderRowSubComponent}
                />

                <Modal 
                    isOpen={showCreatePartnerModal}
                    header='Create Partner'
                    handleClose={() => {setShowCreatePartnerModal(false); setPartnerForm(initialFormState);}}
                >
                    <form className={styles.partnerForm} onSubmit={handlePartnerCreated}>
                        <label htmlFor="partnerName">Partner Name</label>
                        <input
                            type="text"
                            id="partnerName"
                            name="partnerName"
                            value={partnerForm.partnerName}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="partnerAddress">Address</label>
                        <textarea
                            id="partnerAddress"
                            name="partnerAddress"
                            value={partnerForm.partnerAddress}
                            onChange={handleFormChange}
                            required
                        />

                        <label htmlFor="partnerBudget">Budget</label>
                        <input
                            type="number"
                            id="partnerBudget"
                            name="partnerBudget"
                            value={partnerForm.partnerBudget}
                            onChange={handleFormChange}
                            required
                        />
                        {errorMessage && <p>{errorMessage}</p>}
                        <button type="submit">Save</button>
                    </form>
                </Modal>
            </main>
        </>
    )
}
