import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

import "./login.css";

function Login(){

const navigate = useNavigate();

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);
const [showPassword,setShowPassword] = useState(false);

const handleLogin = async(e)=>{

e.preventDefault();
setLoading(true);

try{

const res = await axios.post(
`${API_URL}/api/token/`,
{
username:username,
password:password
}
);

localStorage.setItem("access_token",res.data.access);
localStorage.setItem("refresh_token",res.data.refresh);

navigate("/complaints");

}catch(err){

alert("Invalid username or password");

}

setLoading(false);

};

return(

<div className="login-page">

<div className="login-card">

<div className="header">
<h2>Sign in</h2>
<p>Enter your details to access your account</p>
</div>

<form onSubmit={handleLogin}>

<div className="input-group">

<div className="input-wrapper">

<i className="ri-mail-line"></i>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
required
/>

</div>

</div>

<div className="input-group">

<div className="input-wrapper">

<i className="ri-lock-2-line"></i>

<input
type={showPassword ? "text":"password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<i
className="ri-eye-line toggle"
onClick={()=>setShowPassword(!showPassword)}
></i>

</div>

</div>

<button type="submit" className="login-btn">

{loading ? "Processing..." : "Continue"}

</button>

</form>

<div className="footer">

Don't have an account?
<span className="link-btn"> Create one</span>

</div>

</div>

</div>

);

}

export default Login;