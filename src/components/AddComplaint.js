import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";

function AddComplaint() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Login required");
      return;
    }

    try {

      await axios.post(
        `${API_URL}/api/complaints/`,
        {
          title,
          description,
          location,
          status: "Pending"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setSuccess("Complaint submitted successfully");

      setTitle("");
      setDescription("");
      setLocation("");

    } catch (err) {

      console.error(err.response?.data);

      setError("Error submitting complaint");

    }

  };

  return (

    <Container maxWidth="sm" sx={{ mt:5 }}>

      <Paper elevation={6} sx={{ p:4 }}>

        <Typography variant="h4" gutterBottom>
          Add Complaint
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt:2 }}>

          <TextField
            fullWidth
            label="Complaint Title"
            margin="normal"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            required
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt:3 }}
          >
            Submit Complaint
          </Button>

        </Box>

      </Paper>

    </Container>

  );

}

export default AddComplaint;