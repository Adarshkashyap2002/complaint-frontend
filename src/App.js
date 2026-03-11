import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Complaints from "./components/ComplaintList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/complaints" />} />
        <Route path="/complaints" element={<Complaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;