const {getAllUsers,checkUser,findUser,getAllAdmins,addUser,editUser,removeUser,userExists, generateToken,validateToken} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>getAllUsers(req,res,next));
router.get("/user/:id",(req,res,next)=>findUser(req,res,next));
router.get("/admin",(req,res,next)=>getAllAdmins(req,res,next));
router.post("/single",(req,res,next)=>checkUser(req,res,next));
router.post("/user/exists",(req,res,next)=>userExists(req,res,next));
router.post("/",(req,res,next)=>addUser(req,res,next));
router.put("/",(req,res,next)=>editUser(req,res,next));
router.delete("/",(req,res,next)=>removeUser(req,res,next));

router.post("/user/token/generate",(req,res,next)=>generateToken(req,res,next));
router.get("/user/token/validate",(req,res,next)=>validateToken(req,res,next));

module.exports = router;