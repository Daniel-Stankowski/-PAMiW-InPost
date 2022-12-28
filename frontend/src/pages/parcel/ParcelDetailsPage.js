import * as React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { parcelsApi } from '../../api/parcelsApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SendIcon from '@mui/icons-material/Send';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import EditIcon from '@mui/icons-material/Edit';
import {keycloakUsersApi} from "../../api/keycloakUsersApi"
import { parcelLockersApi } from '../../api/parcelLockersApi';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box, Button, MenuItem } from '@mui/material';
function ParcelDetailsList() {
    const {keycloak} = useKeycloak();
    const {parcelId} = useParams()
    const [parcel, setParcel] = useState({})
    const [receiver, setReciver] = useState({})
    const [sender, setSender] = useState({})
    const [toLocker, setToLocker] = useState({})
    const [fromLocker, setFromLocker] = useState({})
    const [lockerNames, setLockerNames] = useState([])
    const [usernames, setUsernames] = useState([])
    const [receiverEdit, setReciverEdit] = useState('')
    const [toLockerEdit, setToLockerEdit] = useState('')
    const [fromLockerEdit, setFromLockerEdit] = useState('')
    const [nameEdit, setNameEdit] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const steps = [
        'Posted',
        'Transferring',
        'Delivered',
        'Recived'
      ];
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const stateMappings = {
        POSTED: 1,
        TRANSFERRING: 2,
        DELIVERED: 3,
        RECEIVED: 4
    }
    const editParcel = () => {
        let parcelToSend = {
             id: parcelId,
             name: nameEdit,
             receiver: {
                username: receiverEdit
             },
             to_locker: {
                name: toLockerEdit
             },
             from_locker: {
                name: fromLockerEdit
             },
             sender: sender,
             state: parcel.state
        }
        parcelsApi.update(parcelId, parcelToSend, keycloak.token).then((res) => {
            parcelsApi.getById(parcelId, keycloak.token).then((res) => {
                setParcel(res.data)
                setReciver(res.data.receiver)
                setSender(res.data.sender)
                setToLocker(res.data.to_locker)
                setFromLocker(res.data.from_locker)
            })
        })
        setOpenModal(false)
    }
    const handleOpenModal = () => {
        setFromLockerEdit('')
        setToLockerEdit('')
        setNameEdit('')
        setReciverEdit('')
        setOpenModal(true)
    }
    const changeStateToPosted = () => {
        changeState("POSTED")
    }
    const changeStateToTransferring = () => {
        changeState("TRANSFERRING")
    }
    const changeStateToDelivered = () => {
        changeState("DELIVERED")
    }
    const changeStateToReceived = () => {
        changeState("RECEIVED")
    }
    const changeState = (state) => {
        let parcelUpdated = {...parcel, state: state}
        parcelsApi.update(parcelId, parcelUpdated, keycloak.token).then((res) => {
            parcelsApi.getById(parcelId, keycloak.token).then((res) => {
                setParcel(res.data)
                setReciver(res.data.receiver)
                setSender(res.data.sender)
                setToLocker(res.data.to_locker)
                setFromLocker(res.data.from_locker)
            })
        })
        setOpenModal(false)
    }
    const handleReciverChange = (event) => {
        setReciverEdit(event.target.value)
    }
    const handleToLockerChange = (event) => {
        setToLockerEdit(event.target.value)
    }
    const handleFromLockerChange = (event) => {
        setFromLockerEdit(event.target.value)
    }
    const handleFormNameChange = (event) => {
        setNameEdit(event.target.value)
    }

    useEffect(()=> {
        parcelsApi.getById(parcelId, keycloak.token).then((res) => {
            setParcel(res.data)
            setReciver(res.data.receiver)
            setSender(res.data.sender)
            setToLocker(res.data.to_locker)
            setFromLocker(res.data.from_locker)
        })
        keycloakUsersApi.getAllUsernames(keycloak.token).then((res) => {
            setUsernames(res.data)
        })
        parcelLockersApi.getAllNames(keycloak.token).then((res) => {
            setLockerNames(res.data)
        })
    }, []) 
    
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
    const actions = [
        { icon: <EditIcon/>, name: 'Edit parcel info', onClick: handleOpenModal },
        { icon: <SendIcon/>, name: 'Change state to send', onClick: changeStateToPosted },
        { icon: <TransferWithinAStationIcon/>, name: 'Change state to transfering', onClick: changeStateToTransferring },
        { icon: <LocalShippingIcon/>, name: 'Change state to delivered', onClick: changeStateToDelivered },
        { icon: <CallReceivedIcon/>, name: 'Change state to recived', onClick: changeStateToReceived }
    ]
    return <>
    <Box sx={{ width: '100%'}}>
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx ={styleModal}>
                <FormControl sx={{gap: 3}}>
                <FormHelperText id="helper">Input parcel details</FormHelperText>
                    <TextField id="name" label="name" variant="outlined" value={nameEdit} onChange={handleFormNameChange} />
                    <TextField select variant='outlined' label='reciver' id='reciver' value={receiverEdit} onChange={handleReciverChange}>
                        {usernames.map( username => <MenuItem value={username}>{username}</MenuItem>)}
                    </TextField>
                    <TextField select id="sender-locker" label="from locker" variant="outlined" value={fromLockerEdit} onChange={handleFromLockerChange} >
                        {lockerNames.map(lockerName => <MenuItem value={lockerName}>{lockerName}</MenuItem>)}
                    </TextField>
                    <TextField select id="reciver-locker" label="to locker" variant="outlined" value={toLockerEdit} onChange={handleToLockerChange} >
                        {lockerNames.map(lockerName => <MenuItem value={lockerName}>{lockerName}</MenuItem>)}
                    </TextField>
                    <Button onClick={editParcel} variant='outlined' disabled={nameEdit === '' || receiverEdit === '' || toLockerEdit === '' || fromLockerEdit === ''}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1}}>Send</Typography><SendIcon/></Button>
                </FormControl>
            </Box>
        </Modal>
      <Stepper sx={{mt: 4}} activeStep={stateMappings[parcel.state]} alternativeLabel>
        {steps.map((label) => (
          <Step  key={label} sx={{fill: 'white'}}>
            <StepLabel><Typography variant="p" component="div" sx={{ flexGrow: 1, color: 'white'}}>{label}</Typography></StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container maxWidth='lg' sx={{ mt: 5, display: 'flex', flexDirection: 'row', gap: 3}}>
            <Card sx={{background: '#AEC2BF', width: '20%'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>Name</Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1}}>{parcel.name}</Typography>
                </CardContent>
            </Card>
            <Card sx={{background: '#AEC2BF', width: '20%'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>Receiver</Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1}}>{receiver.username}</Typography>
                </CardContent>
            </Card>
            <Card sx={{background: '#AEC2BF', width: '20%'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>Sender</Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1}}>{sender.username}</Typography>
                </CardContent>
            </Card>
            <Card sx={{background: '#AEC2BF', width: '20%'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>From Locker</Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1}}>{fromLocker.name}</Typography>
                </CardContent>
            </Card>
            <Card sx={{background: '#AEC2BF', width: '20%'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>To Locker</Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1}}>{toLocker.name}</Typography>
                </CardContent>
            </Card>
      </Container>
      <SpeedDial ariaLabel='SpeedDial'
       sx={{ position: 'absolute', bottom: '5%', right: '2%' }}
       icon={<SpeedDialIcon />}>
            {actions.map( action => (<SpeedDialAction key={action.name}
             icon={action.icon} tooltipTitle={action.name} onClick={action.onClick}/>))}
      </SpeedDial>
    </Box>
    </>
}

export default ParcelDetailsList;