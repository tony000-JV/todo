const mongoose = require("mongoose")

const task= new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    completion_status:{
        type:String,
        required:true,
        default:"0"
    },
    created_by:{
        type:String,
        required:true
    },
    created_user:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    edited_at:{
        type:Date,
    }
})

module.exports=mongoose.model("tasks",task)