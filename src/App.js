import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import ComplaintList from "./components/ComplaintList";
import AddComplaint from "./components/AddComplaint";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <ComplaintList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-complaint"
          element={
            <ProtectedRoute>
              <AddComplaint />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;