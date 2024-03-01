import React from 'react'
import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, selectUserID } from '../store/reducers/userSlice';

const Login = () => {
    
    const dispatch = useDispatch();
    

    const [value,setValue] = useState({
        username:"",
        password:""
    })
    const [error,setError] =useState(null)
    const Navigate=useNavigate()

    const handleChange = (e) => {
        const {name,value} = e.target
        setValue((prev) => ({
            ...prev,
            [name] : value
        }))
        setError(null)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("https://mern-task-management.vercel.app/api/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: value.username,
                    password: value.password
                })
            })
            const data = await response.json()
           
            

            if(data.success){
                const token = data.token
                const userID = data.userID
                localStorage.setItem('token', token)
                Navigate("/account")
                window.location.reload();
                if(userID){
                    dispatch(setUserID(userID));
                }
               
            }
            else{
                setError(data.message)
            }
            
        }
        catch(error){
           setError(error.message)
        }
    }

    useEffect(() => {
        fetchUsers()
    },[])
    
    const fetchUsers = async () => {
        try{
            const response = await fetch("https://mern-task-management.vercel.app/api/user/register")
            const data = await response.json()
           
        }
        catch(error){
            console.log(error)
        }
    }


    return (
        <div  className="login-page">
            <div>

            <h2>Enter Login Details:</h2>
            <form>

                <label htmlFor="username">Enter Username: 
                    <input required name="username" id="username" value={value.username} onChange={handleChange} type="text" />
                </label>

                <br/>

                <label htmlFor="password">Enter password: 
                    <input  required name="password" id="password" value={value.password} onChange={handleChange}  type="password" />
                </label>

                <br/>

                <input value="Sign in" onClick ={handleSubmit} type="submit"/>


            </form>

            {error && <p>{error}</p>}
            </div>




        </div>
    )
}


export default Login
