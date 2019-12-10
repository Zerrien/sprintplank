const http = require('http');
const fs = require('fs');

const WebSocket = require('ws');
const webpack = require('webpack');

const indexHtml = fs.readFileSync('./index.html');

//const DashboardHeartBeat = require('./DashboardHeartBeat.js');
//const DashboardList = require('./DashboardList.js');
const items = require('./DashboardItems');

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
	dashboardItems.push(new items.DashboardHeartBeat());
	dashboardItems.push(new items.DashboardList(null, null, async function(values) {
		return values.people;
	}));
	dashboardItems.push(new items.DashboardPriorityList());
	const outstandingConnections = [];
	setInterval(async function() {
		await Promise.all(dashboardItems.map(elem => elem.gatherData()));
		outstandingConnections.forEach(item => {
			dashboardItems.forEach(elem => {
				item.send(elem.send("updateNode"));
			});
		});
	}, 1000);

	wss.on('connection', (ws) => {
		//ws.on('message', (event) => {});
		outstandingConnections.push(ws);
		dashboardItems.forEach(elem => {
			ws.send(elem.send("createNode"));
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