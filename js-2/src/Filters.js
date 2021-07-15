import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
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

export const Filters = () => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.input} label="Company Name" variant="outlined" required />
            <TextField className={classes.input}  label="Contact Name" variant="outlined" required />
            <TextField className={classes.input}  label="Address" variant="outlined" required />
            <Button className={classes.btn} variant="contained" color="primary">
                Filter
            </Button>
        </form>
    )
}