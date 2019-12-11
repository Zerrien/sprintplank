const DashboardItem = require("./DashboardItem.js");
const { fetchJSON } = require("./utils.js");

const REFRESH_TIME = 30 * 1000;

module.exports = class DashboardList extends DashboardItem {
	constructor(id, statArray, processFunc) {
        super(id, "DashboardList");
        this.lastCalled = Date.now() - REFRESH_TIME;
        this.statArray = statArray || [];
        this.func = processFunc;
	}
	async gatherData() {
        if(this.lastCalled + REFRESH_TIME > Date.now()) return Promise.resolve();
        this.lastCalled = Date.now();
        const result = await fetchJSON('http://api.open-notify.org/astros.json');
        this.statArray = await this.func(result);
	}
}
