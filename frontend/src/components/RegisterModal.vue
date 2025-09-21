<template>
  <div class="container" @click.self="$emit('close-Register')">
    <div class="card-register">
      <h3>INSCRIVEZ VOUS ICI</h3>

      <form @submit.prevent="registerUser" class="form-grid">

        <input
          type="text"
          class="input-register"
          v-model="name"
          placeholder="Nom*"
          required
        />
        <input
          type="text"
          class="input-register"
          v-model="firstname"
          placeholder="Prenom*"
          required
        />

        <div style="display: grid; grid-template-columns: 1fr 1fr; width:100%; gap: 50px">

          <input
            type="tel"
            class="input-register"
            pattern="[0-9]{10}"
            maxlength="10"
            v-model="phonenumber"
            placeholder="Telephone"
          />

          <input
            type="email"
            class="input-register"
            v-model="email"
            placeholder="Email*"
            required
          />


        </div>

        <input
          type="password"
          class="input-register"
          @focus="showConfirmPassword= true"
          v-model="password"
          placeholder="Mot de passe*"
          required
        />
        <input
          type="password"
          class="input-register"
          v-if="showConfirmPassword"
          v-model="confirmpassword"
          placeholder="Confirmer le mot de passe*"

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
        <span @click="$emit('open-login'); $emit('close-Register')" class="link" style="cursor: pointer;">Se connecter</span>
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
const showConfirmPassword = ref(false);
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
          { name: this.name, firstname: this.firstname, phonenumber: this.phonenumber, email: this.email, password: this.password, confirmpassword: this.confirmpassword }
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


<style>



  .container {
    padding-bottom: 50px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    justify-self: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Arial;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
  }


  /* Style de la carte */
  .card-register {
    border: 2px solid #ccc;
    border-radius: 15px;
    padding: 20px 50px 50px 50px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    width: 25%;
  }

  .form-grid {

    display: grid;
    gap: 30px 5px;
    width: 100%;
    max-width: 100%;
  }

  .input-register{
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

.link{
  cursor: pointer;
}

.link:hover{
  border-bottom: solid;
}

h3{
  font-weight: 100;
  padding:10px;
}
</style>