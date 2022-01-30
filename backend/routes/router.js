const express = require("express")
const router = express.Router()
const userTemplate=require("../models/usersModel")
const taskTemplate=require("../models/taskModel")

router.post("/signup",(req,res)=>{
    userTemplate.findOne({email:req.body.email},(err,user)=>{
        if(user){
            res.send({success:false,message:"Email Already Taken"})
        }else{
            const user=new userTemplate({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
        
            })
            user.save()
            .then(data=>{
                res.send({success:true,message:"Successfully Registered",user:user});
            })
            .catch(error=>{
                res.json(error);
            })
        }
    })
})

router.post("/login",(req,res)=>{
    userTemplate.findOne({email:req.body.email},(err,user)=>{
        if(user){
            if(user.password===req.body.password){
                res.send({success:true,message:"Successfully Login",user:user})
            }else{
                res.send({success:false,message:"Invalid Login credentials"})
            }
        }else{
            res.send({success:false,message:"User Not Registered Signup Now"})
        }
    })
})

router.post("/addtask",(req,res)=>{
    const task=new taskTemplate({
        taskname:req.body.taskname,
        created_by:req.body.created_by,
        created_user:req.body.created_user,
    })
    task.save()
    .then(data=>{
        res.send({success:true,message:"Successfully Added",task:task});
    })
    .catch(error=>{
        res.json(error);
    })
})

router.get("/gettask",(req,res)=>{
    try {
        taskTemplate.find({},(err,tasks)=>{
            if(tasks){
                res.send({success:true,message:"Tasks Loaded",tasks:tasks})
            }else{
                res.send({success:false,message:"Cant get tasks"})
            }
        });
    }catch(err){
        res.send({success:false,message:err})
    }
})

router.post("/deletetask",(req,res)=>{
    try {
        taskTemplate.deleteOne({_id:req.body.todo._id},(err,task)=>{
            if(task){
                res.send({success:true,message:"Tasks Removed"})
            }else{
                res.send({success:false,message:"Cant Remove Task"})
            }
        });
    }catch(err){
        res.send({success:false,message:err})
    }
})

router.post("/updatetask",(req,res)=>{
    try {
        taskTemplate.updateOne({_id:req.body.id},{
            $set:{
                taskname:req.body.taskname,
                created_by:req.body.created_by
            }
            }
            ,(err,tasks)=>{
            if(tasks){
                res.send({success:true,message:"Tasks Updated",tasks:tasks})
            }else{
                res.send({success:false,message:"Cant Update tasks"})
            }
        });
    }catch(err){
        res.send({success:false,message:err})
    }
})
module.exports=router