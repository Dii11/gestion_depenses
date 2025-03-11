import React, { useEffect, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const schema = yup.object().shape({
  nEtab: yup.string().required("Le numéro d'établissement est requis"),
  montant: yup.number().positive("Le montant doit être positif").required("Le montant est requis"),
  description: yup.string().required("La description est requise"),
});

function DepenseForm({ initialValues, onSubmit, etablissements }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nEtab: initialValues?.nEtab || '',
      montant: initialValues?.montant || '',
      description: initialValues?.description || '',
    }
  });

  useEffect(() => {
    if (initialValues) {
      setValue("nEtab", initialValues.nEtab);
      setValue("montant", initialValues.montant);
      setValue("description", initialValues.description);
    }
  }, [initialValues, setValue]);
  const handleSubmitForm = useCallback(
    (data) => {
      onSubmit(data);

    },
    [onSubmit]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
    >
      <FormControl fullWidth>
        <InputLabel id="nEtab-label">Numéro d'établissement</InputLabel>
        <Select
          labelId="nEtab-label"
          id="nEtab"
          {...register("nEtab")}
          error={!!errors.nEtab}
          label="Numéro d'établissement"
        >
          {etablissements.map((etablissement,index) => (
            <MenuItem key={index} value={etablissement.nEtab}>
              {etablissement.nom} ({etablissement.nEtab})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Montant"
        variant="outlined"
        type="number"
        {...register("montant")}
        error={!!errors.montant}
        helperText={errors.montant?.message}
      />
      <TextField
        label="Description"
        variant="outlined"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Button
        variant="contained"
        type="submit"
        aria-label="ajouter une dépense"
      >
        {initialValues ? "Enregistrer" : "Ajouter"}
      </Button>
    </Box>
  );
}

export default memo(DepenseForm);