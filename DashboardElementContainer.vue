<template lang="pug">
    #dashboard-container
        StatusList(v-for="elem in $store.state.nodes" v-if="elem.dashboardType === 'DashboardPriorityList'" v-bind:elem="elem")
        Heartbeat(v-for="elem in $store.state.nodes" v-if="elem.dashboardType === 'DashboardHeartBeat'" v-bind:elem="elem")
</template>

<script>
    import Heartbeat from "./Heartbeat.vue";
    import StatusList from "./StatusList.vue";
    export default {
        components: {
            Heartbeat,
            StatusList,
        },
    };
</script>

<style lang="sass">
    #dashboard-container
        width: 100%
        height: 100%
        display: grid
        grid-template-columns: repeat(8, 1fr)
        grid-template-rows: repeat(8, 1fr)
        grid-gap: 20px
        grid-auto-flow: dense
</style>
