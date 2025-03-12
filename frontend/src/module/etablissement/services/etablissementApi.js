import api from '../../../services/api';

const etablissementsApi = {
  getEtablissements: () => api.get('/etablissements'),
  addEtablissement: (etablissement) => api.post('/etablissements', etablissement),
  updateEtablissement: (etablissement) => api.put(`/etablissements/${etablissement.n_Etab}`, etablissement),
  deleteEtablissement: (id) => api.delete(`/etablissements/${id}`),
};

export default etablissementsApi;