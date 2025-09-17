import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
// import Login from "../views/Login.vue";
// import Register from "../views/Register.vue";


const routes = [
  { path: "/", name: "HomePage", component: Home },
  // { path: "/login", name: "LoginPage", component: Login },
  // { path: "/register", name: "RegisterPage", component: Register },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
