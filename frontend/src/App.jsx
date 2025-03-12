import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Admin from './admin/Admin';
import User from './user/User';
// import Auth from './modules/auth/Auth';
import ProtectedRoute from './components/ProtectedRoute'; 
import Auth from './module/auth/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/user/*' element={<User/>}/>
         <Route exact path="/" element={<Auth />} /> 
      </Routes>
    </Router>
  );
}

export default App;