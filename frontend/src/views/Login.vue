<template>
  <div class="container">
    <div class="card-register">
      <h1>Connexion</h1>

      <form @submit.prevent="loginUser" class="form-grid">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full px-3 py-2 border rounded-lg mb-3"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          class="w-full px-3 py-2 border rounded-lg mb-3"
          required
        />
        <button
          type="submit"
          class="btn"
        >
          Se connecter
        </button>
      </form>

      <p class="mt-4 text-sm text-gray-600 text-center">
        Pas encore inscrit ?
        <router-link to="/register" class="text-blue-600">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          { email: this.email, password: this.password }
        );
        alert("Connexion réussie ");
        localStorage.setItem("token", res.data.token);
        this.$router.push("/");
        setTimeout(() => window.location.reload(), 500)
      } catch (err) {
        alert(err.response?.data?.message || "Erreur de connexion ❌");
      }
    },
  },
};
</script>
