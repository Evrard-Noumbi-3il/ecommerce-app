<template>
  <div class="container" @click.self="$emit('close-Login')">
    <div class="card-login">
      <h3>CONNEXION</h3>

      <form @submit.prevent="loginUser" class="form-grid" >
        <input
          type="email"
          @focus="showPassword= true"
          v-model="email"
          placeholder="Email"
          class="w-full px-3 py-2 border rounded-lg mb-3"
          required
        />
        <input
          type="password"
          v-if="showPassword"
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
import { ref} from "vue";
import axios from "axios";

const showPassword = ref(false);
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
    border: 2px solid #ccc;
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

  input{
    border-radius: 6px;
    border: 2px solid gray;
    width: 100%;
    max-width: 100%;
    padding: 15px;
    justify-self: center;
  }



  .btn, .google-button {
    justify-self: center;
    justify-content: center;
    padding: 8px 20px;
    border: 1px solid #444;
    border-radius: 10px;
    background: #0d1b2a;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
}


.google-icon{
  width:10%;

}

h3{
  font-weight: 100;
}

.link{
  cursor: pointer;
}
</style>