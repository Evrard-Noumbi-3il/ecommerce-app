<template>
  <div class="container" @click.self="$emit('close-Register')">
    <div class="card-register">
      <h3>INSCRIVEZ VOUS ICI</h3>


      <div v-if="message.text" :class="['register-message', message.type]">
        {{ message.text }}
      </div>

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
import { ref } from "vue";
import api from "@/auth/axios";
import bcrypt from "bcryptjs";
const showConfirmPassword = ref(false);

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      firstname: "",
      phonenumber: "",
      email: "",
      password: "",
      confirmpassword: "",
      message: { text: "", type: "" }
    };
  },
  methods: {
    async registerUser() {
      this.message = { text: "", type: "" };
      try {
        if(this.password !== this.confirmpassword) {
          this.message = { text: "Les mots de passe ne correspondent pas ❌", type: "error" };
          return;
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const res = await api.post(
          `/auth/register`,
          {
            name: this.name,
            firstname: this.firstname,
            phonenumber: this.phonenumber,
            email: this.email,
            password: hashedPassword,
          }
        );

        localStorage.setItem("verifyEmail", this.email);

        this.message = { text: "Inscription réussie ✅ Vérifiez votre email/SMS", type: "success" };
        localStorage.setItem("token", res.data.token);
        this.$emit("open-verify");
        this.$emit("close-Register");

      } catch (err) {
        this.message = { text: err.response?.data?.message || "Erreur d'inscription ❌", type: "error" };
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
    background: rgba(214, 173, 173, 0.5);
  }

  .card-register {
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
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
    font-size: 14px;
    transition: border 0.3s ease, box-shadow 0.3s ease;
    justify-self: center;
  }

  input:focus {
    border-color: #0d1b2a;
    box-shadow: 0 0 5px #0d1b2a;
    outline: none;
  }



  .btn, .google-button {
    justify-self: center;
    justify-content: center;
    padding: 8px 20px;
    border-radius: 10px;
    background: #0d1b2a;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
    border: none;

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

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

h3 {
  font-family: 'Poppins', sans-serif;
  color: #f0f1f2;
  text-align: center;
  margin-bottom: 20px;
}

.register-message {
  margin-bottom: 18px;
  padding: 10px 14px;
  border-radius: 7px;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.register-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}
.register-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}
</style>