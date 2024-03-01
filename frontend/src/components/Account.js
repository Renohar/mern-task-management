import React from 'react'
import {useState,useEffect} from "react"
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"


const Account = () => {

    const [tasks,setTasks] = useState([])
    const userID = useSelector((state) => state.userID);
    
    const fetchTasks = async() => {
        try{
            const response = await fetch(`https://mern-task-management.vercel.app/api/task/tasks/${userID}`)
            const data = await response.json()
            setTasks(data)
        }
        catch(error){
            console.log(error)
        }
    }
    useState(() => {
        fetchTasks()
    },[])

    const handleDelete = async (id) => {
        try{
            const response = await fetch(`https://mern-task-management.vercel.app/api/task/delete/${id}`,{
                method: "DELETE"
            })
            fetchTasks()
        }
        catch(error){
            console.log(error)
        }
    }

    const handleComplete = async (id) => {
        try{
            const response = await fetch(`https://mern-task-management.vercel.app/api/task/complete/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            
            if(data.success){
                fetchTasks()
            }
            

        }
        catch(error){
            console.log(error)
        }
    }

    

    return (
        <div className="account-page">
            <div className="add-task">
                <Link to="/addtask">Add Task</Link>
            </div>
            <div className="task-table">
            <table>
                <thead>
                <tr>
                   
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
            
            {
                tasks.map((task,index) => (
                    <tr key={index} className={task.completed ? "abcs" : " "} onDoubleClick={() =>handleComplete(task._id)}>
                        
                        <td className="" >{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.dueDate.slice(0,10)}</td>
                        <td>
                        <Link to={`/updatetask/${task._id}`}><FaUserEdit  /></Link>
                        
                        <MdDelete onClick={() => handleDelete(task._id)} />
                        </td>
                    </tr>
                    
                )).reverse()
            }
            </tbody>
            </table>
            </div>
        </div>
    )
}

export default Account
