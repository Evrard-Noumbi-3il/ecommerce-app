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
import Products from '../views/ProductManagement.vue';
import Orders from '@/views/OrderManagement.vue';
import Ads from '@/views/AdManagement.vue';
import Notifications from '@/views/NotificationManagement.vue';
import Themes from '@/views/ThemeManagement.vue';
import FavorisView from '@/views/FavorisView.vue'

const routes = [
  { path: "/", name: "HomePage", component: Home },
  { path: "/search", name: "search", component: SearchPage },
  { path: "/profile", name: "ProfilUser", component: ProfilUser },
  { path: "/post-ad", name: "PostAndAdd", component: PostAndAdd },
  { path: "/profile", name: "ProfilUser", component:ProfilUser },
  { path: "/admin", component: AdminLayout, children: [
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/users", name: "UserManagement", component: UserManagement },
    { path: "/categories", name: "CategoryManagement", component: CategoryManagement },
    { path: "/reported-products", name: "ReportedProducts", component: ReportedProducts },
    { path: "/products", name: "Products", component: Products },
    { path: "/orders", name: "Orders", component: Orders },
    { path: "/ads", name: "Ads", component: Ads },
    { path: "/notifications", name: "Notifications", component: Notifications },
    { path: "/themes", name: "Themes", component: Themes },
  ], meta: { requiresAuth: true, role: ["admin", "moderator"] } },


  { 
    path: "/admin", 
    component: AdminLayout, 
    meta: { requiresAuth: true, role: ["admin", "moderator"] },
    children: [
      { path: "dashboard", name: "Dashboard", component: Dashboard },
      { path: "users", name: "UserManagement", component: UserManagement },
      { path: "categories", name: "CategoryManagement", component: CategoryManagement },
      { path: "reported-products", name: "ReportedProducts", component: ReportedProducts },
    ]
  },
  {
    path: "/Favoris",
    component: FavorisView,
    name: "Favoris"
  }
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
