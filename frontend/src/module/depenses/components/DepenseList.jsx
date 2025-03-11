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
  AddBusiness,
  Search,
  FilterList,
} from "@mui/icons-material";
import {
  ConfirmationDialog,
  EditDialog,
} from "../../../components/BoiteDeDialog";
import DepenseForm from "./DepenseForm"; // Importer DepenseForm

function DepenseList({ depenses, onEdit, onDelete, etablissements, afficherFormulaire }) { // Ajout de la prop etablissements
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDepense, setSelectedDepense] = useState(null); // Nom mis à jour
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (depense) => { // Nom mis à jour
    setSelectedDepense(depense); // Nom mis à jour
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
    // Utiliser une valeur par défaut (par exemple, 0) si depense.nEtab est undefined
    const nEtab = (depense.nEtab || 0).toString(); 
    return nEtab.includes(searchTerm);
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
          <AddBusiness fontSize="large" />
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
              <TableCell align="right"><strong aria-label="Montant de la dépense">Dépense</strong></TableCell>
              <TableCell align="right"><strong aria-label="Actions sur la dépense">Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredDepenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredDepenses
            ).map((depense) => (
              <TableRow key={depense.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{depense.id}</TableCell>
                <TableCell align="right">{depense.nEtab}</TableCell>
                <TableCell align="right">{depense.montant}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="modifier une dépense" onClick={() => handleEditClick(depense)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(depense.id)} aria-label="supprimer une dépense"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
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

      <EditDialog // Utiliser EditDialog avec DepenseForm
        open={openEditDialog}
        onClose={handleClose}
        etablissement={selectedDepense} // Passer la dépense sélectionnée
        onEdit={onEdit}
      >
        {selectedDepense && ( // Afficher DepenseForm dans EditDialog
          <DepenseForm
            initialValues={selectedDepense}
            onSubmit={(values) => {
              onEdit({ ...selectedDepense, ...values });
              handleClose();
            }}
            etablissements={etablissements} // Passer la liste des établissements à DepenseForm
          />
        )}
      </EditDialog>

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