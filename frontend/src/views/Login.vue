<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Connexion</h2>

      <form @submit.prevent="loginUser">
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
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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
      } catch (err) {
        alert(err.response?.data?.message || "Erreur de connexion ❌");
      }
    },
  },
};
</script>
