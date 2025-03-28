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

function EtablissementList({
  etablissements,
  onEdit,
  onDelete,
  afficherFormulaire,
}) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  }, []);

  const filteredEtablissements = useMemo(() => {
    return etablissements.filter((etablissement) =>
        etablissement.nom && etablissement.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
}, [etablissements, searchTerm]);

  const emptyRows = rowsPerPage;
  return (
    <div>
      <div className="ensemble-filtre">
        <IconButton
          onClick={afficherFormulaire}
          color="primary"
          aria-label="Ajouter un nouvel établissement"
          title="Ajouter un nouvel établissement"
        >
          <AddBusiness fontSize="large" />
        </IconButton>
        <div className="filtre">
          <TextField
            id="search"
            label="Recherche"
            type="search"
            aria-label="rechercher un  établissement"
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
          <IconButton aria-label="filtrer un  établissement">
            <FilterList />
          </IconButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong aria-label="Nom de l'établissement">Nom</strong>
              </TableCell>
              <TableCell align="right">
                <strong aria-label="Montant du budget de l'établissement">
                  Montant du Budget
                </strong>
              </TableCell>
              <TableCell align="right">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredEtablissements.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredEtablissements
            ).map((etablissement) => (
              <TableRow
                key={etablissement.n_Etab}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {etablissement.nom}
                </TableCell>
                <TableCell align="right">
                  {etablissement.Montant_Budget}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="modifer un  établissement"
                    onClick={() => handleEditClick(etablissement)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(etablissement.n_Etab)}
                    aria-label="supprimer un  établissement"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 5 * emptyRows }}>
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

      <EditDialog
        open={openEditDialog}
        onClose={handleClose}
        etablissement={selectedEtablissement}
        onEdit={onEdit}
      />

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
