<template lang="pug">
    .status-list.container
        .list-item(v-for="item in sortedItems" v-bind:class="toClassName(item.status)") {{ item.name }}
</template>

<script>
    const FAKE_TASK_HIERARCHY = ["Disabled", "Aborted", "Failed", "Unstable", "In progress", "Success"];
    export default {
        props: [
            "elem",
        ],
        computed: {
            sortedItems() {
                return this.elem.data.sort(function(a, b) {
                    return FAKE_TASK_HIERARCHY.indexOf(b.status) - FAKE_TASK_HIERARCHY.indexOf(a.status);
                }).reverse();
            },
        },
        methods: {
            toClassName(name) {
                return `status-${name.replace(" ", "-").toLowerCase()}`;
            }
        }
    };
</script>

<style lang="sass">
    @keyframes barberpole
        100%
            background-position: 100% 100%
    .status-list
        grid-row: span 2
        grid-column: span 2
        .status-success
            background-color: green
        .status-in-progress
            background: repeating-linear-gradient(45deg, #CCCC55, #CCCC55 10px, #999955 10px, #999955 20px)
            background-size: 200% 200%
            animation: barberpole 10s linear infinite
        .status-failed
            background-color: red
</style>
