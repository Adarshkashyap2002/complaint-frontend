import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api";

function AddComplaint() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("access_token");

    try {

      await axios.post(
        `${API_URL}/api/complaints/`,
        {
          title: title,
          description: description,
          location: location,
          status: "Pending"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Complaint Submitted Successfully");

      setTitle("");
      setDescription("");
      setLocation("");

    } catch (error) {

      console.error(error);
      alert("Error submitting complaint");

    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Add Complaint</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Submit Complaint
        </button>

      </form>

    </div>

  );

}

export default AddComplaint;