import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api";

function AddComplaint(){

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const submitComplaint = async(e)=>{

    e.preventDefault();

    const token = localStorage.getItem("access_token");

    await axios.post(`${API_URL}/api/complaints/`,
      {
        title,
        description
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Complaint submitted");

  };

  return(

    <form onSubmit={submitComplaint}>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button type="submit">
        Submit
      </button>

    </form>

  );

}

export default AddComplaint;