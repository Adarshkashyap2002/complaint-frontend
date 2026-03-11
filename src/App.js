import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ComplaintList from "./components/ComplaintList";
import AddComplaint from "./components/AddComplaint";
import Login from "./components/Login";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>

        <Route element={<Layout/>}>

          <Route path="/complaints" element={<ComplaintList/>}/>
          <Route path="/add-complaint" element={<AddComplaint/>}/>

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;