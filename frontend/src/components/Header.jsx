import React, { useState, useRef } from "react";
import { Fab, Menu, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fabRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="entete">
      <div>logo</div>
      <div className="espace_compte">
      <span>nom utilisateur</span>
        <IconButton
          color="primary"
          aria-label="déconnexion"
          onClick={handleClick}
          ref={fabRef}
        >
          <Person />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem disabled >Nom utilisateur</MenuItem>

          <MenuItem onClick={handleClose}>Changer de compte</MenuItem>
          <MenuItem
            startAdornment={
              <InputAdornment position="start">
                <Logout />
              </InputAdornment>
            }
            onClick={handleClose}
          >
            Se déconnecter
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
