const socket = new WebSocket('ws://localhost:8081');

const DashboardItems = require('./DashboardItems.js');

socket.addEventListener('open', function(event) {
	console.log(event);
	socket.send('Do this!');
});

const nodes = {};
socket.addEventListener('message', function(event) {
	let result;
	try {
		result = JSON.parse(event.data);
	} catch (e) {
		console.log("Received a bad event message: ", event);
		return;
	}
	if(result.messageType === "createNode") {
		const node = nodes[result.id] = new (DashboardItems[result.dashboardType])(result.id, result.data);
		node.createNode();
		node.draw();
	} else if (result.messageType === "updateNode") {
		const node = nodes[result.id];
		node.setData(result.data);
		node.draw();
	}
});
