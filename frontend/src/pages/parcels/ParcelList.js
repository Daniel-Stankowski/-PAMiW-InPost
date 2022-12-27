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
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { flexbox } from '@mui/system';
function ParcelList() {
    const {keycloak} = useKeycloak()
    const [parcels, setParcels] = useState([])
    const [openModal, setOpenModal] = useState(true)
    useEffect(() => {
        parcelsApi.getAll(keycloak.token).then((res) => {
            setParcels(res.data)
        })
    }, []);
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
    // const remove = (id) => {
    //     parcelsApi.delete(id, keycloak.token).then(() => {
    //         setParcels((parcels) => parcels.filter((parcel) => parcel.id !== id))
    //    })
    // }

    const parcelList = parcels.map( parcel => <Parcel parcel={parcel} />)
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    

    return (<Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx ={styleModal}>
                <TextField sx={{pb: 3}} id="name" label="name" variant="outlined" />
                <TextField sx={{pb: 3}} id="sender-locker" label="sender locker" variant="outlined" />
                <TextField id="reciver-locker" label="reciver locker" variant="outlined" />
            </Box>
        </Modal>
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