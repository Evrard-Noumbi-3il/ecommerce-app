<template>
  <div id="app">
    <NavBar v-if="showNavBar" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { useRoute } from "vue-router";

export default {
  components: { NavBar },
  setup() {
    const route = useRoute();
    const excludedRoutes = ["/login", "/register"];
    const showNavBar = !excludedRoutes.includes(route.path);
    return { showNavBar };
  },
};
</script>