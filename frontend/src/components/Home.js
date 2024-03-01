import React from 'react'
import task from "../files/task.webp"

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-text">
                <div>
                <h2>Task Management App</h2>
                <p>Streamline your tasks with task management app.</p>
                </div>
                
            </div>
            
            <div className="home-image">
                <img src={task} alt="Task Image"/>
            </div>
        </div>
    )
}

export default Home
