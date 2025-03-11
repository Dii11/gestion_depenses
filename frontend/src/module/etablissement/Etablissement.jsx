import React, { useEffect, useState,Suspense,lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEtablissements,
  addEtablissement,
  updateEtablissement,
  deleteEtablissement,
} from "./features/etablissementSlice";
import EtablissementForm from "./components/EtablissementForm";
import {  NotificationDialog } from "../../components/BoiteDeDialog";
import { Typography } from "@mui/material";

const EtablissementList = lazy(() => import('./components/EtablissementList'));

function Etablissements() {
  const dispatch = useDispatch();
  const { etablissements, loading, error } = useSelector(
    (state) => state.etablissements
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [afficherForm, setAfficherForm] = useState(false)
  useEffect(() => {
    dispatch(fetchEtablissements());
  }, [dispatch]);

  const handleAddEtablissement = (etablissement) => {
    dispatch(addEtablissement(etablissement))
      .unwrap()
      .then(() => {
        setMessage("Etablissement ajouté avec succès");
        setOpen(true);
      })
      .catch(() => {
        setMessage("Erreur lors de l'ajout de l'établissement");
        setOpen(true);
      });
  };
  const handleEditEtablissement = (etablissement) => {
    dispatch(updateEtablissement(etablissement))
      .unwrap()
      .then(() => {
        setMessage('Etablissement modifié avec succès');
        setOpen(true);
      })
      .catch(() => {
        setMessage('Erreur lors de la modification de l\'établissement');
        setOpen(true);
      });
  };

  const handleDeleteEtablissement = (id) => {
    dispatch(deleteEtablissement(id))
      .unwrap()
      .then(() => {
        setMessage('Etablissement supprimé avec succès');
        setOpen(true);
      })
      .catch(() => {
        setMessage('Erreur lors de la suppression de l\'établissement');
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const afficherFormulaire=()=>{
    setAfficherForm(true)
 
  }



  return (
    <div className="ensemble">
      <Typography variant='h4' color="success">Gestion des Etablissements</Typography>
      <div className={`page ${afficherForm ? "afficher" : ""}`}>
        {afficherForm ? (
          <>
              <EtablissementForm onSubmit={handleAddEtablissement} />
              <Suspense fallback={<div>Chargement du tableau...</div>}>
              <EtablissementList
                etablissements={etablissements}
                onEdit={handleEditEtablissement}
                onDelete={handleDeleteEtablissement}
              />
              </Suspense>
          </>
        ) : (
            <EtablissementList
              etablissements={etablissements}
              onEdit={handleEditEtablissement}
              onDelete={handleDeleteEtablissement}
              afficherFormulaire={afficherFormulaire}
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

export default Etablissements;
