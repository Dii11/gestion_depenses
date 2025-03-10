import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function EtablissementList({ etablissements }) {
  if (etablissements.length === 0) {
    return <Typography variant="body1">Aucun établissement trouvé.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="right">Montant du Budget</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {etablissements.map((etablissement) => (
            <TableRow key={etablissement.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{etablissement.nom}</TableCell>
              <TableCell align="right">{etablissement.montantBudget}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EtablissementList;