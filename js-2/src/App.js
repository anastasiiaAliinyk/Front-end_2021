import { useEffect, useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Filters } from './components/Filters';
import { CustomersList } from './components/CustomersList';
import { Loading } from './components/Loading';
import { CustomerForm } from './components/CustomerForm';

import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

import { deleteCustomer, getCustomers, saveCustomer } from './api/api';
import './App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tooltips: {
        width: "15%",
        display: "flex",
        justifyContent: "flex-end",

        '& > *': {
            margin: theme.spacing(2),

        },
    },
}));

function getUniqueString() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return array.join('');
}

function App() {
    const classes = useStyles();
    const [customers, setCustomers] = useState(null);
    const [filterBy, setFilterBy] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    useEffect(() => {
        getCustomers()
            .then(setCustomers);
    }, []);

    const filterCustomers = () => {
        if (customers === null) {
            return;
        }
        return customers.filter(customer =>
            (!filterBy.name || customer.name.toLowerCase().includes(filterBy.name.toLowerCase()))
            && (!filterBy.address || customer.address.toLowerCase().includes(filterBy.address.toLowerCase()))
            && (!filterBy.company || customer.company.toLowerCase().includes(filterBy.company.toLowerCase()))
        );
    }

    const filteredCustomers = useMemo(() => {
        return filterCustomers();
    }, [filterBy, customers, filterCustomers])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAll = () => {
        let number = 0;

        const removeCustomer = (id) => {
            deleteCustomer(id).then(() => {
                handleDeleteCustomer(selectedCustomers[number]);

                if (number < selectedCustomers.length - 1) {
                    setTimeout(() => {
                        removeCustomer(selectedCustomers[++number])
                    }, 100);
                } else {
                    setSelectedCustomers([]);
                }
            });
        }
        removeCustomer(selectedCustomers[number]);
    }

    const addCustomer = (customer) => {
        setCustomers(customers => [customer, ...customers]);
    }

    const handleSaveCustomer = (customer) => {
        const id = getUniqueString();
        const newCustomer = {
            ...customer,
            _id: id,
            email: 'forbeshays@xurban.com',
            phone: '+1 (874) 417-3818'
        }
        saveCustomer(newCustomer)
            .then(addCustomer)
            .then(() => setOpen(false));
    }

    const handleDeleteCustomer = (id) => {
        setCustomers(customers => customers.filter(customer => customer._id !== id));
    }

    const handleUpdateCustomer = (customerId, updates) => {
        setCustomers(customers => customers.map(customer => {
            if(customer._id === customerId) {
                return {...customer, ...updates}
            }
            return customer;
        }))
    }

    if (!customers) {
        return (
            <Loading />
        )
    }

    return (
       <>
            <Navbar />
            <div className={classes.root}>
                <Filters onFilter={setFilterBy}/>
                <div className={classes.tooltips}>
                    {selectedCustomers.length > 0 && (
                        <Tooltip title="Delete" onClick={handleDeleteAll}>
                            <IconButton aria-label="delete">
                                <DeleteForeverIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Add" aria-label="add" onClick={handleClickOpen}>
                        <Fab color="secondary">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <CustomerForm
                            dialogContent='You need to fill all inputs'
                            dialogTitle='Add new Customer'
                            onSave={handleSaveCustomer}
                            onClose={handleClose}
                        />
                    </Dialog>
                </div>
            </div>
            <CustomersList
                customers={filteredCustomers}
                onDeleteCustomer={handleDeleteCustomer}
                onEditCustomer={handleUpdateCustomer}
                setAll={setSelectedCustomers}
            />
        </>
    );
}

export default App;
