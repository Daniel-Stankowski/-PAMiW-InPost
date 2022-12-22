import React, {useEffect, useState} from 'react';
import {parcelsApi} from "../../api/parcelsApi";
import {useKeycloak} from "@react-keycloak/web";
import Parcel from './Parcel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
function ParcelList() {
    const {keycloak} = useKeycloak()
    const [parcels, setParcels] = useState([])

    useEffect(() => {
        parcelsApi.getAll(keycloak.token).then((res) => {
            setParcels(res.data)
        })
    }, []);

    const remove = (id) => {
        parcelsApi.delete(id, keycloak.token).then(() => {
            setParcels((parcels) => parcels.filter((parcel) => parcel.id !== id))
        })
    }

    const parcelList = parcels.map( parcel => <Parcel parcel={parcel} />)

    

    return (<Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <TableContainer component={Paper} sx={{ width: '150vh' }}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {parcelList}
                {console.log(keycloak)}
            </TableBody>
            </Table>
        </TableContainer>
    </Box>)
}

export default ParcelList;