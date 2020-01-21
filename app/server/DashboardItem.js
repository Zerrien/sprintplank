module.exports.DashboardItem = class DashboardItem {
	constructor(id, statArray, type, processFunc) {
		this.id = id ? id : "id_" + Math.floor(Math.random() * 1000000) + "_" + Date.now();
		this.type = type || "DashboardHeartBeat";
        this.statArray = statArray || [];
        this.func = processFunc;
	}
	send(messageType) {
		return JSON.stringify({
			messageType: messageType,
			dashboardType: this.type,
			id: this.id,
			data: this.statArray,
		});
	}
	async gatherData(things) {
		if(!this.func) return Promise.resolve();
		this.statArray = await this.func.bind(this)(things);
	}
}
