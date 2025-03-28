import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const fabRef = useRef(null);
    const [userName, setUserName] = useState("");

    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserName(user.user.name);
            setEmail(user.user.email)
        }

    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/')
        window.location.reload(); 
    };

    return (
        <div className="entete">
            <div>logo</div>
            <div className="espace_compte">
                <span>{userName}</span>
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
                    <MenuItem disabled sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <div>
                    {userName}
                    </div>
                    <>
                    {email}
                    </>
                    </MenuItem>
                    <MenuItem onClick={handleOpenDialog}>Changer de compte</MenuItem>
                    <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default Header;