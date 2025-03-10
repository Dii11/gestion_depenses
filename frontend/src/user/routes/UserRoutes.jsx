import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Etablissements from "../../module/etablissement/Etablissement";
import Depenses from "../../module/depenses/Depenses";
import Audit from "../../module/audit/Audit";
import MenuUser from "../components/MenuUser";

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MenuUser />} />
        <Route path="/etablissements" element={<Etablissements />} />
        <Route path="/depenses" element={<Depenses />} />
        <Route path="/audit" element={<Audit />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
