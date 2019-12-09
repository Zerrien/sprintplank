const DashboardItem = require("./DashboardItem.js");
const { createElement } = require('./utils.js');

module.exports = class DashboardHeartBeat extends DashboardItem {
	constructor(id, statArray) {
		super(id, "DashboardHeartBeat");
		if(statArray) {
			this.statArray = statArray;
		} else {
			this.statArray = [];
		}
	}
	async gatherData() {
		this.statArray.push(Math.sin(Math.random()));
		if(this.statArray.length > 10) {
			this.statArray.shift();
		}
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
		this.div = createElement('div', document.getElementById('main-container'), null, "dashboard-item two-by-two");
		this.div.canvas = createElement('canvas', this.div, null, 'dashboard-item-canvas');
		this.div.canvas.width = this.div.offsetWidth;
		this.div.canvas.height = this.div.offsetHeight;
		this.div.ctx = this.div.canvas.getContext("2d");
		this.div.ctx.strokeStyle = "white";
	}
}
