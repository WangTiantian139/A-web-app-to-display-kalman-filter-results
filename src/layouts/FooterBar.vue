<template>
  <v-card flat tile class="grey lighten-5 text-center" width="100%">
    <v-card-text>
      <v-btn v-for="(icon,i) in icons" :key="i" class="mx-4" icon :href="icon.herf">
        <v-icon size="24px">{{ icon.name }}</v-icon>
      </v-btn>
    </v-card-text>

    <v-divider> </v-divider>

    <v-card-text>
      <p>
        <a class="footer-link" href="http://www.beian.miit.gov.cn/"
          >冀ICP备20007324号-1</a
        >
      </p>
      <p>
        <a class="footer-link" href="http://www.beian.gov.cn/">
          公网安备
        </a>
      </p>
      <p>
        2020 - {{ new Date().getFullYear() }} | &copy;
        <strong>Tiantian.W</strong>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {name: "mdi-github", herf: "https://wangtiantian139.github.io"},
      {name: "mdi-sina-weibo", herf: "https://weibo.com/u/5867649336?is_all=1"},
      {name: "mdi-alpha-c-box", herf: "https://blog.csdn.net/weixin_41231535"},
      // {name: "mdi-linkedin", herf: ""},
      // {name: "mdi-instagram", herf: ""},
    ]
  })
};
</script>

<style>
.footer-link:hover {
  color: #1976d2; /* primary */
}
.footer-link {
  translate: 0.2s;
}
.v-application a {
  color: inherit;
  text-decoration: none;
}
.v-application p {
  margin-bottom: 0;
}
</style>
