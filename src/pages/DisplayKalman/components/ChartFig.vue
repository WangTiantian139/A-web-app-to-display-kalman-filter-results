<template>
  <div id="chart-fig">
    <v-card height="300px" class="mb-8"><canvas :id="canvasid"></canvas></v-card>
  </div>
</template>

<script>
import Chart from "chart.js"
export default {
  name: "chart-fig",
  props: {
    data: Object,
    options: Object,
    chartid: String
  },
  data() {
    return {
      ctx: "",
      ChartCanvas: "",
      canvasid: "chart" + this.chartid
    }
  },
  mounted() {
    this.ctx = document.getElementById(this.canvasid)
    this.ChartCanvas = new Chart(this.ctx, {
      type: "line",
      data: this.data,
      options: this.options
    })
  },
  watch: {
    "options.title": function(newval) {
      if (newval !== undefined) {
        // NOTE ctx donot have map method
        this.ChartCanvas.options.title = newval
        this.ChartCanvas.update()
        console.log(`${this.canvasid}: updated options.title`)
      }
    },
    // TODO how to fit datasets constructures
    "data.labels": function(newval) {
      if (newval !== undefined) {
        this.ChartCanvas.data.labels = newval
        this.ChartCanvas.update()
        console.log(`${this.canvasid}: updated data.labels`)
      }
    },
    "data.datasets": function(newval) {
      this.ChartCanvas.data.datasets = newval
      this.ChartCanvas.update()
      console.log(`${this.canvasid}: updated data.datasets`)
    }
  },
  beforeDestroy() {
    console.log("chart-fig: beforeDestroy")
    this.ChartCanvas.destroy()
  }
}
</script>

<style>
</style>
