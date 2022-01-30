import React, {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import "../App.css";
import axios, { Axios } from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'

function Signup(){
    const navigate = useNavigate();
    const [ user ,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confpass:""
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const register=()=>{
        const {username,email,password,confpass}=user;
        if(username && email && (password === confpass)){
            axios.post("http://localhost:4000/signup",user)
            .then(res=>{
                if(res.data.success){
                   navigate("/login")
                   document.getElementById("error-msg").style.display="none";
                }else{
                    document.getElementById("error-msg").style.display="block";
                    document.getElementById("error-msg").innerHTML=res.data.message
                }
            });
        }else{
            alert("invalid");
        }
    }
    return(
        <div>
            <div className='welcomeHeader'>
                <h2>Hi,Welcome</h2>
                <span id='todoLogo'><FontAwesomeIcon icon={faCheckCircle}/></span>
                <p>Todo App</p>
            </div>
            <div id='error-msg'></div>
            <div className="form">
                <form autoComplete='off'>
                    <input type="text" id='username' name='username' value={user.username} className='inputBoxes' placeholder='User Name' onChange={handleChange}></input>
                    <input type="email" id='email' name='email' value={user.email} className='inputBoxes' placeholder='Email' onChange={handleChange}></input>
                    <input type="password" id='password' name='password' value={user.password} className='inputBoxes' placeholder='Password' onChange={handleChange}></input>
                    <input type="password" id='confpass' name='confpass' value={user.confpass} className='inputBoxes' placeholder='Confirm Password' onChange={handleChange}></input>
                    <button type='button' onClick={register}>Register</button>
                </form>
                <div className='mt-10'>
                    Already Registered?<Link to={"/login"}> Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup