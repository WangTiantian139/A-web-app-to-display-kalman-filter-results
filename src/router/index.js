import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const routeOptions = [
  { path: "/", component: "HomePage" },
  { path: "/about-me", component: "AboutMe" },
  { path: "/display-kalman", component: "DisplayKalman" }
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () =>
      import(`../pages/${route.component}/${route.component}.vue`)
  }
})

export default new Router({
  routes: routes,
  mode: "hash"
})
