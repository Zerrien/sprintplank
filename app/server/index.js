const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8081});

const { fetchJSON, fetchText } = require("../utils.js");
const { launchHTTPServer } = require('./HTTPServer');
const { DashboardItem } = require('./DashboardItem');

(async function() {
	await launchHTTPServer();
	main();
})();

// const arr2 = ["Disabled", "Aborted", "Failed", "Unstable", "In progress", "Success"];
// TODO: Fill this in with URLs
const arr = [];

const dashboardItems = [];

dashboardItems.push(new DashboardItem(null, null, "DashboardHeartBeat", async function() {
	if(this.statArray.length > 50) {
		this.statArray.shift();
	}
	return this.statArray.concat(Math.sin(Math.random()));
}));

dashboardItems.push(new DashboardItem(null, null, "DashboardPriorityList", async function() {
	return (await Promise.all(arr.map(async function(elem) {
		return {
			json: await fetchJSON(elem.url),
			elem: elem,
		}
	}))).map(elem => {
		return {
			name: elem.elem.jobName,
			status: elem.text
		}
	});
}));

function main() {
	const outstandingConnections = [];
	const a = doThingMain(dashboardItems, outstandingConnections);

	a();
	setInterval(a, 1000);

	wss.on('connection', (ws) => {
		outstandingConnections.push(ws);
		dashboardItems.forEach(elem => {
			ws.send(elem.send("createNode"));
		});
	});
}

function doThingMain(dashboardItems, outstandingConnections) {
	return async function() {
		await Promise.all(dashboardItems.map(elem => {
			return elem.gatherData()
		}));
		for(const client of outstandingConnections) {
			for(const dashboardItem of dashboardItems) {
				client.send(dashboardItem.send("updateNode"));
			}
		}
	}
}
