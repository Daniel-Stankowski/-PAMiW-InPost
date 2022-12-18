import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
function Parcel(props) {
    return (<TableRow>
        <TableCell>{props.parcel.id}</TableCell>
        <TableCell>{props.parcel.name}</TableCell>
        <TableCell>{props.parcel.status}</TableCell>
    </TableRow>)
}

export default Parcel;