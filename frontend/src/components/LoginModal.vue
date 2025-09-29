<template>
  <div class="container" @click.self="$emit('close-Login')">
    <div class="card-login">
      <h3>CONNEXION</h3>

      <!-- Message de connexion -->
      <div v-if="message.text" :class="['login-message', message.type]">
        {{ message.text }}
      </div>

      <form @submit.prevent="loginUser" class="form-grid" >
        <input
          type="email"
          class="input-login"
          @focus="showPassword= true"
          v-model="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          class="input-login"
          v-if="showPassword"
          v-model="password"
          placeholder="Mot de passe"
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
        <span @click="$emit('open-Register'); $emit('close-Login')" class="link">Créer un compte</span>
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
import { ref } from "vue";
import axios from "axios";

const showPassword = ref(false);

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      message: { text: "", type: "" }
    };
  },
  methods: {
    async loginUser() {
      this.message = { text: "", type: "" };
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          { email: this.email, password: this.password }
        );
        this.message = { text: "Connexion réussie ✅", type: "success" };
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          this.$router.push("/");
          window.location.reload();
        }, 1200);
      } catch (err) {
        this.message = { text: err.response?.data?.message || "Erreur de connexion ❌", type: "error" };
      }
    },
  },
};
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-family: Arial;
    height: 100vh;
  }


  /* Style de la carte */
  .card-login {
    border-radius: 10px;
    padding: 30px 50px 50px 50px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    width: 25%;
  }

  .form-grid {
    padding-top: 10px;
    display: grid;
    gap: 30px 5px;
    width: 100%;
    max-width: 100%;
  }

  .input-login{
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
    font-size: 14px;
    transition: border 0.3s ease, box-shadow 0.3s ease;
    justify-self: center;
  }





.google-icon{
  width:10%;

}

h3 {
  font-family: 'Poppins', sans-serif;
  color: #0d1b2a;
  text-align: center;
  margin-bottom: 20px;
}

.link{
  cursor: pointer;
}

.login-message {
  margin-bottom: 18px;
  padding: 10px 14px;
  border-radius: 7px;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.login-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}
.login-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}
</style>