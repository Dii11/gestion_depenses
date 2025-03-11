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
import TablePagination from '@mui/material/TablePagination';
import { ConfirmationDialog, EditDialog } from '../../../components/BoiteDeDialog';

function EtablissementList({ etablissements, onEdit, onDelete,afficherFormulaire }) {
  const [open, setOpen] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEditClick = (etablissement) => {
    setSelectedEtablissement(etablissement);
    setOpenEditDialog(true);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, etablissements.length - page * rowsPerPage);

  return (
    <div>
    <Button onClick={afficherFormulaire}>ajouter</Button>
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
            {(rowsPerPage > 0
              ? etablissements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : etablissements
            ).map((etablissement) => (
              <TableRow key={etablissement.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{etablissement.nom}</TableCell>
                <TableCell align="right">{etablissement.montantBudget}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditClick(etablissement)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(etablissement.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={etablissements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

       {/* Dialog pour la modification */}
       <EditDialog
        open={openEditDialog}
        onClose={handleClose}
        etablissement={selectedEtablissement}
        onEdit={onEdit}
      />

      {/* Dialog pour la confirmation de suppression */}
      <ConfirmationDialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        onConfirm={handleConfirmDelete}
        title="Confirmation"
        message="Êtes-vous sûr de vouloir supprimer cet établissement ?"
      />
    </div>
  );
}

export default EtablissementList;