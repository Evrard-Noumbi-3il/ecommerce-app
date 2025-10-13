<template>

  <div id="app">
    <NavBar v-if="showNavBar" @open-Register="showRegister = true"/>
    <component :is="layout">
      <router-view
    />
    </component>


    <RegisterModal v-if="showRegister" @close-Register="showRegister = false" @open-login="showlogin = true"/>
    <LoginModal v-if="showlogin" @close-Login="showlogin = false" @open-Register="showRegister = true" @close-Register="showRegister = false"/>
  </div>

  <footer style="padding: 100px; background-color: black; position: sticky;bottom: auto; ">
    <p style="text-align: center; font-size: 12px; color: gray; padding: 20px 0 0 0;">&copy; 2024 MonSite. Tous droits réservés.</p>
  </footer>
</template>


<script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";

  import NavBar from "./components/NavBar.vue";
  import RegisterModal from "./components/RegisterModal.vue";
  import LoginModal from "./components/LoginModal.vue";


  // Etat réactif pour la modale
  const showRegister = ref(false);
  const showlogin = ref(false);

  // Gestion de l'affichage du NavBar selon la route
  const route = useRoute();
  const excludedRoutes = ["/login", "/register"];
  const showNavBar = computed(() => !excludedRoutes.includes(route.path));
  const layout = computed(() => {
  return route.meta.layout || "div"; // si pas de layout, on met un simple div
});
</script>
<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}


</style>