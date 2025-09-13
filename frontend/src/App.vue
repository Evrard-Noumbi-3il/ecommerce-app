<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "Chargement..."
    }
  },
  async created() {
    try {
      const res = await fetch(process.env.VUE_APP_API_URL)
      const data = await res.json()
      this.message = data.message
    } catch (e) {
      this.message = "Erreur de connexion API"
    }
  }
}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
