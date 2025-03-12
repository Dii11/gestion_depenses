import api from "../../../services/api";

const depenseApi = {
  getDepenses: () => api.get("/depenses"),
  addDepense: (depense) => api.post("/depenses", depense),
  updateDepense:(depense)=>api.put(`/depenses/${depense.n_depense}`,depense),
  deleteDepense:(n_depense)=>api.delete(`/depenses/${n_depense}`)
};

export default depenseApi;
