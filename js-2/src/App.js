import { useEffect, useState, useRef, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Filters } from './components/Filters';
import { CustomersList } from './components/CustomersList';
import { Loading } from './components/Loading';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

import {deleteCustomer, getCustomers, saveCustomer} from './api/api';
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,

        '& > *': {
            marginBottom: '15px',
        },
    },
}));

function getUniqueString() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return array.join('');
}

function App() {
    const [customers, setCustomers] = useState(null);
    const [filterBy, setFilterBy] = useState('');
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [open, setOpen] = useState(false);
    const formRef = useRef(null);
    const classes = useStyles();

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

    const handleSave = () => {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    };

    const handleDeleteAll = () => {
        let number = 0;

        const removeCustomer = (id) => {
            deleteCustomer(id).then(() => {
                if (number < customers.length - 1) {
                    setTimeout(() => {
                        removeCustomer(customers[++number]._id)
                    }, 100);
                } else {
                    setCustomers([]);
                }
            });
        }
        removeCustomer(customers[number]._id);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const id = getUniqueString();

        const requiredValues = data.get('company') && data.get('contact')
            && data.get('address') && data.get('city') && data.get('country');

        if (requiredValues) {
            saveCustomer({
                "_id": id,
                "name": data.get('contact'),
                "company": data.get('company'),
                "address": data.get('address'),
                "city": data.get('city'),
                "country": data.get('country'),
                "email": "forbeshays@xurban.com",
                "phone": "+1 (874) 417-3818"
            })
                .then(addCustomer)
                .then(() => setOpen(false));
        }
    }

    const addCustomer = (customer) => {
        setCustomers(customers => [...customers, customer]);
    }

    const deleteOneCustomer = (id) => {
        setCustomers(customers => customers.filter(customer => customer._id !== id));
    }

    const updateCustomer = (customerId, updates) => {
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
                    {isSelectedAll && (
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
                        <DialogTitle id="form-dialog-title">Add new Customer</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To add new Customer to the table, please fill all inputs here.
                            </DialogContentText>
                            <form className={classes.form} ref={formRef} onSubmit={onFormSubmit} method='POST'>
                                <FormControl className={classes.formControl}>
                                    <TextField name="company" label="Company Name" variant="outlined" required />
                                    <TextField name="contact" label="Contact Name" variant="outlined" required />
                                    <TextField name="address" label="Address" variant="outlined" required />
                                    <TextField name="city" label="City" variant="outlined" required />
                                    <TextField name="country" label="Country" variant="outlined" required />
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <CustomersList
                customers={filteredCustomers}
                onDeleteCustomer={deleteOneCustomer}
                onEditCustomer={updateCustomer}
                setAll={setIsSelectedAll}
            />
        </>
    );
}

export default App;
