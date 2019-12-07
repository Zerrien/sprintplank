module.exports = class DashboardItem {
	constructor() {
		this.id = "id_" + Math.floor(Math.random() * 1000000) + "_" + Date.now();
	}
	gatherData() {
	}
}
