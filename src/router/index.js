import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TrendingView from "@/views/TrendingViews.vue";
import ChartView from "@/views/ChartView.vue";
import LatestView from "@/views/LatestView.vue";
import ManageView from "@/views/ManageView.vue";
import ArtistsView from "@/views/ArtistView.vue";
import SongView from "@/views/Song.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "text-color-black",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/trending",
      name: "trending",
      component: TrendingView,
    },
    {
      path: "/latest",
      name: "latest",
      component: LatestView,
    },
    {
      path: "/artists",
      name: "artists",
      component: ArtistsView,
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/chart",
      name: "chart",
      component: ChartView,
    },
    {
      path: "/song/:id",
      name: "song",
      component: SongView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((recored) => recored.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});
export default router;
