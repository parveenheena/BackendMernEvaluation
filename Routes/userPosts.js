const express = require("express")
const { auth } = require("../Middleware/auth")
const { postsModel } = require("../Model/postsModel")
const postsRouter = express.Router()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage:storage }).single('photo');o
postsRouter.post("/",auth,async(req,res)=>{
    console.log(req.body)
    try{
        const posts = new postsModel(req.body)
        await posts.save()
        res.send({"msg":"picture added successfully"})
    }catch(err){
        res.send({err})    
    }
})

postsRouter.get("/",auth,async(req,res)=>{
    try{
        const posts = await postsModel.find({userId:req.body.userId})
        res.send({posts})
    }catch(err){
        res.send({err})
    }
})

postsRouter.get("/:id",auth,async(req,res)=>{
    const {id} = req.params
    try{
        const posts = await postsModel.find({_id:id})
        res.send({posts})
    }catch(err){
        res.send({err})
    }
})

postsRouter.patch("/:postsid",auth,async(req,res)=>{
    const {postsid} = req.params
    try{
        const posts = await postsModel.findOne({_id:postsid})
        if(posts.userId===req.body.userId){
            await postsModel.findByIdAndUpdate({_id:postsid},req.body)
            res.send({"msg":"posts updated"})
        }
        else{
            res.send({"msg":"you are not authorized"})
        }
    }catch(err){
        res.send({err})
    }
})

postsRouter.delete("/:postsid",auth,async(req,res)=>{
    const {postsid} = req.params
    try{
        const posts = await postsModel.findOne({_id:postsid})
        if(posts.userId===req.body.userId){
        await postsModel.findByIdAndDelete({_id:postsid})
        res.send({"msg":"posts deleted"})
        }else{
            res.send({"msg":"you are not authorized"})
        }
    }catch(err){
        res.send({err})
    }
})

module.exports = {postsRouter}