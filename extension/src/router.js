import { createMemoryHistory, createRouter } from "vue-router";

import SearchView from "./views/SearchView.vue";
import FavoriteView from "./views/FavoritesView.vue";

const routes = [
  { path: "/", component: SearchView, name: "search" },
  { path: "/favorites", component: FavoriteView, name: "favorites" },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
