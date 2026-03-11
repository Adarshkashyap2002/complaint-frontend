import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Alert
} from "@mui/material";

function AddComplaint() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [success,setSuccess] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("access_token");

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
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setSuccess("Complaint submitted successfully");
      setError("");

      setTitle("");
      setDescription("");
      setLocation("");

    } catch(err){

      console.error(err);
      setError("Failed to submit complaint");
      setSuccess("");

    }

  };

  return (

    <Container maxWidth="md">

      <Box sx={{ mt:5 }}>

        <Paper elevation={8} sx={{ p:4 }}>

          <Typography variant="h4" mb={3}>
            Add Complaint
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>

            <Grid container spacing={3}>

              <Grid item xs={12}>
                <TextField
                  label="Complaint Title"
                  fullWidth
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Location"
                  fullWidth
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Submit Complaint
                </Button>
              </Grid>

            </Grid>

          </form>

        </Paper>

      </Box>

    </Container>

  );
}

export default AddComplaint;