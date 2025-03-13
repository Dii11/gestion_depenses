import React, { useState } from 'react';
import {Dialog,DialogTitle,DialogContent, DialogActions} from '@mui/material';
import Button from '@mui/material/Button';
import Connexion from './Connexion';

const DialogAuth = () => {
    const [open, setOpen] = useState(true); 

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-auth-title">
            <DialogTitle id="dialog-auth-title">
                Connexion
            </DialogTitle>
            <DialogContent>
                <Connexion />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAuth;