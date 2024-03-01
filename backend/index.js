import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
// import {PORT,MONGO_URL} from "./config.js"
import userRouter from "./router/userRouter.js"
import taskRouter from "./router/taskRouter.js"
// import bodyParser from "body-parser"

const app = express()
app.use(express.json())
// app.use(bodyParser.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 5000; 
const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL)
.then(()=> {
    app.listen(PORT,() => {
        console.log(`server is running in port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})


app.get("/",(req,res) => {
    res.send("Task Management API")
})

app.use("/api/user",userRouter)
app.use("/api/task",taskRouter)




