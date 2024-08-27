const {getAllUsers,checkUser,findUser,getAllAdmins} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>getAllUsers(req,res,next));
router.get("/:id",(req,res,next)=>findUser(req,res,next));
router.get("/admin",(req,res,next)=>getAllAdmins(req,res,next));
router.post("/single",(req,res,next)=>checkUser(req,res,next));

module.exports = router;