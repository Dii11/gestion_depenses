import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Home, Money } from '@mui/icons-material';

const MenuUser = () => {
  return (
    <div className='lien'>
      <NavLink to="/user/etablissements" >
        <IconButton><Home /></IconButton>
      </NavLink>

      <NavLink to="/user/depenses" >
        <IconButton><Money /></IconButton>
      </NavLink>
    </div>
  );
};

export default MenuUser;