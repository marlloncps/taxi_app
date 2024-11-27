import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SelectDriver from "../pages/SelectDriver";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route index path="/ride" element={<SelectDriver />} />
    </Routes>
  );
}
