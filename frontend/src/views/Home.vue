<template>
  <div class="p-6 text-center">

    <div class="mt-6 space-x-4">
      <router-link
        to="/login"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Connexion
      </router-link>
      <router-link
        to="/register"
        class="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Inscription
      </router-link>
    </div>
    
    <h1 class="text-3xl font-bold">Bienvenue sur MonShop 🛒</h1>
    <p class="mt-4 text-gray-600">Le meilleur endroit pour acheter vos produits en ligne.</p>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
