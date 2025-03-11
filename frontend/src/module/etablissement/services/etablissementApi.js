import api from '../../../services/api';

const etablissementsApi = {
  getEtablissements: () => api.get('/etablissements'),
  addEtablissement: (etablissement) => api.post('/etablissements', etablissement),
  updateEtablissement: (etablissement) => api.put(`/etablissements/${etablissement.id}`, etablissement),
  deleteEtablissement: (id) => api.delete(`/etablissements/${id}`),
};

export default etablissementsApi;