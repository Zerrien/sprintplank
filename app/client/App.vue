<template lang="pug">
#app
    DashboardElementContainer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DashboardElementContainer from "./DashboardElementContainer.vue"

@Component({
    components: {
        DashboardElementContainer,
    },
})
export default class App extends Vue {}
</script>

<style lang="sass">
*
    margin: 0
    padding: 0
#app
    background: linear-gradient(to bottom left, gray, black)
    width: 100%
    height: 100%
.container
    filter: drop-shadow(rgba(0, 0, 0, 0.75) 2px 2px 4px)
    background: linear-gradient(to bottom left, gray, darkgray)
    border: 1px solid white
    box-sizing: border-box
    border-radius: 8px
    overflow: hidden
</style>
