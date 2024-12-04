const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

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

module.exports = {getCommentsByPost,addComment};