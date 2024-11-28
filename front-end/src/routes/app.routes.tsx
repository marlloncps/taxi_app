import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SelectDriver from "../pages/SelectDriver";
import Historic from "../pages/Historic";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/ride" element={<SelectDriver />} />
      <Route path="/ride/historic" element={<Historic />} />
    </Routes>
  );
}
