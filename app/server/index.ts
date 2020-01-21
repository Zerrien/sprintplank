import * as WebSocket from 'ws'

const wss = new WebSocket.Server({port: 8081});

import { fetchJSON, fetchText } from "../utils.js"
import { launchHTTPServer } from './HTTPServer'
import { DashboardItem } from './DashboardItem'

(async function() {
	await launchHTTPServer();
	main();
})();

// const arr2 = ["Disabled", "Aborted", "Failed", "Unstable", "In progress", "Success"];
// TODO: Fill this in with URLs
const arr = [
	{
		url: "http://api.open-notify.org/astros.json",
		jobName: "astronauts",
	}
];

const dashboardItems = [];

import { Status, ActualStatus } from '../types';

dashboardItems.push(new DashboardItem(null, null, "DashboardHeartBeat", async function() {
	if(this.statArray.length > 50) this.statArray.shift();
	return this.statArray.concat(Math.sin(Math.random()));
}));

async function fetchAllURLs(arrayOfURLObjects:Status[]) {
	return Promise.all(arrayOfURLObjects.map(async function(elem) {
		return Object.assign({}, elem, {
			json: await fetchJSON(elem.url)
		});
	}));
}

dashboardItems.push(new DashboardItem(null, null, "DashboardPriorityList", async function():Promise<ActualStatus[]> {
	const results = await (await fetchAllURLs(arr)).map(elem => {
		return {
			name: elem.jobName,
			status: elem.json.people[0].name,
		}
	})
	return results
}));

function main() {
	const outstandingConnections = [];
	const a = doThingMain(dashboardItems, outstandingConnections);

	a();
	setInterval(a, 30000);

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
