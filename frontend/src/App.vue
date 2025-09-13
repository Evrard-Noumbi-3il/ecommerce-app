<template>
  <div id="app">
    <!-- Barre de navigation -->
    <nav class="p-4 bg-gray-800 text-white flex justify-between">
      
    </nav>

    <!-- Contenu de la page -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
router-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  margin-left: 20px;
}
</style>
