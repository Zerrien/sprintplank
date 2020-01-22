export class DashboardItem {
	id: string = "id_" + Math.floor(Math.random() * 1000000) + "_" + Date.now();
	type: string
	statArray: number[];
	func?: Function;
	constructor(type = "DashboardHeartBeat", processFunc: Function | null) {
		this.type = type;
        this.statArray = [];
        this.func = processFunc;
	}
	send(messageType:string):string {
		return JSON.stringify({
			messageType: messageType,
			dashboardType: this.type,
			id: this.id,
			data: this.statArray,
		});
	}
	async gatherData():Promise<void> {
		if(!this.func) return Promise.resolve();
		this.statArray = await this.func.bind(this)();
	}
}
