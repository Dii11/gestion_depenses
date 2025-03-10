import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEtablissements, addEtablissement } from './features/etablissementSlice';
import EtablissementForm from './components/EtablissementForm';
import EtablissementList from './components/EtablissementList';

function Etablissements() {
  const dispatch = useDispatch();
  const { etablissements, loading, error } = useSelector((state) => state.etablissements);

  useEffect(() => {
    dispatch(fetchEtablissements());
  }, [dispatch]);

  const handleAddEtablissement = (etablissement) => {
    dispatch(addEtablissement(etablissement));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gestion des Etablissements</h2>
      <EtablissementForm onSubmit={handleAddEtablissement} />
      <EtablissementList etablissements={etablissements} />
    </div>
  );
}

export default Etablissements;