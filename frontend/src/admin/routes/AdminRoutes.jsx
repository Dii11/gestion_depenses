import React from 'react';
import { Link, Routes,Route } from 'react-router-dom'
import Etablissement from '../../module/etablissement/Etablissement'
import Audit from '../../module/audit/Audit'
import Users from '../../module/users/Users'

import Depenses from '../../module/depenses/Depenses'
const AdminRoutes = () => {
    return (
        <div>
        <nav>
            <ul>
            <li><Link to="/admin/users">Utilisateurs</Link></li>
          <li><Link to="/admin/etablissements">Etablissements</Link></li>
          <li><Link to="/admin/depenses">Dépenses</Link></li>
          <li><Link to="/admin/audit">Audit</Link></li>
            </ul>
        </nav>

        <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/etablissements" element={<Etablissement />} />
        <Route path="/depenses" element={<Depenses />} />
        <Route path="/audit" element={<Audit />} />
        </Routes>
           
        </div>
    );
};

export default AdminRoutes;