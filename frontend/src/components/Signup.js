import React from 'react'
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"

const Signup = () => {

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
            const response = await fetch("http://localhost:5000/api/user/register",{
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
                
                alert(data.message)
                Navigate("/login")
            }
            else{
                setError(data.message)
            }
            
        }
        catch(error){
           setError()
        }
    }

    useEffect(() => {
        fetchUsers()
    },[])
    
    const fetchUsers = async () => {
        try{
            const response = await fetch("http://localhost:5000/api/user/register")
            const data = await response.json()
           
        }
        catch(error){
            console.log(error)
        }
    }


    return (
        <div className="login-page">
            <div>
            <h2>Enter Signup Details:</h2>
            <form>

                <label  htmlFor="username">Enter Username: 
                    <input required name="username" id="username" value={value.username} onChange={handleChange} type="text" />
                </label>

                <br/>

                <label htmlFor="password">Enter password: 
                    <input required name="password" id="password" value={value.password} onChange={handleChange}  type="password" />
                </label>

                <br/>

                <input value="Sign up" onClick ={handleSubmit} type="submit"/>


            </form>

            {error && <p>{error}</p>}
            </div>

           
            


        </div>
    )
}

export default Signup
