import React, { useEffect, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";

const schema = yup.object().shape({
  nom: yup.string().required("Le champ ne doit pas être vide"),
  montantBudget: yup.number().positive("ajouter un montant positif"),
});

function EtablissementForm({ initialValues, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialValues) {
      setValue("nom", initialValues.nom);
      setValue("montantBudget", initialValues.montantBudget);
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
      <TextField
        label="Nom"
        variant="outlined"
        {...register("nom")}
        error={!!errors.nom}
        helperText={errors.nom?.message}
      />
      <TextField
        label="Montant du Budget"
        variant="outlined"
        type="number"
        {...register("montantBudget")}
        error={!!errors.montantBudget}
        helperText={errors.montantBudget?.message}
      />
      <Button
        variant="contained"
        type="submit"
        aria-label="ajouter un  établissement"
      >
        {initialValues ? "Enregistrer" : "Ajouter"}
      </Button>
    </Box>
  );
}

export default memo(EtablissementForm);
