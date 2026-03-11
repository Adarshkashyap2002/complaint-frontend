import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import API_URL from "../api";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    if (e) e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await axios.post(`${API_URL}/api/token/`, {
        username: username.trim(),
        password: password.trim(),
      });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      navigate("/complaints");

    } catch (err) {

      console.error(err.response?.data);

      setError("Invalid username or password");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/complaints");
    }

  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <Container maxWidth="xs">

        <Fade in={true} timeout={800}>

          <Paper elevation={10} sx={{ p:4, borderRadius:3 }}>

            <Box
              sx={{
                backgroundColor:"primary.main",
                borderRadius:"50%",
                p:2,
                display:"inline-flex",
                mb:2,
                color:"white",
              }}
            >
              <LockOutlined/>
            </Box>

            <Typography variant="h4" fontWeight="bold">
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt:2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>

              <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                InputProps={{
                  startAdornment:(
                    <InputAdornment position="start">
                      <PersonOutline/>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text":"password"}
                margin="normal"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                InputProps={{
                  startAdornment:(
                    <InputAdornment position="start">
                      <LockOutlined/>
                    </InputAdornment>
                  ),
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        onClick={()=>setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt:3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24}/> : "Login"}
              </Button>

            </form>

          </Paper>

        </Fade>

      </Container>
    </Box>
  );
}

export default Login;