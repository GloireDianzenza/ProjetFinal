const {getAllUsers,checkUser,findUser,addUser,userExists,validateToken,resetToken} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>getAllUsers(req,res,next));
router.get("/user/:id",(req,res,next)=>findUser(req,res,next));
router.post("/single",(req,res,next)=>checkUser(req,res,next));
router.post("/user/exists",(req,res,next)=>userExists(req,res,next));
router.post("/",(req,res,next)=>addUser(req,res,next));

router.get("/user/token/validate/:id",(req,res,next)=>validateToken(req,res,next));
router.put("/reset",(req,res,next)=>resetToken(req,res,next));

module.exports = router;