import * as http from 'http';

import * as col from 'cli-color';

import { Server } from './server';

const server = new Server();
const port = normalizePort(process.env.API_PORT || 3000);

server.init().then(() => {
	server.app.set('port', port);
	const http_server = http.createServer(server.app);

	http_server.on('error', onError);
	http_server.on('listening', onListening);

	http_server.listen(port);
});

function normalizePort(val: number | string): number | string | boolean {
	let port: number = typeof val === 'string' ? parseInt(val, 10) : val;

	if (isNaN(port)) return val;
	else if (port >= 0) return port;
	else return false;
}

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall != 'listen') throw error;

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

function onListening(): void {
	console.log(col.cyanBright(`\n Customer Portal IS LIVE!`));
	console.log(
		col.white('===========================================================================')
	);
}
