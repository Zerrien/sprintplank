const DashboardItem = require("./DashboardItem.js");

module.exports = class DashboardHeartBeat extends DashboardItem {
	constructor(statArray) {
		super();
		if(statArray) {
			this.statArray = statArray;
		} else {
			this.statArray = [];
			for(let i = 0; i < 10; i++) {
				this.statArray.push(Math.sin(Math.random()));
			}
		}
	}
	gatherData() {
		this.statArray.push(Math.sin(Math.random()));
		this.statArray.shift();
	}
	sendData() {
		return JSON.stringify({
			type: "updateNode",
			id: this.id,
			data: this.statArray,
		})
	}
	createData() {
		return JSON.stringify({
			type: "createNode",
			dashboardType: "DashboardHeartBeat",
			id: this.id,
			data: this.statArray,
		});
	}
	setData(data) {
		this.statArray = data;
	}
	draw() {
		this.div.ctx.clearRect(0, 0, this.div.canvas.width, this.div.canvas.height);
		const min = Math.min(...this.statArray);
		const max = Math.max(...this.statArray);
		this.div.ctx.beginPath();
		this.div.ctx.moveTo(0, this.div.canvas.height - (this.statArray[0] - min) / (max - min) * this.div.canvas.height);
		for(let i = 1; i < this.statArray.length; i++) {
			this.div.ctx.lineTo(this.div.canvas.width / (this.statArray.length - 1) * i, this.div.canvas.height - (this.statArray[i] - min) / (max - min) * this.div.canvas.height);
		}
		this.div.ctx.stroke();
	}
	createNode() {
		const div = document.createElement('div');
		div.className = "dashboard-item";
		document.getElementById('main-container').appendChild(div);
		const canvas = document.createElement('canvas');
		canvas.className = "dashboard-item-canvas";
		canvas.width = div.offsetWidth;
		canvas.height = div.offsetHeight;
		div.appendChild(canvas);
		let ctx = canvas.getContext("2d");
		div.canvas = canvas;
		div.ctx = ctx;
		this.div = div;
	}
	static ClientCreated(values) {
		return new DashboardHeartBeat(values.data);
	}
}
