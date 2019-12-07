const http = require('http');
const fs = require('fs');

const WebSocket = require('ws');
const webpack = require('webpack');

const indexHtml = fs.readFileSync('./index.html');
//const clientJs = fs.readFileSync('./client.js');

const DashboardHeartBeat = require('./DashboardHeartBeat.js');

const wss = new WebSocket.Server({
	port: 8081
});

let clientJs;
webpack({
	"entry":"./client.js",
	"output": {
		"filename": "bundle.js",
	},
}, (err, stats) => {
	if(err) throw err;
	clientJs = fs.readFileSync('./dist/bundle.js');
	main();
});

function main() {
	const dashboardItems = [];
	dashboardItems.push(new DashboardHeartBeat());
	const outstandingConnections = [];
	setInterval(function() {
		dashboardItems.forEach(elem => {
			elem.gatherData();
		});
		outstandingConnections.forEach(item => {
			dashboardItems.forEach(elem => {
				item.send(elem.sendData());
			});
		});
	}, 1000);

	wss.on('connection', (ws) => {
		//ws.on('message', (event) => {});
		outstandingConnections.push(ws);
		dashboardItems.forEach(elem => {
			ws.send(elem.createData());
		});
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
}