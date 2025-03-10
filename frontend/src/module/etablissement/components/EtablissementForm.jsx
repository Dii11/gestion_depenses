import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function EtablissementForm({ onSubmit }) {
  const [nom, setNom] = useState('');
  const [montantBudget, setMontantBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, montantBudget });
    setNom('');
    setMontantBudget('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
      <TextField label="Nom" variant="outlined" value={nom} onChange={(e) => setNom(e.target.value)} />
      <TextField label="Montant du Budget" variant="outlined" type="number" value={montantBudget} onChange={(e) => setMontantBudget(e.target.value)} />
      <Button variant="contained" type="submit">Ajouter</Button>
    </Box>
  );
}

export default EtablissementForm;