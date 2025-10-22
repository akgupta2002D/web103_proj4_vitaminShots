import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateShot from "./pages/CreateShot";
import EditShot from "./pages/EditShot";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateShot />} />
        <Route path="/edit/:id" element={<EditShot />} />
      </Routes>
  );
}
