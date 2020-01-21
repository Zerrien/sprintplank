import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import store from "./store.js"

new Vue({
	el: '#app',
	store,
	render: h => h(App),
});

const socket = new WebSocket('ws://localhost:8081');

socket.addEventListener('message', function(event) {
	let result;
	try {
		result = JSON.parse(event.data);
	} catch (e) {
		console.log("Received a bad event message: ", event);
		return;
	}
	if(result.messageType === "createNode") {
		store.dispatch("addNode", {
			dashboardType: result.dashboardType,
			id: result.id,
			data: result.data,
		});
	} else if (result.messageType === "updateNode") {
		store.dispatch("updateNode", {
			dashboardType: result.dashboardType,
			id: result.id,
			data: result.data,
		});
	}
});
