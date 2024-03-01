import React from 'react'
import {Link,useNavigate} from "react-router-dom"

const Header = () => {
    const isUserSignedin = !!localStorage.getItem("token")
    const Navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        Navigate("/login")
    }
    return (
        <header >
            <div className="tm-title">
            <Link to= "/"><h1>Task Management App</h1></Link>
            </div>
            <div className="tm-links">
                <ul>
                    {isUserSignedin  ? ( <>
                        <Link to="/account"><li>Account</li></Link>
                    <li onClick={handleLogout}>Log Out</li>
                    </>) : (
                        <>
                        <Link to="/login"><li>Login</li></Link>
                    <Link to="/signup"><li>Sign Up</li></Link>
                        </>
                    ) }
                    
                </ul>
            </div>
        </header>
    )
}

export default Header
