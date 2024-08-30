const app = require("./app.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port =process.env.PORT;
const http = require("http");
const server = http.createServer(app);

server.on("listening",()=>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
})

server.listen(port);