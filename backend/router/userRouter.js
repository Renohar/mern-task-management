import express from "express"
import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import {SECRET_KEY} from "../config.js"

const router = express.Router()

router.post("/register", async (req,res) => {
    try{
        const {username,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({username,password:hashedPassword})
        await newUser.save()
        res.status(201).json({success: true,message:"User registered Successfully"})
    }
    catch(error){
        res.status(400).json({sucess:false,message:"User Registration is Unsuccessfull"})
    }
    
})


router.get("/register", async (req,res) => {
    try{
        const users = await User.find();
        res.status(201).json(users)
    }
    catch(eror){
        res.status(400).json({message: "Unable to get Users"})
    }
})

router.post("/login",async (req,res) => {
    try{
        const {username,password} = req.body

        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({success:false,message: "Invalid Credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({success:false,message: "Invalid Credentials"})
        }

        const userID = user._id
        const token  = jwt.sign({userID:user._id},process.env.SECRET_KEY,{expiresIn:'1hr'})
        res.status(200).json({success:true,message: "Login successfull",token,userID})
    }
    catch(eror){
        res.status(400).json({success: false,message: "Login Unsuccessfull"})
    }
})





export default router