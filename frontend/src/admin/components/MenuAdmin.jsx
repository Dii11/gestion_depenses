import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { History, Home, Money, People } from '@mui/icons-material';
import { Typography } from '@mui/material';

const MenuAdmin = () => {
  return (
    <div className='lien'>
      <NavLink to="/admin/etablissements" >
        <IconButton><Home /></IconButton>
        <Typography variant='h6' color='secondary'>Etablissements</Typography>
      </NavLink>

      <NavLink to="/admin/depenses" >
        <IconButton><Money /></IconButton>
        <Typography variant='h6' color='secondary'>Dépenses</Typography>
      </NavLink>

      <NavLink to="/admin/audit" >
        <IconButton><History /></IconButton>
        <Typography variant='h6' color='secondary'>Audition dépenses</Typography>
      </NavLink>

      {/* <NavLink to="/admin/users" >
        <IconButton><People /></IconButton>
        <Typography variant='h6' color='secondary'>Employés</Typography>
      </NavLink> */}
    </div>
  );
};

export default MenuAdmin;