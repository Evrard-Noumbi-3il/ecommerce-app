<template>
  <div class="error-page">
    <h1>500</h1>
    <h2>Erreur interne du serveur</h2>
    <p>Une erreur inattendue s’est produite. Veuillez réessayer plus tard.</p>
    <router-link to="/" class="btn">Retour à l’accueil</router-link>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
}
h1 { font-size: 6rem; color: #e74c3c; margin-bottom: 0; }
.btn {
  margin-top: 20px;
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
}
</style>
