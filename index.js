const webpackConfig = require('./webpack.config.js');

const http = require('http');
const fs = require('fs');

const WebSocket = require('ws');
const webpack = require('webpack');

const indexHtml = fs.readFileSync('./index.html');

//const DashboardHeartBeat = require('./DashboardHeartBeat.js');
//const DashboardList = require('./DashboardList.js');
const items = require('./DashboardItems');
const { fetchJSON, fetchText } = require("./utils.js");

const wss = new WebSocket.Server({
	port: 8081
});

let clientJs;
webpack(webpackConfig, (err, stats) => {
	if(err) throw err;
	clientJs = fs.readFileSync('./dist/bundle.js');
	main();
});

// const arr2 = ["Disabled", "Aborted", "Failed", "Unstable", "In progress", "Success"];

// TODO: Fill this in with URLs
const arr = [
	{
		url: '',
		jobName: '',
	}
]

function main() {
	const dashboardItems = [];
	dashboardItems.push(new items.DashboardHeartBeat());
	dashboardItems.push(new items.DashboardPriorityList(null, null, async function(values) {
		const results = await Promise.all(arr.map(async function(elem) {
			return {
				text: await fetchText(elem.url),
				elem: elem,
			};
		}));
		return results.map(elem => {
			return {
				name: elem.elem.jobName,
				status: elem.text,
			}
		});
	}));
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