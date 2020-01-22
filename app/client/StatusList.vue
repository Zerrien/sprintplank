<template lang="pug">
.status-list.container
    .list-item(v-for="item in sortedItems" v-bind:class="toClassName(item.status)")
        .list-text {{ item.name }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Provide, Ref } from 'vue-property-decorator'
import { ActualStatus } from '../types';

const FAKE_TASK_HIERARCHY = ["Disabled", "Aborted", "Failed", "Unstable", "In progress", "Success"];

type ActualStatusData = {
    data: ActualStatus[]
};

@Component
export default class StatusList extends Vue {
    @Prop() data: ActualStatusData;
    get sortedItems():ActualStatus[] {
        return [...this.data.data].sort(function(a,b) {
            return FAKE_TASK_HIERARCHY.indexOf(b.status) - FAKE_TASK_HIERARCHY.indexOf(a.status);
        }).reverse();
    }
    toClassName(name:string):string {
        return `status-${name.replace(" ", "-").toLowerCase()}`;
    }
}
</script>

<style lang="sass">
@keyframes barberpole
    0%
        background-position: 0 0
    100%
        background-position: 100px 100px
.status-list
    grid-row: span 7
    grid-column: span 8
    display: flex
    flex-direction: column
    .list-item
        flex-grow: 1
        background-color: blue
        display: flex
        justify-content: center
        align-items: center
        font-size: 72px
        .list-text
            color: white
            filter: drop-shadow(2px 2px 2px black)
    .status-disabled
        background-color: black
    .status-unstable
        background-color: yellow
    .status-aborted
        background-color: gray
    .status-success
        background-color: green
    .status-in-progress
        $base-color: #eddb37
        $secondary-color: #cfa21d
        background: repeating-linear-gradient(-45deg, $base-color 0%, $secondary-color 0%, $secondary-color 25%, $base-color 25%, $base-color 50%, $secondary-color 50%, $secondary-color 75%, $base-color 75%, $base-color 100%, $secondary-color 100%)
        background-size: 50px 50px
        animation: barberpole 2s ease-in-out infinite
    .status-failed
        background-color: red
</style>
