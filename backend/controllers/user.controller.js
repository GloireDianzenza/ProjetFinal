const { sequelize } = require("../init");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers(req,res,next){
    try{
        const users = await User.findAll();
        let result = [];
        for(let u of users){
            result.push(u.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        return res.status(404).json(error);
    }
}

async function checkUser(req,res,next){
    try{
        const concernedUser = await User.findOne({where:{email:req.body.email}});
        if(concernedUser !== null){
            const actualPassword = concernedUser.dataValues.password;
            bcrypt.compare(req.body.password,actualPassword)
            .then(data=>{
                if(data){
                    res.status(200).json(concernedUser.dataValues);
                    return concernedUser.dataValues;
                }
                else{
                    throw new Error("Invalid password");
                }
            }).catch(error=>{
                res.status(404).json(error);
                return;
            });
        }else{
            throw new Error("User not found");
        }
    }catch(error){
        res.status(404).json({error:"User couldn't be found"});
    }
}

async function findUser(req,res,next){
    try{
        const user = await User.findOne({where:{id:req.params.id}});
        if(user !== null){
            res.status(200).json(user.dataValues);
            return user.dataValues;
        }
        else{
            throw new Error("User not found");
        }
    }catch(error){
        res.status(404).json({error:"User not found"});
    }
}

async function userExists(req,res,next){
    try{
        const user = await User.findOne({where:{email:req.body.email}});
        if(user == null){
            res.status(200).json({});
            return {};
        }
        else{
            res.status(200).json(user.dataValues);
            return user.dataValues;
        }
    }catch(error){
        res.status(404).json({error:"An unknown error occured"});
    }
}

async function getAllAdmins(req,res,next){
    try{
        const admins = await User.findAll({where:{admin:1}});
        let result = [];
        for(let a of admins){
            result.push(a.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        res.status(404).json(error);
    }
}

async function addUser(req,res,next){
    try{
        bcrypt.hash(req.body.password,10)
        .then(async hash=>{
            const user = await User.create({email:req.body.email,password:hash});
            let newID = user.dataValues.id;
            res.status(201).json({message:"Utilisateur créé",id:newID});
            return {message:"Utilisateur créé",id:newID};
        })
        .catch(error=>{
            throw new Error(error);
        })
    }catch(error){
        res.status(404).json(error);
    }
}

async function editUser(req,res,next){
    try{
        bcrypt.hash(req.body.password,10)
        .then(async hash=>{
            const update = await sequelize.query(`UPDATE users SET email = '${req.body.email}', password = '${hash}' WHERE id = ${req.body.id}`);
            res.status(201).json({message:"Utilisateur modifié"});
        })
        .catch(error=>{
            throw new Error(error);
        })
    }
    catch(error){
        res.status(404).json(error);
    }
}

async function removeUser(req,res,next){
    try{
        let findID = await User.findOne({where:{email:req.body.email}});
        findID = findID.dataValues.id;

        let posts = await Post.findAll({where:{UserId:findID}});
        for(let p of posts){
            const id = p.dataValues.id;
            const deleteComments = await sequelize.query(`DELETE FROM comments WHERE PostId = ${id}`);
        }

        const deletePosts = await sequelize.query(`DELETE FROM posts WHERE UserId = ${findID}`);
        const deleter = await sequelize.query(`DELETE FROM users WHERE email = '${req.body.email}'`);
        res.status(201).json({message:"Utilisateur supprimé"});
    }
    catch(error){
        res.status(404).json(error);
    }
}

async function generateToken(req,res,next){
    try{
        let secretKey = process.env.JWT_SECRET_KEY;
        let data = req.body
        const token = jwt.sign(data,secretKey);
        console.log(token);
        res.status(201).json({token:token,id:req.body.id});
    }catch(error){
        res.status(404).json(error);
    }
}

async function validateToken(req,res,next){
    try{
        let headerKey = process.env.TOKEN_HEADER_KEY;
        let secretKey = process.env.JWT_SECRET_KEY;

        try{
            const token = req.header(headerKey);
            const verified = jwt.verify(token,secretKey);
            if(verified){
                res.status(200).json({token:verified});
            }
            else{
                res.status(401).send("Error");
            }
        }catch{
            throw new Error("Token couldn't be validated");
        }

        res.status(200).json({});
    }catch(error){
        res.status(404).json(error);
    }
}

module.exports = {getAllUsers,checkUser,findUser,userExists,getAllAdmins,addUser,editUser,removeUser,generateToken,validateToken};