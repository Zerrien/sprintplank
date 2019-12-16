const DashboardItem = require("./DashboardItem.js");
const { fetchJSON } = require("./utils.js");
/*
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
    {
        name: "Ole",
        status: "Unstable",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "Second Arrival",
        status: "Disabled",
        duration: 1000 + Math.random() * 5000,
    },
    {
        name: "Hot & Cold",
        status: "Aborted",
        duration: 1000 + Math.random() * 5000,
    },
];
*/
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
	async gatherData(things) {
        this.statArray = await this.func(things);
        /*
        //const result = await fetchJSON('http://api.open-notify.org/astros.json');
        //this.statArray = await this.func(result);
        FAKE_TASKS = FAKE_TASKS.map((elem) => {
            const duration = elem.duration - 1000;
            if(duration < 0) {
                let status;
                if(elem.status === "In progress") {
                    const rn = Math.random();
                    if(rn < (1/5)) {
                        status = "Success";
                    } else if (rn < (1/5) * 2) {
                        status = "Aborted";
                    } else if (rn < (1/5) * 3) {
                        status = "Disabled";
                    } else if (rn < (1/5) * 4) {
                        status = "Unstable";
                    } else {
                        status = "Failed";
                    }
                } else {
                    if(Math.random() < 1) {
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
        */
	}
}
