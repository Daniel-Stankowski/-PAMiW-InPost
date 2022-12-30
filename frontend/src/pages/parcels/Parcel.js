import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
function Parcel(props) {
    const navigate = useNavigate()
    const remove = () => {
        props.removeParcel(props.parcel.id)
    }
    const navigateToParcel = () => {
        navigate(`/parcels/${props.parcel.id}`)
    }
    return (<TableRow>
        <TableCell>{props.parcel.id}</TableCell>
        <TableCell>{props.parcel.name}</TableCell>
        <TableCell>{props.parcel.sender.username}</TableCell>
        <TableCell>{props.parcel.receiver.username}</TableCell>
        <TableCell>{props.parcel.state}</TableCell>
        <TableCell><IconButton onClick={remove} ><DeleteIcon></DeleteIcon></IconButton></TableCell>
        <TableCell><IconButton><ArrowForwardIosIcon onClick={navigateToParcel}></ArrowForwardIosIcon></IconButton></TableCell>
    </TableRow>)
}

export default Parcel;