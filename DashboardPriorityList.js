const DashboardItem = require("./DashboardItem.js");
const { fetchJSON, createElement } = require("./utils.js");

let FAKE_TASKS = [
    {
        name: "Codebase Audit",
        status: "Passing",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "Whizzbangs & Gargamels",
        status: "Failing",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "Maslow's Hierarchy",
        status: "Passing",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "CI Build",
        status: "In Progress",
        duration: 1000 + Math.random() * 5000,
    },
];
const FAKE_TASK_HIERARCHY = ["Failing", "In Progress", "Passing"];

module.exports = class DashboardPriorityList extends DashboardItem {
	constructor(id, statArray, processFunc) {
        super(id, "DashboardPriorityList");
        this.statArray = statArray || [];
        this.func = processFunc;
	}
	async gatherData() {
        //const result = await fetchJSON('http://api.open-notify.org/astros.json');
        //this.statArray = await this.func(result);
        FAKE_TASKS = FAKE_TASKS.map((elem) => {
            const duration = elem.duration - 1000;
            if(duration < 0) {
                let status;
                if(elem.status === "In Progress") {
                    if(Math.random() < 0.5) {
                        status = "Passing";
                    } else {
                        status = "Failing";
                    }
                } else {
                    if(Math.random() < 0.1) {
                        status = "In Progress";
                    } else {
                        status = elem.status;
                    }
                }
                return {...elem, status, duration: 1000 + Math.random() * 5000};
            } else {
                return {...elem, duration};
            }
        });
        this.statArray = FAKE_TASKS;
	}
	setData(data) {
		this.statArray = data;
	}
	draw() {
        this.div.listDiv.innerHTML = '';
        this.statArray.concat().sort(function(a, b) {
            return FAKE_TASK_HIERARCHY.indexOf(b.status) - FAKE_TASK_HIERARCHY.indexOf(a.status);
        }).reverse().forEach(elem => {
            createElement('div', this.div.listDiv, null, `job-status-${elem.status.replace(' ', '-').toLowerCase()}`, elem.name);
        });
	}
	createNode() {
        this.div = createElement('div', document.getElementById('main-container'), null, "dashboard-item two-by-two");
        this.div.listDiv = createElement('div', this.div);
	}
}
