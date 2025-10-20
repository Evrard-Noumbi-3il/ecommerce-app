<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="nav-header">
        <!-- Logo -->
        <div class="logo">
          <RouterLink to="/">Kanope</RouterLink>
        </div>

        <!-- Barre de recherche -->
        <div
          class="search-bar"
          v-if="
            route.name !== 'search' &&
            route.name !== 'PostAndAdd' &&
            !isAdminOrModerator
          "
        >
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher une annonce..."
            @keyup.enter="goToSearch"
          />
          <button @click="goToSearch">
            <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Burger menu pour mobile -->
      <div class="burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Liens de navigation -->
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <div class="menu">
          <li><RouterLink to="/" >Accueil</RouterLink></li>
          <li><RouterLink to="/search" >Catégories</RouterLink></li>
          <li><RouterLink to="/favoris" v-if="isLoggedIn && ! isAdminOrModerator">Favoris</RouterLink></li>
          <li><RouterLink to="/chat" v-if="isLoggedIn && ! isAdminOrModerator">Messagerie</RouterLink></li>
          <li><RouterLink to="/admin/dashboard" v-if="isLoggedIn && isAdminOrModerator">Dashboard</RouterLink></li>
          <li>
            <RouterLink
              to="/admin/dashboard"
              v-if="isLoggedIn && isAdminOrModerator"
              >Dashboard</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/post-ad"
              v-if="
                isLoggedIn && !isAdminOrModerator && route.name !== 'PostAndAdd'
              "
              class="btn-poster"
              >+ Déposer une annonce</RouterLink
            >
          </li>
        </div>

        <div class="user-access">
          <li>
            <RouterLink to="/profile" v-if="isLoggedIn && !isAdminOrModerator"
              >Mon compte</RouterLink
            >
          </li>
          <li>
            <span
              v-if="!isLoggedIn"
              @click="$emit('open-Register')"
              style="color: black; font-size: 15px; cursor: pointer"
              >Se connecter/S'inscrire</span
            >
          </li>
          <li>
            <RouterLink
              v-if="isLoggedIn"
              to="/"
              @click="logout"
              class="btn-deconnexion"
              >Déconnexion</RouterLink
            >
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const searchQuery = ref("");

const isMenuOpen = ref(false);
const isLoggedIn = ref(false);
const isAdminOrModerator = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: "search",
      query: { q: searchQuery.value.trim() }, // ✅ envoie le texte
    });
    searchQuery.value = "";
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");
  isLoggedIn.value = !!token;
  isAdminOrModerator.value =
    token &&
    (JSON.parse(atob(token.split(".")[1])).role === "admin" ||
      JSON.parse(atob(token.split(".")[1])).role === "moderator");
});

function logout() {
  localStorage.clear();
  isLoggedIn.value = false;
  isAdminOrModerator.value = false;
  setTimeout(() => window.location.reload(), 500);
}
</script>

<style scoped>
li {
  font-weight: 500;
  font-size: 15px;
  font-family: arial;
}

.navbar {
  margin: 0;
  width: 100%;
  max-width: 100%;
  z-index: 1000;
  /* background-color: #0d1b2a; */
  color: white;
  position: sticky;
  top: -140px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
}

.navbar-container {
  display: flex;
  flex-direction: column;
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
  margin: 0;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 10px 20px;
  width: 98%;
  background-color: white;
  /* border-bottom: 1px solid #06060654; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-links li a {
  text-decoration: none;
  color: #0d1b2a;
  font-weight: 500;
}

.nav-links li a:hover {
  color: #e69100;
}

.menu {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
}

.user-access {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;
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
  padding: 20px;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.nav-header {
  display: flex;
  flex-direction: row;
  gap: 80px;
  background-color: #0d1b2a;
  padding: 50px 30px 50px 30px;
}

.burger span {
  width: 25px;
  height: 3px;
  background: black;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    background: white;
    padding: 15px;
    width: 25%;
    align-content: space-between;
  }

  .menu {
    flex-direction: column;
    gap: 10px;
  }

  .user-access {
    flex-direction: column;
    gap: 10px;
  }

  .nav-links.active {
    display: flex;
  }

  .burger {
    display: flex;
    background-color: white;
  }
}
</style>
