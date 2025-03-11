import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDepenses,
  addDepense,
  updateDepense,
  deleteDepense,
} from "./features/depenseSlice"; // Import des actions pour les dépenses
import DepenseForm from "./components/DepenseForm";
import { NotificationDialog } from "../../components/BoiteDeDialog";
import { Typography } from "@mui/material";
import { fetchEtablissements } from "../etablissement/features/etablissementSlice"; // Import pour récupérer les établissements

const DepenseList = lazy(() => import("./components/DepenseList"));

function Depenses() {
  const dispatch = useDispatch();
  const { depenses, loading, error } = useSelector((state) => state.depenses);
  const { etablissements } = useSelector((state) => state.etablissements); // Récupérer les établissements
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [afficherForm, setAfficherForm] = useState(false);

  useEffect(() => {
    dispatch(fetchDepenses());
    dispatch(fetchEtablissements()); // Récupérer les établissements
  }, [dispatch]);

  const handleAddDepense = (depense) => {

    dispatch(addDepense(depense))
      .unwrap()
      .then(() => {
        setMessage("Dépense ajoutée avec succès");
        setOpen(true);
      })
      .catch(() => {
        setMessage("Erreur lors de l'ajout de la dépense");
        setOpen(true);
      });
  };

  const handleEditDepense = (depense) => {
    dispatch(updateDepense(depense))
      .unwrap()
      .then(() => {
        setMessage("Dépense modifiée avec succès");
        setOpen(true);
      })
      .catch(() => {
        setMessage("Erreur lors de la modification de la dépense");
        setOpen(true);
      });
  };

  const handleDeleteDepense = (id) => {
    dispatch(deleteDepense(id))
      .unwrap()
      .then(() => {
        setMessage("Dépense supprimée avec succès");
        setOpen(true);
      })
      .catch(() => {
        setMessage("Erreur lors de la suppression de la dépense");
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const afficherFormulaire = () => {
    setAfficherForm(true);
  };

  return (
    <div className="ensemble">
      <Typography variant="h4" color="success">
        Gestion des Dépenses
      </Typography>
      <div className={`page ${afficherForm ? "afficher" : ""}`}>
        {afficherForm ? (
          <>
            <DepenseForm
              onSubmit={handleAddDepense}
              etablissements={etablissements} // Passer les établissements à DepenseForm
            />
            <Suspense fallback={<div>Chargement du tableau...</div>}>
              <DepenseList
                depenses={depenses}
                onEdit={handleEditDepense}
                onDelete={handleDeleteDepense}
                etablissements={etablissements} // Passer les établissements à DepenseList
              />
            </Suspense>
          </>
        ) : (
          <DepenseList
            depenses={depenses}
            onEdit={handleEditDepense}
            onDelete={handleDeleteDepense}
            afficherFormulaire={afficherFormulaire}
            etablissements={etablissements} // Passer les établissements à DepenseList
          />
        )}
      </div>

      <NotificationDialog
        open={open}
        onClose={handleClose}
        message={message}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Depenses;