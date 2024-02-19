const express = require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Routes/userRoutes")
const { postsRouter } = require("./Routes/userPosts")
require("dotenv").config()
const app = express()
const cors = require("cors")
// const multer = require("multer")

app.use(express.json())
app.use(cors())
app.use("/posts",postsRouter)
app.use("/users",userRouter)


app.listen(process.env.port,async()=>{
   try{ await connection
    console.log(`server is running at : http://localhost:${process.env.port}`)}
    catch(err){
        console.log(err)
    }
})