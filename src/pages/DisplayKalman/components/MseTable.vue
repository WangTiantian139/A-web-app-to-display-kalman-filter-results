<template>
  <v-card v-if="msetable">
    <v-data-table
      :headers="headers"
      :items="tabItems"
      disable-filtering
      disable-pagination
      hide-default-footer
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    msetable: Object
  },
  data() {
    return {
      headers: [
        { text: "算法", value: "label", align: "start" },
        { text: "均方误差", value: "val" }
      ]
    };
  },
  computed: {
    tabItems: function() {
      return [
        { label: "滑动平均", val: this.msetable["moving mean"] },
        { label: "最小二乘", val: this.msetable["mean square"] },
        { label: "卡尔曼", val: this.msetable["kalman"] }
      ];
    }
  }
};
</script>
