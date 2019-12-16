const DashboardItem = require("./DashboardItem.js");

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
		if(this.statArray.length > 50) {
			this.statArray.shift();
		}
	}
}
