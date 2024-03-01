import React from 'react'
import {useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { selectUserID } from '../store/reducers/userSlice';

const AddTask = () => {
    const userID = useSelector((state) => state.userID);
    const Navigate = useNavigate()

    const [task,setTask] = useState({
        title:"",
        description:"",
        dueDate:"",
        completed: false,
        userID:userID
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setTask((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const taskSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/task/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    dueDate : task.dueDate,
                    completed : task.completed,
                    userId : task.userID
                })
            })

            const data = await response.json()
            if(data.success){
                Navigate("/account")
            }

        }
        catch(error){
            console.log(error.message)
        }
    }
    return (
        <div className="login-page">
            <h2>Create Task</h2>
            <div>
                <form>

                    <label htmlFor="title">Enter Task Title:
                        <input name="title" id="title" value={task.title} onChange={handleChange} type="text" />
                    </label>
                    <br/>

                    <label htmlFor="description">Enter Task Description:
                        <input name="description" id="description" value={task.description} onChange={handleChange} type="text" />
                    </label>
                    <br/>

                    <label htmlFor="dueDate">Enter Task dueDate:
                        <input name="dueDate" id="dueDate" value={task.dueDate} onChange={handleChange} type="date" />
                    </label>
                    <br/>

                    <input onClick={taskSubmit} type="submit" value="Add Task"/>

                </form>
            </div>
        </div>
    )
}

export default AddTask
