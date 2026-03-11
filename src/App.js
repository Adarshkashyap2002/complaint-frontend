import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import ComplaintList from "./components/ComplaintList";
import AddComplaint from "./components/AddComplaint";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<DashboardLayout />}>

          <Route path="/complaints" element={<ComplaintList />} />

          <Route path="/add-complaint" element={<AddComplaint />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;