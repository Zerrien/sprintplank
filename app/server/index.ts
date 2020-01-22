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
	},
];

const dashboardItems = [];

import { Status, ActualStatus } from '../types';

async function fetchAllURLs(arrayOfURLObjects:Status[]):Promise<(Status & {json:any})[]> {
	return Promise.all(arrayOfURLObjects.map(async function(elem) {
		const k = Object.assign({}, elem, {
			json: await fetchJSON(elem.url)
		});
		return k;
	}));
}

dashboardItems.push(new DashboardItem("Heartbeat", async function() {
	if(this.statArray.length > 50) this.statArray.shift();
	return this.statArray.concat(Math.sin(Math.random()));
}));

dashboardItems.push(new DashboardItem("StatusList", async function():Promise<ActualStatus[]> {
	const results = await fetchAllURLs(arr);
	const outputs:ActualStatus[] = results.map(elem => {
		let k:string = "null";
		if(elem.json?.people[0]?.name) {
			k = elem.json.people[0].name;
		}
		let m:ActualStatus = {
			name: elem.jobName,
			status: k,
		};
		return m;
	});
	return outputs;
}));

function main():void {
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

function doThingMain(dashboardItems:DashboardItem[], outstandingConnections:any[]):() => Promise<void> {
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
