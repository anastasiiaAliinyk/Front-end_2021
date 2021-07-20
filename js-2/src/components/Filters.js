import {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    form: {
        width: "max-content",

        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
    input: {
        opacity: 0.5,
    },
    btn: {
        width: "max-content",
        padding: "15px 30px",
    }
}));

export const Filters = ({ onFilter }) => {
    const [company, setCompany] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'company':
                setCompany(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                throw new Error('Wrong name');
        }
    }

    useEffect(() => {
        onFilter({
            'company': company,
            'name': name,
            'address': address,
        });
    }, [company, name, address, onFilter]);

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
                value={company}
                name="company"
                onChange={handleChange}
                className={classes.input}
                label="Company Name"
                variant="outlined"
                required
            />
            <TextField
                value={name}
                name="name"
                onChange={handleChange}
                className={classes.input}
                label="Contact Name"
                variant="outlined"
                required
            />
            <TextField
                value={address}
                name="address"
                onChange={handleChange}
                className={classes.input}
                label="Address"
                variant="outlined"
                required
            />
            <Button
                className={classes.btn}
                variant="contained"
                color="primary"
            >
                Filter
            </Button>
        </form>
    )
}

Filters.propTypes = {
    onFilter: PropTypes.func.isRequired,
}