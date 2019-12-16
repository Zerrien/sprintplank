<template lang="pug">
    .heartbeat.container 
        canvas(ref="heartbeat-canvas")
</template>

<script>
    export default {
        data() {
            return {
                provider: {
                    context: null,
                },
            };
        },
        provide () {
            return {
                provider: this.provider
            }
        },
        props: [
            "elem",
        ],
        mounted() {
            this.provider.context = this.$refs['heartbeat-canvas'].getContext('2d');
            this.provider.width = this.$refs['heartbeat-canvas'].width = this.$refs['heartbeat-canvas'].parentElement.clientWidth
            this.provider.height = this.$refs['heartbeat-canvas'].height = this.$refs['heartbeat-canvas'].parentElement.clientHeight
            this.updateCanvas();
        },
        methods: {
            updateCanvas: function () {
                const ctx = this.provider.context;
                const min = Math.min(...this.elem.data);
                const max = Math.max(...this.elem.data);
                ctx.clearRect(0, 0, this.provider.width, this.provider.height);
                ctx.beginPath();
                function linearInterpolate(a, min, max, index) {
                    return ((index - min) / (max - min)) * a;
                }
                ctx.moveTo(0, this.provider.height - linearInterpolate(this.provider.height, min, max, this.elem.data[0]));
                for(let i = 1; i < this.elem.data.length; i++) {
                    ctx.lineTo(linearInterpolate(this.provider.width, 0, 1, i / (this.elem.data.length - 1)), this.provider.height - linearInterpolate(this.provider.height, min, max, this.elem.data[i]));
                }
                ctx.stroke();
            },
        },
        watch: {
            elem: function(val, oldVal) {
                this.updateCanvas();
            },
        },
        render() {
            console.log("???");
        },
    };
</script>

<style lang="sass">
    .heartbeat
        width: 100%
        height: 100%
        grid-row: span 1
        grid-column: span 8
</style>
