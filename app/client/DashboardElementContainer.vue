<template lang="pug">
#dashboard-container
    component(v-for="elem in $store.state.nodes" v-bind:is="elem.dashboardType" v-bind:data="elem")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Heartbeat from "./Heartbeat.vue"
import StatusList from "./StatusList.vue"

@Component({
    components: {
        Heartbeat,
        StatusList,
    },
})
export default class DashboardElementContainer extends Vue {}
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
