import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ComplaintList from "./components/ComplaintList";
import AddComplaint from "./components/AddComplaint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/complaints" />} />
        <Route path="/complaints" element={<ComplaintList />} />
        <Route path="/add-complaint" element={<AddComplaint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;