<template>
  <nav class="navbar">
    <div class="navbar-container">

        <!-- Logo -->
      <div class="logo">
        <RouterLink to="/">Kanope</RouterLink>
      </div>

        <!-- Barre de recherche -->
      <div class="search-bar">
        <input type="text" placeholder="Rechercher une annonce..." />
        <button>🔍</button>
      </div>

      <!-- Liens de navigation -->
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/categories">Catégories</RouterLink></li>
        <li><RouterLink to="/favorites" v-if="isLoggedIn">Favoris</RouterLink></li>
        <li><RouterLink  to="/profile">Mon compte</RouterLink></li>
        <li>
          <RouterLink v-if="isLoggedIn" to="/post-ad" class="btn-poster">+ Déposer une annonce</RouterLink>
        </li>
        <li ><button v-if="!isLoggedIn" @click="$emit('open-Register')" style="border: none; background-color: #0d1b2a; color: white; padding: 0px; font-weight: 500; font-size: 15px; cursor: pointer;">Se connecter/S'inscrire</button></li>
        <li> <RouterLink v-if="isLoggedIn" to="/" @click="logout" class="btn-deconnexion">Déconnexion</RouterLink> </li>
      </ul>

        <!-- Burger menu pour mobile -->
      <div class="burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>


</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";


const isMenuOpen = ref(false);
const isLoggedIn = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  const token = localStorage.getItem("token");
  isLoggedIn.value = !!token;
});

function logout() {
  localStorage.clear();
  isLoggedIn.value = false;
  setTimeout(() => window.location.reload(), 500)
}
</script>

<style scoped>

li{

  font-weight: 500;
  font-size: 15px;
  font-family: arial;
}

li:hover{
  font-weight: 800;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 96%;
  z-index: 1000;
  background-color: #0d1b2a;
  color: white;
  padding: 20px 30px;
  border-bottom: 2px solid #e5e5e5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.search-bar {
  flex: 1;
  margin: 0 20px;
  display: flex;
  align-items: center;
}

.search-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  outline: none;
}

.search-bar button {
  background-color: #1b263b;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
}


.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li a {
  text-decoration: none;
  color: white;
  font-weight: 500;
}

.nav-links li a:hover {
  color: #adb5bd;
}

.btn-poster {
  background-color: #fca311;
  color: black !important;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
}

.btn-poster:hover {
  background-color: #e69100;
  color: white !important;
}

.btn-deconnexion {
  background-color: #ef1f42;
  color: black !important;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
}

.btn-deconnexion:hover {
  background-color: #c70039;
  color: white !important;
}

.burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.burger span {
  width: 25px;
  height: 3px;
  background: white;
}


@media (max-width: 768px) {

  .nav-links {
    display: none;
    flex-direction: column;
    background: #0d1b2a;
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
    padding: 15px;
  }

  .nav-links.active {
    display: flex;
  }

  .burger {
    display: flex;
  }
}
</style>