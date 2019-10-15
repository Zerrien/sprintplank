const socket = new WebSocket('ws://localhost:8081');

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
		const div = document.createElement('div');
		div.className = "dashboard-item";
		document.getElementById('main-container').appendChild(div);
		const canvas = document.createElement('canvas');
		canvas.className = "dashboard-item-canvas";
		canvas.width = div.offsetWidth;
		canvas.height = div.offsetHeight;
		div.appendChild(canvas);
		ctx = canvas.getContext("2d");
		nodes[result['id']] = div;
		div.canvas = canvas;
		div.ctx = ctx;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const min = Math.min(...result['data']);
		const max = Math.max(...result['data']);
		ctx.beginPath();
		ctx.moveTo(0, canvas.height - (result['data'][0] - min) / (max - min) * canvas.height);
		for(let i = 1; i < result['data'].length; i++) {
			ctx.lineTo(canvas.width / (result['data'].length - 1) * i, canvas.height - (result['data'][i] - min) / (max - min) * canvas.height);
		}
		ctx.stroke();
	} else if (result.type === "updateNode") {
		const div = nodes[result['id']];
		div.ctx.clearRect(0, 0, div.canvas.width, div.canvas.height);
		const min = Math.min(...result['data']);
		const max = Math.max(...result['data']);
		div.ctx.beginPath();
		div.ctx.moveTo(0, div.canvas.height - (result['data'][0] - min) / (max - min) * div.canvas.height);
		for(let i = 1; i < result['data'].length; i++) {
			div.ctx.lineTo(div.canvas.width / (result['data'].length - 1) * i, div.canvas.height - (result['data'][i] - min) / (max - min) * div.canvas.height);
		}
		div.ctx.stroke();
	}
});
