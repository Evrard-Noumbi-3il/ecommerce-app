import { createRouter, createWebHistory } from "vue-router";
import { getUserFromToken, isAuthenticated, isAdmin } from "../auth/auth.js";
import Home from "../views/HomePage.vue";
import SearchPage from "../views/SearchPage.vue";
import ProfilUser from "../views/ProfilUser.vue";
import PostAndAdd from "../views/PostAndAdd.vue";
import AdminLayout from "../components/AdminLayout.vue";
import UserManagement from "../views/UserManagement.vue";
import CategoryManagement from "../views/CategoryManagement.vue";
import Dashboard from "../views/DashboardManagement.vue";
import ReportedProducts from "../views/ReportedProducts.vue";
import ProductView from "@/views/ProductView.vue";
import Products from "../views/ProductManagement.vue";
import Orders from "@/views/OrderManagement.vue";
import Ads from "@/views/AdManagement.vue";
import Notifications from "@/views/NotificationManagement.vue";
import Themes from "@/views/ThemeManagement.vue";
import FavorisView from "@/views/FavorisView.vue";
import ChatView from "@/views/ChatView.vue";

const routes = [
  { path: "/", name: "HomePage", component: Home },
  { path: "/search", name: "search", component: SearchPage },
  {
    path: "/profile",
    name: "ProfilUser",
    component: ProfilUser,
    meta: { requiresAuth: true },
  },
  {
    path: "/post-ad",
    name: "PostAndAdd",
    component: PostAndAdd,
    meta: { requiresAuth: true },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: ProductView,
    props: true,
  },
  { path: "/chat", name: "ChatView", component: ChatView },

  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/admin/users",
    name: "UserManagement",
    component: UserManagement,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/admin/categories",
    name: "CategoryManagement",
    component: CategoryManagement,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/admin/products",
    name: "Products",
    component: Products,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/admin/ads",
    name: "Ads",
    component: Ads,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/admin/notifications",
    name: "Notifications",
    component: Notifications,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/admin/themes",
    name: "Themes",
    component: Themes,
    meta: { layout: AdminLayout, requiresAdmin: true },
  },
  {
    path: "/favoris",
    component: FavorisView,
    name: "favoris",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert("vous devez être connecté pour accéder à cette page.");
    next({ name: "HomePage" });
  } else if (to.meta.requiresAdmin && !isAdmin()) {
    alert("Accès refusé. Vous n'avez pas les droits administrateur.");
    next({ name: "HomePage" });
  } else {
    next();
  }
});

export default router;
