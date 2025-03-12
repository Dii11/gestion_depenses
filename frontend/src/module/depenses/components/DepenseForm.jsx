import React, { useEffect, useCallback, useRef, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const schema = yup.object().shape({
  n_Etab: yup.number().required("Veuillez sélécionner un établissement"),
  depense: yup.number().positive("Le depense doit être positif").required("Veuillez saisir un depense"),
  description: yup.string().required("Veuillez ajouter une description"),
});

function DepenseForm({ initialValues, onSubmit, etablissements, onCancel }) { // Ajout de la prop onCancel
  const initialValuesRef = useRef(initialValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      n_Etab: 0,
      depense: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      initialValuesRef.current = initialValues;
      reset({
        n_Etab: initialValues.n_Etab,
        depense: initialValues.depense,
        description: initialValues.description,
      });
    } else {
      reset({
        n_Etab: 0,
        depense: 0,
        description: "",
      });
    }
  }, [initialValues, reset]);

  const handleSubmitForm = useCallback(
    (data) => {
      onSubmit(data)
      console.log(data);
    },
    [onSubmit, initialValues]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
    >
      <FormControl fullWidth>
        <InputLabel id="n_Etab-label">Numéro d'établissement</InputLabel>
        <Select
          labelId="n_Etab-label"
          id="n_Etab"
          {...register("n_Etab")}
          error={!!errors.n_Etab}
          label="Numéro d'établissement"
          defaultValue={initialValues?.n_Etab || 0}
        >
          {etablissements &&
            etablissements.map((etablissement) => (
              <MenuItem key={etablissement.n_Etab} value={etablissement.n_Etab}>
                n° {etablissement.n_Etab} - {etablissement.nom}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="depense"
        variant="outlined"
        type="number"
        {...register("depense")}
        error={!!errors.depense}
        helperText={errors.depense?.message}
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
      {initialValues && (
        <Button
          variant="outlined"
          onClick={onCancel}
          aria-label="annuler la modification"
        >
          Annuler
        </Button>
      )}
    </Box>
  );
}

export default memo(DepenseForm);