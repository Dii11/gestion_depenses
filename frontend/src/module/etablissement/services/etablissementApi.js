import api from '../../../services/api';

const etablissementsApi = {
  getEtablissements: () => api.get('/etablissements'),
  addEtablissement: (etablissement) => api.post('/etablissements', etablissement),
  // Ajoutez les méthodes pour mettre à jour et supprimer les établissements si nécessaire
};

export default etablissementsApi;