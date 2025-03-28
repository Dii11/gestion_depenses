import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import Registration from "../Registration";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
  );
};

export default AppRoutes;
