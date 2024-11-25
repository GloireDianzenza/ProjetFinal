const {getAllComments,findComment,getCommentsByPost,addComment,editComment,removeComment} = require("../controllers/comment.controller");
const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>getAllComments(req,res,next));
router.post("/",(req,res,next)=>addComment(req,res,next));
router.post("/list",(req,res,next)=>getCommentsByPost(req,res,next));
router.get("/:id",(req,res,next)=>findComment(req,res,next));
router.put("/:id",(req,res,next)=>editComment(req,res,next));
router.delete("/:id",(req,res,next)=>removeComment(req,res,next));

module.exports = router;