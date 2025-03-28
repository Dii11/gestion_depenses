import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Admin from './admin/Admin';
import User from './user/User';
import Auth from './module/auth/Auth';
import Registration from './module/auth/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/user/*' element={<User/>}/>
         <Route exact path="/" element={<Auth />} /> 
      </Routes>
    </Router>
  );
}

export default App;