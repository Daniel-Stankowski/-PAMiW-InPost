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
import { Box, Button, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {keycloakUsersApi} from "../../api/keycloakUsersApi"
import { parcelLockersApi } from '../../api/parcelLockersApi';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
function ParcelList() {
    const {keycloak} = useKeycloak()
    const [parcels, setParcels] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [lockerNames, setLockerNames] = useState([])
    const [usernames, setUsernames] = useState([])
    const [receiver, setReciver] = useState('')
    const [toLocker, setToLocker] = useState('')
    const [fromLocker, setFromLocker] = useState('')
    const [name, setName] = useState('')

    const handleReciverChange = (event) => {
        setReciver(event.target.value)
    }
    const handleToLockerChange = (event) => {
        setToLocker(event.target.value)
    }
    const handleFromLockerChange = (event) => {
        setFromLocker(event.target.value)
    }
    const handleFormNameChange = (event) => {
        setName(event.target.value)
    }
    const addParcel = () => {
        let parcel = {
            name: name,
            from_locker: {
                name: fromLocker
            },
            to_locker: {
                name: toLocker
            },
            receiver: {
                username: receiver
            },
            sender: {
                keycloak_id: keycloak.subject
            }
        }
        parcelsApi.create(parcel, keycloak.token).then((res) => {
            parcelsApi.getByUser(keycloak.subject,keycloak.token).then((res) => {
                setParcels(res.data)
            })
        })
        setOpenModal(false)
    }
    useEffect(() => {
        parcelsApi.getByUser(keycloak.subject,keycloak.token).then((res) => {
            setParcels(res.data)
        })
        keycloakUsersApi.getAllUsernames(keycloak.token).then((res) => {
            setUsernames(res.data)
        })
        parcelLockersApi.getAllNames(keycloak.token).then((res) => {
            setLockerNames(res.data)
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
      
    const remove = (id) => {
        parcelsApi.delete(id, keycloak.token).then(() => {
            parcelsApi.getByUser(keycloak.subject,keycloak.token).then((res) => {
                setParcels(res.data)
            })
       })
    }

    const parcelList = parcels.map( parcel => <Parcel parcel={parcel} removeParcel={remove} />)
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        setFromLocker('')
        setToLocker('')
        setName('')
        setReciver('')
        setOpenModal(true)
    }
    

    return (<Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx ={styleModal}>
                <FormControl sx={{gap: 3}}>
                <FormHelperText id="helper">Input parcel details</FormHelperText>
                    <TextField id="name" label="name" variant="outlined" value={name} onChange={handleFormNameChange} />
                    <TextField select variant='outlined' label='reciver' id='reciver' value={receiver} onChange={handleReciverChange}>
                        {usernames.map( username => <MenuItem value={username}>{username}</MenuItem>)}
                    </TextField>
                    <TextField select id="sender-locker" label="from locker" variant="outlined" value={fromLocker} onChange={handleFromLockerChange} >
                        {lockerNames.map(lockerName => <MenuItem value={lockerName}>{lockerName}</MenuItem>)}
                    </TextField>
                    <TextField select id="reciver-locker" label="to locker" variant="outlined" value={toLocker} onChange={handleToLockerChange} >
                        {lockerNames.map(lockerName => <MenuItem value={lockerName}>{lockerName}</MenuItem>)}
                    </TextField>
                    <Button onClick={addParcel} variant='outlined' disabled={name === '' || receiver === '' || toLocker === '' || fromLocker === ''}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1}}>Send</Typography><SendIcon/></Button>
                </FormControl>
            </Box>
        </Modal>
        <Fab
            size="large"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{position: 'absolute', top: '90%', left: '92%', background: '#AEC2BF'}}>
            <AddIcon sx={{fill: 'black'}} onClick={handleOpenModal}/>
        </Fab>
        <TableContainer component={Paper} sx={{ width: '150vh', background: '#AEC2BF' }}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>sender</TableCell>
                    <TableCell>reciver</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell sx={{width: '6%'}}></TableCell>
                    <TableCell sx={{width: '6%'}}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {parcelList}
            </TableBody>
            </Table>
        </TableContainer>
    </Box>)
}

export default ParcelList;