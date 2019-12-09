module.exports = class DashboardItem {
	constructor(id, type) {
		this.id = id ? id : "id_" + Math.floor(Math.random() * 1000000) + "_" + Date.now();
		this.type = type;
	}
	send(messageType) {
		return JSON.stringify({
			messageType: messageType,
			dashboardType: this.type,
			id: this.id,
			data: this.statArray,
		});
	}
	async gatherData() {
	}
}
