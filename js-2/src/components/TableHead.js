import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const headCells = [
    { id: 'company', numeric: false, disablePadding: true, label: 'Company Name' },
    { id: 'contact', numeric: true, disablePadding: false, label: 'Contact Name' },
    { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
    { id: 'city', numeric: true, disablePadding: false, label: 'City' },
    { id: 'country', numeric: true, disablePadding: false, label: 'Country' },
    { id: 'settings', numeric: true, disablePadding: false, label: ' ' },
];

export const EnhancedTableHead = (props) => {
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
