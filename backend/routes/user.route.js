const {getAllUsers,checkUser,findUser,getAllAdmins,addUser,editUser,removeUser} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>getAllUsers(req,res,next));
router.get("/user/:id",(req,res,next)=>findUser(req,res,next));
router.get("/admin",(req,res,next)=>getAllAdmins(req,res,next));
router.post("/single",(req,res,next)=>checkUser(req,res,next));
router.post("/",(req,res,next)=>addUser(req,res,next));
router.put("/",(req,res,next)=>editUser(req,res,next));
router.delete("/",(req,res,next)=>removeUser(req,res,next));

module.exports = router;