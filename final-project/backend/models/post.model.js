const {sequelize,DataTypes} = require("../init");
const User = require("./user.model");

const Post = sequelize.define("Post",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    date:{type:DataTypes.DATE,allowNull:false,unique:false,defaultValue:DataTypes.NOW},
    texte:{type:DataTypes.TEXT,allowNull:true,unique:false},
    image:{type:DataTypes.STRING,allowNull:true,unique:false}
});

Post.belongsTo(User);

module.exports = Post;