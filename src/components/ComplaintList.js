import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box
} from "@mui/material";

function ComplaintList() {

  const [complaints,setComplaints] = useState([]);

  const fetchComplaints = async () => {

    const token = localStorage.getItem("access_token");

    try{

      const res = await axios.get(
        `${API_URL}/api/complaints/`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setComplaints(res.data);

    }catch(err){
      console.error(err);
    }

  };

  useEffect(()=>{
    fetchComplaints();
  },[]);

  const total = complaints.length;
  const pending = complaints.filter(c=>c.status==="Pending").length;
  const resolved = complaints.filter(c=>c.status==="Resolved").length;

  return (

    <Container>

      <Box sx={{mt:5}}>

        <Typography variant="h4" mb={4}>
          Complaint Dashboard
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Complaints</Typography>
                <Typography variant="h3">{total}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h3">{pending}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Resolved</Typography>
                <Typography variant="h3">{resolved}</Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        <Box mt={5}>

          <Typography variant="h5" mb={2}>
            Complaints List
          </Typography>

          {complaints.map((c)=>(
            <Card key={c.id} sx={{mb:2}}>
              <CardContent>

                <Typography variant="h6">
                  {c.title}
                </Typography>

                <Typography>
                  {c.description}
                </Typography>

                <Typography>
                  Location: {c.location}
                </Typography>

                <Typography>
                  Status: {c.status}
                </Typography>

              </CardContent>
            </Card>
          ))}

        </Box>

      </Box>

    </Container>

  );
}

export default ComplaintList;