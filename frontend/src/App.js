import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ProtectedRoute } from './components/ProtectedRoute';
import ParcelList from './pages/parcels/ParcelList'
import ParcelDetailsPage from './pages/parcel/ParcelDetailsPage'
import NavBar from './components/NavBar';
import { GlobalStyles } from '@mui/material';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        light: '#152828',
        main: '#080F0F',
        dark: '#0C0808'
      },
      secondary: {
        main: '#A2B9B6',
        light: '#AEC2BF',
        dark: '#739691'
      }
    }
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{
            body: { backgroundColor: '#152828'},
          }}/>
        <NavBar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/parcels' element={<ParcelList/>}/>
            <Route path='/parcels/:parcelId' element={<ParcelDetailsPage/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
