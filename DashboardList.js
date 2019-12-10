const DashboardItem = require("./DashboardItem.js");
const { fetchJSON, createElement } = require("./utils.js");

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
	setData(data) {
		this.statArray = data;
	}
	draw() {
        this.div.listDiv.innerHTML = '';
        this.statArray.forEach(elem => {
            createElement('div', this.div.listDiv, null, null, elem.name);
        });
	}
	createNode() {
        this.div = createElement('div', document.getElementById('main-container'), null, "dashboard-item two-by-two");
        createElement('div', this.div, null, "dashboard-list-title", "Astronauts in Space Right Now");
        this.div.listDiv = createElement('div', this.div);
	}
}
