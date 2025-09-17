<template>
  <div class="container">
    <div class="card-register" >
      <h1>INSCRIVEZ VOUS ICI</h1>

      <form @submit.prevent="registerUser" class="form-grid">
       <div style="display: grid; grid-template-columns: 1fr 1fr; width:100%; gap: 50px ">
          <input
            type="text"
            v-model="name"
            placeholder="Nom*"
            required
          />
          <input
            type="text"
            v-model="firstname"
            placeholder="Prenom*"
            required
          />
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; width:100%; gap: 50px">

          <input
            type="email"
            v-model="email"
            placeholder="Email*"
            required
          />

          <input
            type="tel"
            pattern="[0-9]{10}"
            maxlength="10"
            v-model="telephone"
            placeholder="Telephone"
          />
        </div>

        <input
          type="password"
          v-model="password"
          placeholder="Mot de passe*"
          required
        />
        <input
          type="confirmpassword"
          v-model="confirmpassword"
          placeholder="Confirmer le mot de passe*"
          class="w-full px-3 py-2 border rounded-lg mb-3"

        />



        <button
          type="submit"
          class="btn"
        >
          S’inscrire
        </button>
      </form>

      <p>
        Déjà un compte ?
        <router-link to="/login" class="text-blue-600">Se connecter</router-link>
      </p>

      <button type="button" class="google-button">
        <img
          src="https://aimg.kwcdn.com/upload_aimg/login/8e2e59cd-5090-4feb-ae78-691e9971ed89.png.slim.png?imageView2/2/w/72/q/80/format/webp"
          alt="Logo Google"
          class="google-icon"
        >
        <span>Continuer avec Google</span>
      </button>
</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      firstname: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/register`,
          { name: this.name, firstname: this.firstname, email: this.email, password: this.password }
        );
        alert("Inscription réussie ");
        
        localStorage.setItem("token", res.data.token);
        this.$router.push("/");
        setTimeout(() => window.location.reload(), 500)
      } catch (err) {
        alert(err.response?.data?.message || "Erreur d'inscription ❌");
      }
    },
  },
};
</script>
