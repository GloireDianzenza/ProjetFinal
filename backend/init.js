const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('finalproject', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});

module.exports = {sequelize,DataTypes};