const {getCommentsByPost,addComment} = require("../controllers/comment.controller");
const express = require("express");
const router = express.Router();

router.post("/",(req,res,next)=>addComment(req,res,next));
router.post("/list",(req,res,next)=>getCommentsByPost(req,res,next));

module.exports = router;