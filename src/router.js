import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/search",
      name: "Search",
      component: () => import("./components/Search.vue"),
    },
    {
      path: "/movie/:movieId",
      name: "Movie",
      component: () => import("./components/Movie.vue"),
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
})

export default router
