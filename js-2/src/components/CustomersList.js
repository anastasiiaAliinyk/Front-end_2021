import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CustomerForm } from './CustomerForm';
import { PaginationCustomers } from './Pagination';

import Dialog from "@material-ui/core/Dialog";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import { deleteCustomer, updateCustomer } from '../api/api';

const headCells = [
    { id: 'company', numeric: false, disablePadding: true, label: 'Company Name' },
    { id: 'contact', numeric: true, disablePadding: false, label: 'Contact Name' },
    { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
    { id: 'city', numeric: true, disablePadding: false, label: 'City' },
    { id: 'country', numeric: true, disablePadding: false, label: 'Country' },
    { id: 'settings', numeric: true, disablePadding: false, label: ' ' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all customers' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        className={classes.tableCell}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        border: "1px solid lightgray",
        minWidth: 750,
    },
    tableCell: {
        color: 'gray',
    }
}));

const customersPerPage = 7;

export const CustomersList = ({ customers, onDeleteCustomer, onEditCustomer, setAll }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [visibleCustomers, setVisibleCustomers] = useState([]);

    useEffect(() => {
        setVisibleCustomers(customers.slice(0, customersPerPage));
    }, [customers])

    const handleChangePage = (page) => {
        const pageOffset = (page - 1) * customersPerPage;
        setVisibleCustomers(customers.slice(pageOffset, pageOffset + customersPerPage));
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = visibleCustomers.map(customer => customer._id);
            setSelected(newSelected);
            setAll(newSelected);
            return;
        }
        setSelected([]);
        setAll([]);
    };

    const handleClick = (event, id, customer) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        setSelectedCustomer(customer);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteCustomer = (id) => {
        deleteCustomer(id)
            .then(() => onDeleteCustomer(id));
    };

    const handleEditCustomer = (updates) => {
        updateCustomer(updates._id, updates)
            .then(onEditCustomer(updates._id, updates))
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={visibleCustomers.length}
                        />
                        <TableBody>
                            {visibleCustomers
                                .map((customer, index) => {
                                    const isItemSelected = isSelected(customer._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, customer._id, customer)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={customer._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {customer.company}
                                            </TableCell>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.address}</TableCell>
                                            <TableCell>{customer.city}</TableCell>
                                            <TableCell>{customer.country}</TableCell>
                                            <TableCell align="right">
                                                <div className={classNames('actions', { active: isItemSelected && selected.length === 1})}>
                                                    <EditIcon
                                                        className='edit-icon'
                                                        onClick={() => handleClickOpen()}
                                                    />
                                                    <HighlightOffIcon
                                                        className='delete-icon'
                                                        onClick={() => handleDeleteCustomer(customer._id)}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <CustomerForm
                        dialogTitle='Edit the Customer'
                        dialogContent='You can edit the Customer'
                        customer={selectedCustomer}
                        onClose={handleClose}
                        onSave={handleEditCustomer}
                    />
                </Dialog>
            </Paper>
            <PaginationCustomers
                count={Math.ceil((customers.length) / customersPerPage)}
                onChange={handleChangePage} />
        </div>
    );
}
