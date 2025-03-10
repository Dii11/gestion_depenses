import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEtablissements, addEtablissement } from './features/etablissementSlice';
import EtablissementForm from './components/EtablissementForm';
import EtablissementList from './components/EtablissementList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function Etablissements() {
  const dispatch = useDispatch();
  const { etablissements, loading, error } = useSelector((state) => state.etablissements);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchEtablissements());
  }, [dispatch]);

  const handleAddEtablissement = (etablissement) => {
    dispatch(addEtablissement(etablissement))
      .unwrap()
      .then(() => {
        setMessage('Etablissement ajouté avec succès');
        setOpen(true);
      })
      .catch(() => {
        setMessage('Erreur lors de l\'ajout de l\'établissement');
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Gestion des Etablissements</h2>
      <EtablissementForm onSubmit={handleAddEtablissement} />
      <EtablissementList etablissements={etablissements} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Etablissements;