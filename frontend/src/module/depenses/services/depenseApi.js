import api from "../../../services/api";

const depenseApi = {
  getDepenses: () => api.get("/depenses"),
  addDepense: (depense) => {
    const token = localStorage.getItem('token');
    return api.post("/depenses", depense, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  },
  updateDepense: (depense) => {
    const token = localStorage.getItem('token');
    return api.put(`/depenses/${depense.n_depense}`, depense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteDepense: (n_depense) => {
    const token = localStorage.getItem('token');
    return api.delete(`/depenses/${n_depense}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default depenseApi;