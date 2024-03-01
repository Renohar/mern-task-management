import React from 'react'
import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"

const UpdateTask = () => {
    const [task,setTask] = useState({
        title:"",
        description: "",
        dueDate:""
    })

    const {id} = useParams()
    const Navigate = useNavigate()

    const fetchTask = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/task/task/${id}`)
            const data = await response.json()
            const formattedDate = data.dueDate.slice(0,10)
            setTask({...data,dueDate:formattedDate})
            
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTask()
    },[])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setTask((prev) => ({
            ...prev,
            [name]:value
        }))
       

    }

    const updateTask = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:5000/api/task/update/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(task)
            })

            setTask({
                title:"",
                description: "",
                dueDate:""
            })
            Navigate("/account")
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className="login-page">
            <h2>Update Task</h2>
            <div>
                <form>

                    <label htmlFor="title">Enter Task Title:
                        <input name="title" id="title" value={task.title} onChange={handleChange}  type="text" />
                    </label>
                    <br/>

                    <label htmlFor="description">Enter Task Description:
                        <input name="description" id="description" value={task.description} onChange={handleChange}  type="text" />
                    </label>
                    <br/>

                    <label htmlFor="dueDate">Enter Task dueDate:
                        <input name="dueDate" id="dueDate" value={task.dueDate} onChange={handleChange}  type="date" />
                    </label>
                    <br/>

                    <input onClick={updateTask}  type="submit" value="Update Task"/>

                </form>
            </div>
        </div>
    )
}

export default UpdateTask
