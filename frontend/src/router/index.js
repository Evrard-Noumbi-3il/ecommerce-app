import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import SearchPage from "../views/SearchPage.vue";
import ProfilUser from "../views/ProfilUser.vue";
import PostAndAdd from "../views/PostAndAdd.vue";
import AdminLayout from '../components/AdminLayout.vue';
import UserManagement from '../views/UserManagement.vue';
import CategoryManagement from '../views/CategoryManagement.vue';
import Dashboard from '../views/DashboardManagement.vue';
import ReportedProducts from '../views/ReportedProducts.vue';
import ProductView from "@/views/ProductView.vue"; 
import Products from '../views/ProductManagement.vue';
import Orders from '@/views/OrderManagement.vue';
import Ads from '@/views/AdManagement.vue';
import Notifications from '@/views/NotificationManagement.vue';
import Themes from '@/views/ThemeManagement.vue';

const routes = [
  { path: "/", name: "HomePage", component: Home },
  { path: "/search", name: "search", component: SearchPage },
  { path: "/profile", name: "ProfilUser", component: ProfilUser },
  { path: "/post-ad", name: "PostAndAdd", component: PostAndAdd },

  // ✅ Chaque page admin utilise AdminLayout comme wrapper
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin", "moderator"] },
  },
  {
    path: "/admin/users",
    name: "UserManagement",
    component: UserManagement,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin"] },
  },
  {
    path: "/admin/categories",
    name: "CategoryManagement",
    component: CategoryManagement,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin", "moderator"] },
  },
  {
    path: "/admin/reported-products",
    name: "ReportedProducts",
    component: ReportedProducts,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin", "moderator"] },
  },
  {
    path: "/admin/products",
    name: "Products",
    component: Products,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin", "moderator"] },
  },
  {
    path: "/admin/orders",
    name: "Orders",
    component: Orders,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin"] },
  },
  {
    path: "/admin/ads",
    name: "Ads",
    component: Ads,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin"] },
  },
  {
    path: "/admin/notifications",
    name: "Notifications",
    component: Notifications,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin"] },
  },
  {
    path: "/admin/themes",
    name: "Themes",
    component: Themes,
    meta: { layout: AdminLayout, requiresAuth: true, role: ["admin", "moderator"] },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); 
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  if (to.meta.requiresAuth) {
    if (!token) return next("/"); 
    if (to.meta.role && !to.meta.role.includes(userRole)) return next("/"); }
  next();
});

export default router;
