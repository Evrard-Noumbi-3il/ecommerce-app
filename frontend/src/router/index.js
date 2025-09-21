import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import SearchPage from "../views/SearchPage.vue";
import ProfilUser from "../views/ProfilUser.vue";
import PostAndAdd from "../views/PostAndAdd.vue";

const routes = [
  { path: "/", name: "HomePage", component: Home },
  { path: "/search", name: "search", component: SearchPage },
  { path: "/profile", name: "ProfilUser", component: ProfilUser },
  { path: "/post-ad", name: "PostAndAdd", component: PostAndAdd },

];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
