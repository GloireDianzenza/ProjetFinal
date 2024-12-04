const {sequelize,DataTypes} = require("../init");
const User = require("./user.model");
const Post = require("./post.model");

const Comment = sequelize.define("Comment",{
    value:{type:DataTypes.TEXT,
        allowNull:true,
        defaultValue:null}
});
Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;