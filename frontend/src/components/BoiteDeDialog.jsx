import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EtablissementForm from '../module/etablissement/components/EtablissementForm';

export function ConfirmationDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function NotificationDialog({ open, onClose, title, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} aria-label='fermer la boîte '>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}

export function EditDialog({ open, onClose, etablissement, onEdit }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier l'établissement</DialogTitle>
      <DialogContent>
        <EtablissementForm
          initialValues={etablissement}
          onSubmit={(values) => {
            onEdit({ ...etablissement, ...values });
            onClose();
          }}
        />
      </DialogContent>
      <Button onClick={onClose}>Fermer</Button>
    </Dialog>
  );
}