import React from "react";
import AdminRoutes from "./routes/AdminRoutes";
import Header from "../components/Header";
const Admin = () => {
  return (
    <div className="page_pple">
      <Header />
      <AdminRoutes />
    </div>
  );
};

export default Admin;
