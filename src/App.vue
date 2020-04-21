<template>
  <v-app>
    <RouterBar />

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app padless absolute>
      <!-- -->
      <FooterBar></FooterBar>
    </v-footer>
  </v-app>
</template>

<script>
import RouterBar from "./layouts/RouterBar.vue";
import FooterBar from "./layouts/FooterBar.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    RouterBar,
    FooterBar
  }
};
</script>

<style>
/* #app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  text-align: center;
}
.el-aside {
  color: #333;
  background-color: #eef1f6;
} */
</style>
