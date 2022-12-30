import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Loading() {
    return <Box sx={{ 
        display: 'flex',
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)" }}>
                <CircularProgress color='secondary' />
            </Box>
}

export default Loading;