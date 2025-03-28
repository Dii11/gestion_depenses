import React, { useState, useCallback, useMemo } from "react";
import {
  IconButton,
  Paper,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Edit,
  Delete,
  Search,
  FilterList,
  MonetizationOn,
} from "@mui/icons-material";
import {
  ConfirmationDialog,
  EditDialogDepense,
} from "../../../components/BoiteDeDialog";

function DepenseList({ depenses, onEdit, onDelete, etablissements, afficherFormulaire }) { // Ajout de la prop etablissements
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDepense, setSelectedDepense] = useState(null); // Nom mis à jour
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (depense) => { 
    setSelectedDepense(depense); 
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

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  },);

  const filteredDepenses = useMemo(() => {
  return depenses.filter((depense) => {
    const n_Etab = (depense.n_Etab || 0).toString(); 
    return n_Etab.includes(searchTerm);
  });
}, [depenses, searchTerm]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredDepenses.length - page * rowsPerPage);

  return (
    <div>
      <div className="ensemble-filtre">
        <IconButton
          onClick={afficherFormulaire}
          color="primary"
          aria-label="Ajouter une nouvelle dépense"
          title="Ajouter une nouvelle dépense"
        >
          <MonetizationOn fontSize="large" />
        </IconButton>
        <div className="filtre">
          <TextField
            id="search"
            label="Recherche par n°Etab"
            type="search"
            aria-label="rechercher une dépense"
            onChange={handleSearchChange}
            value={searchTerm}
            variant="standard"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <IconButton aria-label="filtrer une dépense">
            <FilterList />
          </IconButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong aria-label="Numéro de la dépense">N° Dépense</strong></TableCell>
              <TableCell align="right"><strong aria-label="Numéro d'établissement">N° Etab</strong></TableCell>
              <TableCell align="right"><strong aria-label="Montant de la dépense">Description</strong></TableCell>
              <TableCell align="right"><strong aria-label="Montant de la dépense">Dépense</strong></TableCell>
              <TableCell align="right"><strong aria-label="Actions sur la dépense">Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredDepenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredDepenses
            ).map((depense) => (
              <TableRow key={depense.n_depense} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{depense.n_depense}</TableCell>
                <TableCell align="right">{depense.n_Etab}</TableCell>
                <TableCell align="right">{depense.description}</TableCell>
                <TableCell align="right">{depense.depense}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="modifier une dépense" onClick={() => handleEditClick(depense)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(depense.n_depense)} aria-label="supprimer une dépense"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 5 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDepenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <EditDialogDepense 
        open={openEditDialog}
        onClose={handleClose}
        depense={selectedDepense} 
        etablissements={etablissements}
        onEdit={onEdit}
      />
        

      <ConfirmationDialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        onConfirm={handleConfirmDelete}
        title="Confirmation"
        message="Êtes-vous sûr de vouloir supprimer cette dépense ?"
      />
    </div>
  );
}

export default DepenseList;