import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { History, Home, Money, People } from '@mui/icons-material';

const MenuAdmin = () => {
  return (
    <div className='lien'>
      <NavLink to="/admin/etablissements" >
        <IconButton><Home /></IconButton>
      </NavLink>

      <NavLink to="/admin/depenses" >
        <IconButton><Money /></IconButton>
      </NavLink>

      <NavLink to="/admin/audit" >
        <IconButton><History /></IconButton>
      </NavLink>

      <NavLink to="/admin/users" >
        <IconButton><People /></IconButton>
      </NavLink>
    </div>
  );
};

export default MenuAdmin;