import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { History, Home, Money } from '@mui/icons-material';

const Menu = () => {
    return (
        <div className='lien'>
            <NavLink to="/user/etablissements" >
                    <Home />
            </NavLink>

            <NavLink to="/user/depenses" >
                    <Money />
            </NavLink>

            <NavLink className="audit" to="/user/audit" >
                    <History />
            </NavLink>
        </div>
    );
};

export default Menu;
