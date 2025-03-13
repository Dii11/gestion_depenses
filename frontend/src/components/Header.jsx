import React, { useState, useRef } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import DialogAuth from "../module/auth/DialogAuth";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // État pour contrôler l'ouverture de DialogAuth
    const fabRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        handleCloseMenu();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
                    open={openMenu}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem disabled>Nom utilisateur</MenuItem>
                    <MenuItem onClick={handleOpenDialog}>Changer de compte</MenuItem>
                    <MenuItem onClick={handleOpenDialog}>Se déconnecter</MenuItem>
                </Menu>
                {openDialog && <DialogAuth onClose={handleCloseDialog} />}
            </div>
        </div>
    );
};

export default Header;