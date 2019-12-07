const socket = new WebSocket('ws://localhost:8081');
const DashboardHeartBeat = require('./DashboardHeartBeat.js');

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
		console.log("Recieved a bad event message: ", event);
		return;
	}
	if(result.type === "createNode") {
		const node = nodes[result.id] = DashboardHeartBeat.ClientCreated(result);
		node.createNode();
		node.draw();
	} else if (result.type === "updateNode") {
		const node = nodes[result.id];
		node.setData(result.data);
		node.draw();
	}
});
