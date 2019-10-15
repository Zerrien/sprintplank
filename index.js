const http = require('http');
const fs = require('fs');

const WebSocket = require('ws');

const indexHtml = fs.readFileSync('./index.html');
const clientJs = fs.readFileSync('./client.js');

const wss = new WebSocket.Server({
	port: 8081
});

let curArray = [
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
	Math.random(),
];

const outstandingConnections = [];
setInterval(function() {
	curArray.push(Math.random());
	curArray.shift();
	outstandingConnections.forEach(item => {
		item.send(JSON.stringify({
			type: "updateNode",
			id: "do_thing",
			data: curArray,
		}));
	});
}, 1000);

wss.on('connection', (ws) => {
	ws.on('message', (event) => {
	});
	outstandingConnections.push(ws);
	ws.send(JSON.stringify({
		type: "createNode",
		id: "do_thing",
		data: curArray,
	}));
});

http.createServer((req, res) => {
	if(req.url === "/" || req.url === "/index.html") {
		res.end(indexHtml);
	} else if (req.url === "/client.js") {
		res.end(clientJs);
	} else {
		res.statusCode = 404;
		res.end();
	}
}).listen(8080);
