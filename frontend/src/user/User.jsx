import React from "react";
import UserRoutes from "./routes/UserRoutes";
import Header from "../components/Header";
const User = () => {
  return (
    <div className="page_pple">
      <Header />
      <UserRoutes />
    </div>
  );
};

export default User;
