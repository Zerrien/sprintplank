const DashboardItem = require("./DashboardItem.js");
const { fetchJSON } = require("./utils.js");

let FAKE_TASKS = [
    {
        name: "Codebase Audit",
        status: "Success",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "Whizzbangs & Gargamels",
        status: "Failed",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "Maslow's Hierarchy",
        status: "Success",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "CI Build",
        status: "In progress",
        duration: 1000 + Math.random() * 5000,
    },
];
const FAKE_TASK_HIERARCHY = ["Disabled", "Aborted", "Failed", "Unstable", "In progress", "Success"];

/*
Unstable
In progress
Success
Disabled
Aborted
Failed
*/



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
                if(elem.status === "In progress") {
                    if(Math.random() < 0.5) {
                        status = "Success";
                    } else {
                        status = "Failed";
                    }
                } else {
                    if(Math.random() < 0.1) {
                        status = "In progress";
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
}
