const { sequelize } = require("../init");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

async function getAllPosts(req,res,next){
    try{
        const posts = await Post.findAll();
        let result = [];
        for(let p of posts){
            result.push(p.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        res.status(404).json(error);
    }
}

async function getAllPostsOrdered(req,res,next){
    try{
        const posts = await Post.findAll({order:[['date','DESC'],['id',"ASC"]]});
        let result = [];
        for(let p of posts){
            result.push(p.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        res.status(404).json(error);
    }
}

async function findPost(req,res,next){
    try{
        const post = await Post.findByPk(req.params.id);
        if(post !== null){
            res.status(200).json(post.dataValues);
            return post.dataValues;
        }
        else{
            throw new Error("Post not found");
        }
    }catch(error){
        res.status(404).json({error:"Post not found"});
    }
}

async function getAllPostsByUser(req,res,next){
    try{
        const user = await User.findOne({where:{email:req.body.email}});
        const id = user.dataValues.id;
        const posts = await Post.findAll({where:{UserId:id},order:[['date','DESC'],['id',"ASC"]]});
        let result = [];
        for(let p of posts){
            result.push(p.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        res.status(404).json(error);
    }
}

async function addPost(req,res,next){
    try{
        let userId = await User.findOne({where:{email:req.body.email}});
        userId = userId.dataValues.id;
        const post = Post.create({
            UserId:userId,texte:req.body.texte,image:req.body.image
        });
        res.status(201).json({message:"Post créé"});
    }catch(error){
        res.status(404).json({error:"Conditions non respectées"})
    }
}

async function editPost(req,res,next){
    //id = NON
    //date = YES
    //texte = YES
    //image = YES
    //user = NO
    try{
        const today = new Date();
        const year = today.getFullYear().toString();
        const month = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1).toString();
        const day = (today.getDate() < 10 ? "0" : "") + (today.getDate()).toString();
        const newDate = year+"-"+month+"-"+day;

        const post = await Post.findByPk(req.body.id);
        post.texte = req.body.texte;
        post.image = req.body.image;
        post.date = newDate;
        post.save();
        res.status(201).json({message:"Post modifié"});
    }catch(error){
        res.status(404).json({error:"Conditions non respectées"})
    }
}

async function removePost(req,res,next){
    //id = NON
    //date = YES
    //texte = YES
    //image = YES
    //user = NO
    try{
        const comments = await Comment.findAll({where:{PostId:req.body.id}});
        for(let c of comments){
            c.destroy();
        }
        const post = await Post.findOne({where:{id:req.body.id}});
        post.destroy();
        res.status(201).json({message:"Post supprimé"});
    }catch(error){
        res.status(404).json({error:"Conditions non respectées"})
    }
}

module.exports = {getAllPostsOrdered,findPost,getAllPostsByUser,addPost,editPost,removePost};