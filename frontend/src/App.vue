<template>
  <div id="app">
    <header>
      <NavBar v-if="showNavBar" @open-Register="showRegister = true" />
    </header>
    <router-view />

    <RegisterModal v-if="showRegister" @close-Register="showRegister = false" @open-login="showlogin = true"/>
    <loginModal v-if="showlogin" @close-Login="showlogin = false" @open-Register="showRegister = true" @close-Register="showRegister = false"/>
  </div>
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
</script>
<style>


</style>