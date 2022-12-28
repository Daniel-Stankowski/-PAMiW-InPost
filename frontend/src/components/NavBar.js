import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const {keycloak} = useKeycloak()
  const navigate = useNavigate()
  const handleLogIn = () => {
    keycloak.login()
  }
  const handleLogOut = () => {
    navigate('/')
    keycloak.logout()
  }
  const navigateHome = () => {
    navigate('/')
  }
  const navigateToParcels = () => {
    navigate('/parcels')
  }
    return <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={navigateHome}
      >
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer"}} onClick={navigateToParcels}>
        Parcels
      </Typography>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="login-logout"
        sx={{ mr: 2 }}
        onClick={navigateHome}
      >
        {keycloak.authenticated ? <LogoutIcon onClick={handleLogOut}/> : <LoginIcon onClick={handleLogIn} />}
      </IconButton>
    </Toolbar>
  </AppBar>
}

export default NavBar