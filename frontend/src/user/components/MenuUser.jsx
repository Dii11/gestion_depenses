import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Home, Money } from '@mui/icons-material';
import { Typography } from '@mui/material';

const MenuUser = () => {
  return (
    <div className='lien'>
      <NavLink to="/user/etablissements" >
        <IconButton><Home /></IconButton>
        <Typography variant='h6' color='secondary'>Etablissements</Typography>

      </NavLink>

      <NavLink to="/user/depenses" >
        <IconButton><Money /></IconButton>
        <Typography variant='h6' color='secondary'>Dépenses</Typography>

      </NavLink>
    </div>
  );
};

export default MenuUser;