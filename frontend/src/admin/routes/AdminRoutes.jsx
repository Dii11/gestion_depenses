import React from 'react';
import { Link, Routes,Route } from 'react-router-dom'
import Etablissement from '../../module/etablissement/Etablissement'
import Audit from '../../module/audit/Audit'
import Users from '../../module/users/Users'

import Depenses from '../../module/depenses/Depenses'
import MenuAdmin from '../components/MenuAdmin';
const AdminRoutes = () => {
    return (
        <div>
       
        <Routes>
        <Route path="/" element={<MenuAdmin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/etablissements" element={<Etablissement />} />
        <Route path="/depenses" element={<Depenses />} />
        <Route path="/audit" element={<Audit />} />
        </Routes>       
        </div>
    );
};

export default AdminRoutes;