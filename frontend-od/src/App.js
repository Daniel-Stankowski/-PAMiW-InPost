import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ProtectedRoute } from './components/ProtectedRoute';
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
        <Routes>
          <Route index/>
          <Route element={<ProtectedRoute/>}>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
