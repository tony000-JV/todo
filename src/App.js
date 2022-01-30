
import React, { useState } from 'react';
import './App.css';
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [token, setToken] = useState();
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={
        (token)?<Home setToken={setToken}/>:<Login setToken={setToken}/>
      }/>
      <Route exact path="/login" element={<Login setToken={setToken}/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
       
    </Router>
  );
}

export default App;
