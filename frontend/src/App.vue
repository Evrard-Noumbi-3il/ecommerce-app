<template>

  <div id="app">
    <NavBar v-if="showNavBar" @open-Register="showRegister = true"/>
    <component :is="layout">
      <router-view
    />
    </component>


    <RegisterModal v-if="showRegister" @close-Register="showRegister = false" @open-verify="showVerify = true" @open-login="showlogin = true"/>
    <LoginModal v-if="showlogin" @close-Login="showlogin = false" @open-Register="showRegister = true" @close-Register="showRegister = false"/>
    <VerifyAccount v-if="showVerify" @close-Verify="showVerify = false" @open-verify="showVerify = true" @close-Register="showRegister = false"/>
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
  import VerifyAccount from "./components/VerifyAccount.vue";

  const showRegister = ref(false);
  const showlogin = ref(false);
  const showVerify = ref(false);

  const route = useRoute();
  const excludedRoutes = ["/login", "/register"];
  const showNavBar = computed(() => !excludedRoutes.includes(route.path));
  const layout = computed(() => {
  return route.meta.layout || "div"; 
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