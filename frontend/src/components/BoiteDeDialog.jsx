import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EtablissementForm from '../module/etablissement/components/EtablissementForm';
import DepenseForm from '../module/depenses/components/DepenseForm';

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
        <Button onClick={onClose} aria-label="fermer la boîte ">
          Annuler
        </Button>
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
            try {
              onEdit({ ...etablissement, ...values });
              onClose();
            } catch (error) {
              console.error('Erreur lors de la modification de l\'établissement :', error);
              // Afficher une notification d'erreur
            }
          }}
        />
      </DialogContent>
      <Button onClick={onClose}>Fermer</Button>
    </Dialog>
  );
}

export function EditDialogDepense({ open, onClose, depense, onEdit, etablissements }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier la dépense</DialogTitle>
      <DialogContent>
        <DepenseForm
          initialValues={depense}
          onSubmit={(values) => {
            try {
              onEdit({ ...depense, ...values });
              onClose();
            } catch (error) {
              console.error('Erreur lors de la modification de la dépense :', error);
              // Afficher une notification d'erreur
            }
          }}
          etablissements={etablissements}
        />
      </DialogContent>
      <Button onClick={onClose}>Fermer</Button>
    </Dialog>
  );
}