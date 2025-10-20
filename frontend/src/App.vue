<template>
  <div id="app">
    <NavBar v-if="showNavBar" @open-Register="showRegister = true" />
    <component :is="layout">
      <router-view />
    </component>

    <RegisterModal v-if="showRegister" @close-Register="showRegister = false" @open-verify="showVerify = true" @open-login="showlogin = true"/>
    <LoginModal v-if="showlogin" @close-Login="showlogin = false" @open-Register="showRegister = true" @close-Register="showRegister = false"/>
    <VerifyAccount v-if="showVerify" @close-Verify="showVerify = false" @open-verify="showVerify = true" @close-Register="showRegister = false"/>
    <SessionExpiredModal v-if="showSessionExpired" @close="showSessionExpired = false"/>
  </div>

  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h2 class="footer-logo">KANOPE</h2>
        <p class="footer-desc">
          KANOPE est votre plateforme pour publier, rechercher et gérer vos annonces facilement.
        </p>
      </div>

      <!-- Section Navigation -->
      <div class="footer-section">
        <h3>Navigation</h3>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/search">Recherche</router-link></li>
          <li><router-link to="/post-ad">Publier une annonce</router-link></li>
          <li><router-link to="/favoris">Favoris</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Support & Infos</h3>
        <ul>
          <li><router-link to="/verify-account">Vérification</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/terms">Mentions légales</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Suivez-nous</h3>
        <div class="social-icons">
          <a href="#" target="_blank" aria-label="Facebook">🌐</a>
          <a href="#" target="_blank" aria-label="Twitter">🐦</a>
          <a href="#" target="_blank" aria-label="Instagram">📸</a>
          <a href="#" target="_blank" aria-label="LinkedIn">💼</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 KANOPE. Tous droits réservés.</p>
    </div>
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
.footer {
  background-color: #0d1b2a;
  color: #ccc;
  font-family: 'Poppins', sans-serif;
  padding: 60px 20px 30px 20px;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1 1 200px;
}

.footer-logo {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: 0.3s;
}

.footer-section ul li a:hover {
  color: #10b981; 
}

.social-icons a {
  font-size: 1.5rem;
  margin-right: 15px;
  color: #ccc;
  transition: 0.3s;
}

.social-icons a:hover {
  color: #10b981;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid #333;
  padding-top: 20px;
  font-size: 0.85rem;
  color: #999;
}


@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 30px;
  }
}

</style>