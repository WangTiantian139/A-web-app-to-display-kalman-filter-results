<template>
  <div id="router-bar">
    <v-navigation-drawer app v-model="drawer">
      <!-- Header content -->
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="../../static/avatar.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            Tiantian.W
          </v-list-item-title>
          <v-list-item-subtitle>
            一些小玩意
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group v-model="item" mandatory color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" exact>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <!-- -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ curPage }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<style></style>

<script>
export default {
  data: () => ({
    drawer: false,
    item: 0,
    items: [
      { text: "主页", icon: "mdi-home", to: "/" },
      {
        text: "演示卡尔曼滤波",
        icon: "mdi-chart-areaspline",
        to: "/display-kalman"
      },
      { text: "关于我", icon: "mdi-account", to: "/about" }
    ]
  }),
  computed: {
    curPage: function() {
      return this.items
        .filter(item => item.to === this.$route.path)
        .map(item => item.text)[0];
    }
  }
};
</script>
