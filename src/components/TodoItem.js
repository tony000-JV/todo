import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
function TodoItem({todo,getTodos,editTodos}){
    const user=JSON.parse(localStorage.getItem("user"));
    const deleteTodo=async()=>{
        await axios.post("http://localhost:4000/deletetask",{todo})
        .then(res=>{
            console.log(res)
            getTodos();
        })
    }
    return (
        <div>
            <li>
                <div>
                    <span>{todo.taskname}</span>
                    <div className="taskinfo">
                        <div>{todo.created_at.replaceAll("T"," ")}</div>
                        <div>created By: {todo.created_user}</div>
                    </div>
                </div>

               {(user._id==todo.created_by)?(
                            <div className='homeheader'>
                                <span className="editicon"><FontAwesomeIcon icon={faEdit} onClick={()=>editTodos(todo)}/></span>
                                <span className="deleteicon" onClick={deleteTodo}><FontAwesomeIcon icon={faTrash} /></span>
                            </div>
               ):(
                    <div className='homeheader'>
                    </div>
               )}
                
            </li>
        </div>
    )
}

export default TodoItem;