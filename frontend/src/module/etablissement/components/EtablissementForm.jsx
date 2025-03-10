import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  montantBudget: yup.number().positive('Le montant doit être positif').required('Le montant est requis'),
});

function EtablissementForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
      <TextField label="Nom" variant="outlined" {...register('nom')} error={!!errors.nom} helperText={errors.nom?.message} />
      <TextField label="Montant du Budget" variant="outlined" type="number" {...register('montantBudget')} error={!!errors.montantBudget} helperText={errors.montantBudget?.message} />
      <Button variant="contained" type="submit">Ajouter</Button>
    </Box>
  );
}

export default EtablissementForm;