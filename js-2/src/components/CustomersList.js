import {
    useEffect,
    useState
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CustomerForm } from './CustomerForm';
import { PaginationCustomers } from './Pagination';
import { EnhancedTableHead } from './TableHead';

import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import {
    deleteCustomer,
    updateCustomer
} from '../api/api';
import { CUSTOMERS_PER_PAGE } from '../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        border: '1px solid lightgray',
        minWidth: 750,
    },
    tableCell: {
        color: 'gray',
    }
}));

export const CustomersList = ({ page, setPage, customers, onDeleteCustomer, onEditCustomer, setAll }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [visibleCustomers, setVisibleCustomers] = useState([]);

    useEffect(() => {
        const pageOffset = (page - 1) * CUSTOMERS_PER_PAGE;
        setVisibleCustomers(customers.slice(pageOffset, pageOffset + CUSTOMERS_PER_PAGE));
        setSelected((selected) => selected.filter(selectedId =>
            customers.some(customer => customer._id === selectedId)
        ));
    }, [customers, page]);

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

    const handleClickCustomer = (event, id, customer) => {
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

    const handleClickClose = () => {
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

    const handlePageChange = (page) => {
        setPage(page);
        setSelected([]);
        setAll([]);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        aria-label='enhanced table'
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
                                            onClick={(event) => handleClickCustomer(event, customer._id, customer)}
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={customer._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component='th' id={labelId} scope='row' padding='none'>
                                                {customer.company}
                                            </TableCell>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.address}</TableCell>
                                            <TableCell>{customer.city}</TableCell>
                                            <TableCell>{customer.country}</TableCell>
                                            <TableCell align='right'>
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
                <Dialog open={open} onClose={handleClickClose} aria-labelledby='form-dialog-title'>
                    <CustomerForm
                        dialogTitle='Edit the Customer'
                        dialogContent='You can edit the Customer'
                        customer={selectedCustomer}
                        onClose={handleClickClose}
                        onSave={handleEditCustomer}
                    />
                </Dialog>
            </Paper>
            <PaginationCustomers
                page={page}
                count={Math.ceil((customers.length) / CUSTOMERS_PER_PAGE)}
                onChange={handlePageChange} />
        </div>
    );
}

CustomersList.propTypes = {
    customers: PropTypes.array.isRequired,
    onDeleteCustomer: PropTypes.func.isRequired,
    onEditCustomer: PropTypes.func.isRequired,
    setAll: PropTypes.func.isRequired,
};
