"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const col = require("cli-color");
const server_1 = require("./server");
const server = new server_1.Server();
const port = normalizePort(process.env.API_PORT || 3000);
server.init().then(() => {
    server.app.set('port', port);
    const http_server = http.createServer(server.app);
    http_server.on('error', onError);
    http_server.on('listening', onListening);
    http_server.listen(port);
});
function normalizePort(val) {
    let port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall != 'listen')
        throw error;
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    console.log(col.cyanBright(`\n Customer Portal IS LIVE!`));
    console.log(col.white('==========================================================================='));
}
