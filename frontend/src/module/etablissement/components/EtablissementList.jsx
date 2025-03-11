import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EtablissementForm from './EtablissementForm';
import { DialogActions, DialogContentText } from '@mui/material';

function EtablissementList({ etablissements, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEditClick = (etablissement) => {
    setSelectedEtablissement(etablissement);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (etablissements.length === 0) {
    return <Typography variant="body1">Aucun établissement trouvé.</Typography>;
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteId);
    setConfirmOpen(false);
  };

  return (
    <div> {/* Ajout d'un div englobant */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Montant du Budget</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {etablissements.map((etablissement) => (
              <TableRow key={etablissement.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{etablissement.nom}</TableCell>
                <TableCell align="right">{etablissement.montantBudget}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditClick(etablissement)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(etablissement.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pour la modification */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier l'établissement</DialogTitle>
        <DialogContent>
          {selectedEtablissement && (
            <EtablissementForm
              initialValues={selectedEtablissement}
              onSubmit={(values) => {
                onEdit({ ...selectedEtablissement, ...values });
                handleClose();
              }}
            />
          )}
        </DialogContent>
        <Button onClick={handleClose}>Fermer</Button>
      </Dialog>

      {/* Dialog pour la confirmation de suppression */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Êtes-vous sûr de vouloir supprimer cet établissement ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Annuler</Button>
          <Button onClick={handleConfirmDelete} autoFocus>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EtablissementList;