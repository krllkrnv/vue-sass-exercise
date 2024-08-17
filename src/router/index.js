import { createRouter, createWebHistory } from "vue-router";
import MoviesPage from "../pages/MoviesPage.vue";
import MoviesItemPage from "../pages/MoviesItemPage.vue";
const routes = [
  {
    path: "/",
    component: MoviesPage,
    name: "home",
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: MoviesItemPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
  routes,
});

export default router;
