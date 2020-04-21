<template>
  <div class="mr-4">
    <v-container class="ma-2">
      <v-row>
        <v-col lg="4" md="12" sm="12" xs="12">
          <InputForm @update-inputitem="updateFig" />
        </v-col>
        <v-col lg="8" md="12" sm="12" xs="12">
          <div id="chart-canvases">
            <ChartFig
              id="chart-fig0"
              chartid="0"
              :options="charts.options[0]"
              :data="charts.data[0]"
            />
          </div>
          <div>
            <ChartFig
              id="chart-fig1"
              chartid="1"
              :options="charts.options[1]"
              :data="charts.data[1]"
            />
            <MseTable :msetable="msetab[0]"></MseTable>
          </div>
        </v-col> </v-row
    ></v-container>

    <v-overlay :value="loadingObject">
      <v-progress-circular
        indeterminate
        color="green darken-3"
        :size="50"
        :width="5"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ChartFig from "./components/ChartFig.vue";
import SocketTalker from "./components/WebSocketTalker.js";
import {
  cmdInput,
  figopt,
  msetab,
  figsdata,
  dsetopt,
  COLORS
} from "./static/InitialData.json";
import MseTable from "./components/MseTable.vue";
import InputForm from "./components/InputForm.vue";

export default {
  name: "display-kalman",
  components: {
    ChartFig,
    MseTable,
    InputForm
  },
  data() {
    return {
      cmdInput,
      msetab,
      socket: "",
      charts: {
        data: [
          { labels: [], datasets: {} },
          { labels: [], datasets: {} }
        ],
        options: [{ title: {} }, { title: {} }]
      },
      sstate: "",
      resOutput: "",
      figopt: "",
      COLORS: "",
      loadingObject: false
    };
  },
  created() {
    // NOTE Reactivity: this.$set method must be used or
    //   getter/setters not converted properly
    this.figopt = figopt;
    this.dsetopt = dsetopt;
    this.COLORS = COLORS;
    this.charts.options = figsdata.map(fig => {
      return {
        title: {
          text: fig.title,
          display: true
        },
        ...JSON.parse(JSON.stringify(figopt))
      };
    });

    this.charts.data = figsdata.map(fig => {
      return {
        labels: fig.chartdata.labels,
        datasets: fig.chartdata.datasets.map((dataset, index) => {
          return {
            borderColor: this.getLineColor(index),
            ...dsetopt
          };
        })
      };
    });
    // NOTE Reactivity in Depth: to compute or watch properly,
    //  all properties of objects was in need before pass them
    //  to data. Thus, Vue will convert the properties to getter/
    //  setters for later watch.
    this.socket = new SocketTalker.WebSocket(SocketTalker.wspath);
    this.socket.init(SocketTalker.onMethods);
    this.sstate = SocketTalker.wsstate;
  },
  methods: {
    updateFig: function(formInput) {
      this.cmdInput.paras = formInput.paras;
      this.socket.sendCommand(this.cmdInput);
      this.loadingObject = true; // 开始更新，watch维护loadingObject.close()
    },
    getLineColor: function(index) {
      return this.COLORS[index % this.COLORS.length];
    }
  },
  watch: {
    // NOTE watch socket directly cannot work
    "sstate.response": function(newval) {
      console.log(this.sstate.rescnt);
      if (newval.length !== 0) {
        /** NOTE data structure
         * sstate.response: [
         *    (fig0){
         *      title: "...",
         *      chartdata: {
         *        labels: [...],
         *        datasets: [
         *          (dataset0){
         *            label: "...".
         *            lineTension: 0, // no sense here
         *            data: [...]
         *          }, // dataset0
         *          (dataset1){...},
         *          ...
         *        ] // datasets
         *      }, // chartdata
         *      msetab: {...} // optional attribute
         *    }, // fig0
         *    (fig1){...}
         * ] // sstate.response
         * NOTE fig0 and fig1 usually has distinct chartdata.labels
         *
         * charts in ChartFig
         * charts: [
         *    options: [
         *      (chart0.options){
         *        title: {
         *          text: "...", // !IMPORTANT FOR UPDATE
         *          display: Boolean
         *        } // title
         *        ...
         *      }, // chart0.options
         *      (chart1.options){...},
         *    ], // options
         *    data: [
         *      (chart0.data){
         *        lebels: [...], // !IMPORTANT FOR UPDATE
         *        datasets: [
         *          (dataset0){
         *            label: "...",
         *            lineTension: 0, // !IMPORTANT BUT FIXED
         *            ... // ! OTHER IMPORTANT BUT FIXED OPTS
         *            data: [...] // !IMPORTANT FOR UPDATE
         *          }, // dataset0
         *          (dataset1){...},
         *          (dataset...)...
         *        ] // datasets
         *      }, // chart0.data
         *      (chart1.data){...}
         *    ] // data
         * ] // charts
         * NOTE chart is corresponding to fig in sstate.response
         */
        let dsetopt = this.dsetopt;
        this.charts.data = newval.map(fig => {
          return {
            labels: fig.chartdata.labels,
            datasets: fig.chartdata.datasets.map((dataset, index) => {
              return {
                data: dataset.data,
                label: dataset.label,
                borderColor: this.getLineColor(index),
                ...dsetopt
              };
            })
          };
        });
        this.msetab = newval
          .filter(fig => fig.msetab != undefined)
          .map(fig => fig.msetab);
        this.loadingObject = false; // 更新完成
      }
    }
  },
  beforeDestroy() {
    // TODO move chartdata when route to another page
    console.log("beforeDestroy: route from display-kalman");
    this.socket.destroy();
  }
};
</script>
