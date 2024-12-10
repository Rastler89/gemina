import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Dashboard';
import Home from './Pages/Home';
import Casts from './Pages/Casts';
import Footer from './Components/Footer';
import { Box, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import Materials from './Pages/Materials';
import { supabase } from './Services/RastGest';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => setSession(session as Session))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session as Session))

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return (
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <Header/>
        <Box component="main" sx={{flexGrow: 1, mt: 8, p:3}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/casts" element={<Casts />} />
              <Route path="/materials" element={<Materials />}/>
            </Routes>
          </BrowserRouter>
  
        </Box>
        <Footer />
      </Box>
    )
  }
}

export default App
