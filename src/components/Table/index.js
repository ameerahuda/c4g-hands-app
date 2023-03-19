import React, { useEffect, useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import PropTypes from 'prop-types';

import styles from '@/styles/Table.module.css';

const Table = ({ tableColumns, tableData, renderRowSubComponent }) => {
	const columns = tableColumns;

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		visibleColumns,
		state: { expanded },
	} = useTable({
		columns,
		data: tableData
	}, useExpanded);

	return (
		<div className={styles.table}>
			<table {...getTableProps()} className={styles.tableContainer}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr key={index} {...headerGroup.getHeaderGroupProps()} className={styles.tableHeader}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
					</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, index) => {
						prepareRow(row);

						return (
							<React.Fragment key={index}>
								<tr {...row.getRowProps()} className={styles.tableBodyRow}>
									{row.cells.map(cell => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
								{row.isExpanded ? (
									<tr>
										<td colSpan={visibleColumns.length}>
											{renderRowSubComponent({ row })}
										</td>
									</tr>
									) : null
								}
							</React.Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

Table.propTypes = {
	columns: PropTypes.array
}

export default Table;
