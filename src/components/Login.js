import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://complaint-backend-hjhv.onrender.com";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await axios.post(`${API_URL}/api/token/`, {
        username,
        password,
      });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      navigate("/complaints");

    } catch (err) {

      setError("Invalid username or password");

    } finally {

      setLoading(false);

    }

  };

  const handleForgotPassword = () => {

    alert("Password reset feature not implemented yet. Contact admin.");

  };

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

          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
            }}
          >

            <Box
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "50%",
                p: 2,
                display: "inline-flex",
                mb: 2,
                color: "white",
              }}
            >
              <LockOutlined />
            </Box>

            <Typography variant="h4" fontWeight="bold">
              Login
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Sign in to continue
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>

              <TextField
                fullWidth
                label="Username"
                margin="normal"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>

            </form>

            <Typography
              variant="body2"
              sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Typography>

          </Paper>

        </Fade>

      </Container>
    </Box>
  );
}

export default Login;