import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  Chip
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DashboardLayout from "./DashboardLayout";
import ComplaintChart from "./ComplaintChart";

function ComplaintList() {

  const [complaints,setComplaints] = useState([]);

  useEffect(()=>{

    const token = localStorage.getItem("access_token");

    axios.get(
      `${API_URL}/api/complaints/`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    .then(res=>{
      setComplaints(res.data);
    })
    .catch(err=>{
      console.log(err);
    });

  },[]);

  const total = complaints.length;
  const pending = complaints.filter(c=>c.status==="Pending").length;
  const resolved = complaints.filter(c=>c.status==="Resolved").length;

  const statusColor = (status)=>{

    if(status==="Pending") return "warning";
    if(status==="Resolved") return "success";
    return "default";

  };

  return (

    <Box
      sx={{
        minHeight:"100vh",
        background:"linear-gradient(135deg,#eef2ff,#f8fafc)",
        py:4
      }}
    >

    <DashboardLayout>

      <Container maxWidth="lg">

        <Typography variant="h4" fontWeight="bold" mb={4}>
          Complaint Dashboard
        </Typography>

        <Grid container spacing={3} mb={5}>

          <Grid item xs={12} md={4}>
            <Card sx={{height:120,display:"flex",alignItems:"center",justifyContent:"space-between",px:3,borderRadius:4,background:"#f1f5ff"}}>
              <Box>
                <Typography variant="h6">Total Complaints</Typography>
                <Typography variant="h3" fontWeight="bold">{total}</Typography>
              </Box>
              <AssignmentIcon color="primary"/>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{height:120,display:"flex",alignItems:"center",justifyContent:"space-between",px:3,borderRadius:4,background:"#fff7e6"}}>
              <Box>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h3" fontWeight="bold">{pending}</Typography>
              </Box>
              <PendingActionsIcon color="warning"/>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{height:120,display:"flex",alignItems:"center",justifyContent:"space-between",px:3,borderRadius:4,background:"#ecfff4"}}>
              <Box>
                <Typography variant="h6">Resolved</Typography>
                <Typography variant="h3" fontWeight="bold">{resolved}</Typography>
              </Box>
              <CheckCircleIcon color="success"/>
            </Card>
          </Grid>

        </Grid>

        <Paper sx={{ p:3, borderRadius:4, mb:5 }}>

          <Typography variant="h6" mb={2}>
            Complaint Analytics
          </Typography>

          <ComplaintChart pending={pending} resolved={resolved} />

        </Paper>

        {complaints.map(c=>(

          <Paper
            key={c.id}
            sx={{p:3,mb:2,borderRadius:4,border:"1px solid #eee"}}
          >

            <Typography variant="h6">
              {c.title}
            </Typography>

            <Typography color="text.secondary">
              {c.description}
            </Typography>

            <Box mt={2} display="flex" justifyContent="space-between">

              <Typography>
                📍 {c.location}
              </Typography>

              <Chip
                label={c.status}
                color={statusColor(c.status)}
              />

            </Box>

          </Paper>

        ))}

      </Container>

    </DashboardLayout>

    </Box>

  );

}

export default ComplaintList;