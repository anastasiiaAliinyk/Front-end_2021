import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',

        '& > *': {
            marginTop: theme.spacing(2),
        },
        '& > .MuiPagination-root .MuiPaginationItem-root': {
            minWidth: '40px',
            height: '40px',
            margin: '0',

            fontSize: '1rem',
            color: 'gray',
            borderRadius: 'unset',
        },
        '& > .MuiPagination-root .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: 'rgb(64, 81, 181)',
            color: 'white',
        }
    },
}));

export const PaginationCustomers = ({ page, count, onChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination
                variant="outlined"
                page={page}
                count={count}
                onChange={(_, page) => onChange(page)}
            />
        </div>
    );
}

PaginationCustomers.propTypes = {
    count: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
