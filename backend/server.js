const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routerUrl=require("./routes/router");
const cors = require("cors")

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database Connected"))

app.use(express.json())
app.use(cors())
app.use("/",routerUrl)
app.listen(4000,()=>console.log("Server is started at port 4000"))
