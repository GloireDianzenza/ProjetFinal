const app = require("./app.js");
const port = 3500;
console.log(process.env);
const http = require("http");
const server = http.createServer(app);

server.on("listening",()=>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
})

server.listen(port);