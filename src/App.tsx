import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Dashboard';
import Home from './Pages/Home';
import Casts from './Pages/Casts';
import Footer from './Components/Footer';
import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Login from './Components/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Header/>
      <Box component="main" sx={{flexGrow: 1, mt: 8, p:3}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/casts" element={<Casts />} />
          </Routes>
        </BrowserRouter>

      </Box>
      <Footer />
    </Box>
  )
}

export default App
