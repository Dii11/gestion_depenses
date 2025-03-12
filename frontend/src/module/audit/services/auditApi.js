import api from "../../../services/api";
const auditApi={
    getAudit:()=>api.get('./audit_depenses')
}
export default auditApi;