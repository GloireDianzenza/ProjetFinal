const {getAllPostsOrdered,findPost,getAllPostsByUser,addPost,editPost,removePost} = require("../controllers/post.controller");
const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>getAllPostsOrdered(req,res,next));
router.get("/:id",(req,res,next)=>findPost(req,res,next));
router.post("/user",(req,res,next)=>getAllPostsByUser(req,res,next));
router.post("/",(req,res,next)=>addPost(req,res,next));
router.put("/",(req,res,next)=>editPost(req,res,next));
router.delete("/",(req,res,next)=>removePost(req,res,next));

module.exports = router;