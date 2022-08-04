import React from 'react';
import Home from '../src/components/Home'
import { SportContext } from './context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext } from './authContext';



function App() {
  const { loading } = React.useContext(SportContext);
  const { error,token } = React.useContext(AuthContext);
  if (loading) {
    return <div className='loader'>
    </div>
  };

  return <>
    <Router>
      {/* <Header /> */}
       <Routes>
       {!token && <Route path="api/v1/auth/register" element={<RegisterPage />} />}
      </Routes>
      <Routes>
       {!token && <Route path="api/v1/auth/login" element={<LoginPage />} />}
      </Routes>
      <Routes>
     <Route path="/" element={<Home />} />
      </Routes>
     
    </Router>
  </>
}

export default App;
