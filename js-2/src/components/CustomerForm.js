import { useState } from "react";
import PropTypes from 'prop-types';

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '350px'
    },
    formControl: {
        marginTop: theme.spacing(2),

        '& > *': {
            marginBottom: '15px',
        },
    },
}));

export const CustomerForm = ({
    dialogTitle,
    dialogContent,
    customer,
    onClose,
    onSave
}) => {
    const classes = useStyles();
    const [contact, setContact] = useState(customer.name || '');
    const [company, setCompany] = useState(customer.company || '');
    const [address, setAddress] = useState(customer.address || '');
    const [country, setCountry] = useState(customer.country || '');
    const [city, setCity] = useState(customer.city || '');

    const checkInputs = () => {
        return contact && company && address && country && city;
    }

    const handleSave = (id) => {
        const customer = {
            contact,
            company,
            address,
            country,
            city
        }
        onSave(id, customer);
        onClose();
    };

    return (
        <>
            <DialogTitle id="form-dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogContent}
                </DialogContentText>
                <form className={classes.form} method='POST'>
                    <FormControl className={classes.formControl}>
                        <TextField
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            name="company"
                            label="Company Name"
                            variant="outlined"
                            required
                        />
                        <TextField
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            name="name"
                            label="Contact Name"
                            variant="outlined"
                            required
                        />
                        <TextField
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            label="Address"
                            variant="outlined"
                            required
                        />
                        <TextField
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            name="city"
                            label="City"
                            variant="outlined"
                            required
                        />
                        <TextField
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            name="country"
                            label="Country"
                            variant="outlined"
                            required
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={() => handleSave(customer._id)}
                    color="primary"
                    disabled={!checkInputs()}
                >
                    Save
                </Button>
            </DialogActions>
        </>
    )
}

CustomerForm.propTypes = {
    dialogTitle: PropTypes.string.isRequired,
    dialogContent: PropTypes.string.isRequired,
    customer: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
}