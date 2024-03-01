import express from "express"
const router = express.Router()
import Task from "../model/Task.js"

router.get("/tasks",async(req,res) => {
    try{
        const tasks = await Task.find()
        res.status(201).json(tasks)
    }
    catch(error){
        res.status(400).json({success:false,message:error})
    }
})

router.get("/tasks/:id",async(req,res) => {
    try{
        const {id} = req.params
        const tasks = await Task.find({user: id });
        res.status(201).json(tasks)
    }
    catch(error){
        res.status(400).json({success:false,message:error})
    }
})



router.get("/task/:id",async(req,res) => {
    try{
        const {id} = req.params
        const tasks = await Task.findById(id)
        res.status(201).json(tasks)
    }
    catch(error){
        res.status(400).json({success:false,message:error})
    }
})


router.post("/create", async(req,res) => {
    try{
        const { title, description, dueDate,completed, userId} = req.body
        const task = new Task({
            title, description, dueDate,completed,user: userId
        })
        const savedTask = await task.save();
        res.status(201).json({ success: true, message:"task Created" });
    }
    catch(error){
        res.status(400).json({success:false,message:error})
    }
})


router.delete("/delete/:id", async (req,res) => {
    try{
        const {id} = req.params
        const result = await Task.findByIdAndDelete(id)

        if(!result){
            return res.status(400).send({message: "Task not found"})
        }
        return res.status(200).send({message: "Task Deleted successfully"})
    }
    catch(error){
        res.status(400).json({success: false,message: "Delete Task Unsuccessfull"})
    }
})

router.put("/update/:id",async (req,res) => {

    try{
        const {id} = req.params;
    const result = await Task.findByIdAndUpdate(id,req.body)

    if(!result){
        return res.status(400).send({message: "Task not found"})
    }
    return res.status(200).send({message: "Task upadated successfully"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
})

router.put("/complete/:id",async (req,res) => {
    try{
        const {id} = req.params;
        const result = await Task.findById(id);

        if (!result) {
            return res.status(400).json({ message: 'Task not found' });
        }

        if(result['completed'] === false){
            result['completed'] = true
        }
        else{
            result['completed'] = false
        }

        await result.save()

        res.status(200.).json({success:true,message: "Task Completed"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})




export default router