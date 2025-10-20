<template>
  <div id="app">
    <NavBar v-if="showNavBar" @open-Register="showRegister = true" />
    <component :is="layout">
      <router-view />
    </component>

    <RegisterModal v-if="showRegister" @close-Register="showRegister = false" @open-verify="showVerify = true" @open-login="showlogin = true"/>
    <LoginModal v-if="showlogin" @close-Login="showlogin = false" @open-Register="showRegister = true" @close-Register="showRegister = false"/>
    <VerifyAccount v-if="showVerify" @close-Verify="showVerify = false" @open-verify="showVerify = true" @close-Register="showRegister = false"/>
    
    <!-- Modale session expirée -->
    <SessionExpiredModal v-if="showSessionExpired" @close="showSessionExpired = false"/>
  </div>

  <footer style="padding: 100px; background-color: black;">
    <p style="text-align: center; font-size: 12px; color: gray;">&copy; 2024 MonSite. Tous droits réservés.</p>
  </footer>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { onSessionExpired } from "@/auth/axios.js";

import NavBar from "./components/NavBar.vue";
import RegisterModal from "./components/RegisterModal.vue";
import LoginModal from "./components/LoginModal.vue";
import VerifyAccount from "./components/VerifyAccount.vue";
import SessionExpiredModal from "@/components/SessionExpiredModal.vue";

const showRegister = ref(false);
const showlogin = ref(false);
const showVerify = ref(false);
const showSessionExpired = ref(false);

const route = useRoute();
const excludedRoutes = ["/login", "/register"];
const showNavBar = computed(() => !excludedRoutes.includes(route.path));
const layout = computed(() => route.meta.layout || "div");

// Écoute globale de session expirée
onMounted(() => {
  onSessionExpired(() => {
    showSessionExpired.value = true;
  });
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