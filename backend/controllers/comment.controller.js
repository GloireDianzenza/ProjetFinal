const { sequelize } = require("../init");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

async function getAllComments(req,res,next){
    try{
        const comments = await Comment.findAll();
        let result = [];
        for(let c of comments){
            result.push(c.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        res.status(404).json(error);
    }
}

async function findComment(req,res,next){
    try{
        const comments = await Comment.findByPk(req.params.id);
        if(comments === null){
            throw new Error("Comment not found");
        }
        res.status(200).json(comments.dataValues);
        return comments.dataValues;
    }catch(error){
        res.status(404).json(error);
    }
}

async function getCommentsByPost(req,res,next){
    try{
        const postId = req.body.id;
        const comments = await Comment.findAll({where:{PostId:postId},order:[['id','DESC']]});
        let result = [];
        for(let c of comments){
            result.push(c.dataValues);
        }
        res.status(200).json(result);
        return result;
    }catch(error){
        res.status(404).json(error);
    }
}

async function addComment(req,res,next){
    try{
        const testUser = await User.findByPk(req.body.UserId);
        if(testUser === null)throw new Error("User not identified");
        const testPost = await Post.findByPk(req.body.PostId);
        if(testPost === null)throw new Error("Post not identified");
        const comment = await Comment.create({
            ...req.body
        });
        res.status(201).json({message:"Commentaire ajouté"});
    }catch(error){
        res.status(404).json(error);
    }
}

async function editComment(req,res,next){
    try{
        const id = req.params.id;
        const comment = await Comment.findByPk(id);
        comment.value = req.body.value;
        comment.save();
        res.status(201).json({message:"Commentaire modifié"});
    }catch(error){
        res.status(404).json(error);
    }
}

async function removeComment(req,res,next){
    try{
        const id = req.params.id;
        const comment = await Comment.findByPk(id);
        comment.destroy();
        res.status(201).json({message:"Commentaire supprimé"});
    }catch(error){
        res.status(404).json(error);
    }
}

module.exports = {getAllComments,findComment,getCommentsByPost,addComment,editComment,removeComment};