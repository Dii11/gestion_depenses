import api from "../../../services/api";

const depenseApi = {
  getDepenses: () => api.get("/depenses"),
  addDepense: (depense) => api.post("/depenses", depense),
  updateDepense:(depense)=>api.put('/depenses/${depense.id}',depense),
  deleteDepense:(id)=>api.delete('/depenses/${id}')
};

export default depenseApi;
