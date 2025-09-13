<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Inscription</h2>

      <form @submit.prevent="registerUser">
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
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          S’inscrire
        </button>
      </form>

      <p class="mt-4 text-sm text-gray-600 text-center">
        Déjà un compte ?
        <router-link to="/login" class="text-blue-600">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/register`,
          { email: this.email, password: this.password }
        );
        alert("Inscription réussie ");
        this.$router.push("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Erreur d'inscription ❌");
      }
    },
  },
};
</script>
