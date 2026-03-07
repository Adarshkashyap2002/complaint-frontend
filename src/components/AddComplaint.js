import React, { useState } from "react";
import axios from "axios";

import DashboardLayout from "./DashboardLayout";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert
} from "@mui/material";

function AddComplaint() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitComplaint = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess(false);

    const token = localStorage.getItem("access_token");

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/complaints/",
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

      setSuccess(true);

      setTitle("");
      setDescription("");
      setLocation("");

    } catch (err) {

      setError("Failed to submit complaint");

    }

  };

  return (
    <Container maxWidth="sm">

      <Box mt={6}>

        <Paper elevation={6} sx={{ p: 4 }}>

          <Typography variant="h5" mb={2}>
            Submit Complaint
          </Typography>

          {success && (
            <Alert severity="success">
              Complaint submitted successfully
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <form onSubmit={submitComplaint}>

            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <TextField
              label="Location"
              fullWidth
              margin="normal"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              fullWidth
            >
              Submit Complaint
            </Button>

          </form>

        </Paper>

      </Box>

    </Container>
  );
}

export default AddComplaint;