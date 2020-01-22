<template lang="pug">
.heartbeat.container 
    canvas(ref="heartbeatCanvas")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Provide, Ref } from 'vue-property-decorator'

type Stuff = {
    data: number[]
};

@Component
export default class Heartbeat extends Vue {
    @Prop() readonly data: Stuff;
    @Provide() context: CanvasRenderingContext2D;
    @Provide() width: number;
    @Provide() height: number;
    @Provide() parentElement;
    @Ref() readonly heartbeatCanvas: HTMLCanvasElement;
    mounted() {
        this.context = this.heartbeatCanvas.getContext('2d');
        this.width = this.heartbeatCanvas.width = this.heartbeatCanvas.parentElement.clientWidth;
        this.height = this.heartbeatCanvas.height = this.heartbeatCanvas.parentElement.clientHeight;
        this.updateCanvas();
    }
    @Watch('data')
    onElemChanged(val: Stuff, oldVal: Stuff) {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.context;
        const min = Math.min(...this.data.data);
        const max = Math.max(...this.data.data);
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        function linearInterpolate(a, min, max, index) {
            return ((index - min) / (max - min)) * a;
        }
        ctx.moveTo(0, this.height - linearInterpolate(this.height, min, max, this.data.data[0]));
        for(let i = 1; i < this.data.data.length; i++) {
            ctx.lineTo(linearInterpolate(this.width, 0, 1, i / (this.data.data.length - 1)), this.height - linearInterpolate(this.height, min, max, this.data.data[i]));
        }
        ctx.stroke();
    }
}
</script>

<style lang="sass">
.heartbeat
    width: 100%
    height: 100%
    grid-row: span 1
    grid-column: span 8
</style>
