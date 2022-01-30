
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import "../App.css";
import axios, { Axios } from "axios";
import {Link,useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'

const Login=({setToken})=>{
    const navigate = useNavigate();
    const [ user ,setUser]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const login=()=>{
        const {email,password}=user;
        if(email && password){
            axios.post("http://localhost:4000/login",user)
            .then(res=>{
                if(res.data.success){
                    document.getElementById("error-msg").style.display="none";
                    setToken(res.data.user)
                    const userData=JSON.stringify(res.data.user);
                    console.log(userData,res.data.tasks)
                    localStorage.setItem("user",userData);
                    navigate('/');
                }else{
                    document.getElementById("error-msg").style.display="block";
                    document.getElementById("error-msg").innerHTML=res.data.message
                }
            })
        }else{
            document.getElementById("error-msg").style.display="block";
            document.getElementById("error-msg").innerHTML="Invalid login Credentials"
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
                    <input type="email" id='email' name='email' value={user.email} className='inputBoxes' placeholder='Email' onChange={handleChange}></input>
                    <input type="password" id='password' name='password' value={user.pass} className='inputBoxes' placeholder='Password' onChange={handleChange}></input>
                    <button type="button" onClick={login}>Login</button>
                </form>
                <div className='mt-10'>
                    Not Registered?<Link to={"/signup "}> Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;