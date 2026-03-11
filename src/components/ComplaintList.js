import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function ComplaintList() {

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {

    const token = localStorage.getItem("access_token");

    try {

      const res = await axios.get(
        `${API_URL}/api/complaints/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchComplaints();

  }, []);

  return (

    <div style={{padding:"40px"}}>

      <h2>Complaints</h2>

      {complaints.length === 0 && <p>No complaints found</p>}

      {complaints.map((c)=>(
        <div
          key={c.id}
          style={{
            border:"1px solid #ccc",
            padding:"15px",
            marginBottom:"10px"
          }}
        >

          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p><b>Location:</b> {c.location}</p>
          <p><b>Status:</b> {c.status}</p>

        </div>
      ))}

    </div>

  );

}

export default ComplaintList;