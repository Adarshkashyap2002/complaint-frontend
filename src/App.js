import { BrowserRouter, Routes, Route } from "react-router-dom";

import ComplaintList from "./components/ComplaintList";
import AddComplaint from "./components/AddComplaint";
import Login from "./components/Login";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>} />

        <Route path="/complaints" element={<ComplaintList/>} />

        <Route path="/add-complaint" element={<AddComplaint/>} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;