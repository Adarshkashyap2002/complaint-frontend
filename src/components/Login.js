import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const response = await axios.post(
        `${API_URL}/api/token/`,
        {
          username: username,
          password: password
        }
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      navigate("/complaints");

    } catch (error) {

      console.error(error);
      alert("Login failed");

    }

    setLoading(false);

  };

  return (

    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          {loading ? "Logging..." : "Login"}
        </button>

      </form>

    </div>

  );
}

export default Login;