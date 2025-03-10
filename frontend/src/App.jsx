import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Admin from './admin/Admin';
import User from './user/User';
// import Auth from './modules/auth/Auth';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/user">Utilisateur</Link></li>
          <li><Link to="/auth">Authentification</Link></li>
        </ul>
      </nav> */}

      <Routes>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/user/*' element={<User/>}/>
        {/* <Route path="/admin/*" element={<ProtectedRoute element={<Admin />} allowedRoles={['admin']} />} />
        <Route path="/user/*" element={<ProtectedRoute element={<User />} allowedRoles={['user', 'admin']} />} /> */}
        {/* <Route path="/auth/*" element={<Auth />} /> */}
         {/* <Route path="/" element={<Admin />} />  */}
      </Routes>
    </Router>
  );
}

export default App;