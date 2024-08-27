const express = require("express");
const app = express();
const {sequelize,DataTypes} = require("./init");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect()

module.exports = app;