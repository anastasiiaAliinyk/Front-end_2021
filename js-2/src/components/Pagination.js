import { makeStyles } from '@material-ui/core/styles';
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

export const PaginationCustomers = ({ count, onChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination
                variant="outlined"
                count={count}
                onChange={(_, page) => onChange(page)}
            />
        </div>
    );
}