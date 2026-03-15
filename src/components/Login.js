import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

import "./login.css";

function Login(){

const navigate = useNavigate();
const canvasRef = useRef(null);

const [username,setUsername] = useState("admin");
const [password,setPassword] = useState("admin123");
const [loading,setLoading] = useState(false);
const [showPassword,setShowPassword] = useState(false);

/* LOGIN */

const handleLogin = async(e)=>{

e.preventDefault();
setLoading(true);

try{

const res = await axios.post(
`${API_URL}/api/token/`,
{
username,
password
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

/* PARTICLE ANIMATION */

useEffect(()=>{

const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");

let particles=[];

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

class Particle{

constructor(){

this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.dx=(Math.random()-0.5)*0.6;
this.dy=(Math.random()-0.5)*0.6;

}

draw(){

ctx.beginPath();
ctx.arc(this.x,this.y,2,0,Math.PI*2);
ctx.fillStyle="rgba(59,130,246,0.6)";
ctx.fill();

}

update(){

this.x+=this.dx;
this.y+=this.dy;

if(this.x<0||this.x>canvas.width) this.dx*=-1;
if(this.y<0||this.y>canvas.height) this.dy*=-1;

this.draw();

}

}

function init(){

particles=[];

for(let i=0;i<100;i++){
particles.push(new Particle());
}

}

function animate(){

requestAnimationFrame(animate);

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>p.update());

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;

let dist=dx*dx+dy*dy;

if(dist<18000){

ctx.strokeStyle=`rgba(59,130,246,${1-dist/18000})`;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}

}

}

}

init();
animate();

},[]);

return(

<div className="login-page">

<canvas ref={canvasRef} className="canvas-bg"></canvas>

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

<button className="login-btn" type="submit">

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