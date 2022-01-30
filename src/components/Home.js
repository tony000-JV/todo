import React, {useEffect, useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import "../App.css";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import TodoItem from "./TodoItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faCheck } from '@fortawesome/free-solid-svg-icons'

function Home({setToken}){
    const user=JSON.parse(localStorage.getItem("user"));
    const [ task ,setTask]=useState({
        id:"",
        taskname:"",
        created_by:user._id,
        created_user:user.username
    })
    const [todos,setTodos]=useState([])
    const [editTodoData,setEditTodos]=useState(null);


    useEffect(()=>{
        getTodos();
    },[])

    useEffect(()=>{
        if(editTodoData){
            console.log(editTodoData)
            setTask({
                id:(editTodoData._id)?editTodoData._id:"",
                taskname:(editTodoData.taskname)?editTodoData.taskname:"",
                created_by:(editTodoData.created_by)?editTodoData.created_by:user._id,
                created_user:(editTodoData.created_user)?editTodoData.created_user:user.username
            })
        }
    },[editTodoData])
    const editTodos=(todo)=>{
        setEditTodos(todo);
    }
    const getTodos=async ()=>{
        const data=await axios.get("http://localhost:4000/gettask")
        setTodos(data.data.tasks);
    }

   const renderTodos=()=>{
       return todos.map((todo,i)=>{
           return <TodoItem key={i} todo={todo} getTodos={getTodos} editTodos={editTodos}/>
       })
   } 


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setTask({
            ...task,
            [name]:value
        })
    }
    const addtask=()=>{
        const {taskname}=task;
        if(taskname){
            if(editTodoData){
                axios.post("http://localhost:4000/updatetask",task)
                .then(res=>{
                    if(res.data.success){
                        setTask({
                            taskname:"",
                            created_by:user._id,
                            id:"",
                            created_user:user.username
                        });
                        getTodos();
                    document.getElementById("error-msg").style.display="none";
                    }else{
                        document.getElementById("error-msg").style.display="block";
                        document.getElementById("error-msg").innerHTML=res.data.message
                    }
                });
            }else{
                axios.post("http://localhost:4000/addtask",task)
                .then(res=>{
                    if(res.data.success){
                        setTask({
                            taskname:"",
                            created_by:user._id,
                            id:"",
                            created_user:user.username
                        });
                        getTodos();
                    document.getElementById("error-msg").style.display="none";
                    }else{
                        document.getElementById("error-msg").style.display="block";
                        document.getElementById("error-msg").innerHTML=res.data.message
                    }
                });
            }
               
        }else{
            document.getElementById("error-msg").style.display="block";
            document.getElementById("error-msg").innerHTML="Provide Task Name";
        }
    }
   
    return(
        <div>
            <div className='homeheader'>
                <p>Todo App</p>
                <div>
                   <Link to={"/login "} className='logoutbtn'><FontAwesomeIcon icon={faPowerOff}/></Link>
                </div>
            </div>
            <div id='error-msg'></div>
            <div className="form">
                <form autoComplete='off' className='homeheader'>
                    <input type="text" id='taskname' value={task.taskname} name='taskname' className='taskBox' placeholder='Task' onChange={handleChange}></input>
                    <button type="button" className='addbtn' onClick={addtask}><FontAwesomeIcon icon={faCheck}/></button>
                </form>
                <div className='addedtasks'>
                    <ul className='tasklist'>
                        {renderTodos()}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;