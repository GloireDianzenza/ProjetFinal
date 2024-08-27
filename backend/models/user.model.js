const {sequelize,DataTypes} = require("../init");

const User = sequelize.define("User",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    admin:{type:DataTypes.TINYINT,allowNull:false,defaultValue:0}
});

module.exports = User;