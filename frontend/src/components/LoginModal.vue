<template>
  <div class="container" @click.self="$emit('close-Login')">
    <div class="card-login">
      <h3>CONNEXION</h3>


      <div v-if="message.text" :class="['login-message', message.type]">
        {{ message.text }}
      </div>


      <div v-if="showVerificationPrompt" class="verification-prompt">
        <p style="font-size: 16px; color: #333; margin-bottom: 15px;">
          Votre compte n'est pas encore vérifié.
        </p>
        <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
          Un email de vérification a été envoyé à : <strong>{{ email }}</strong>
        </p>
        
        <button 
          @click="goToVerification"
          class="btn verify-redirect-btn"
        >
          Vérifier mon compte
        </button>

        <button 
          @click="requestNewVerificationCode"
          class="btn resend-verification-btn"
          :disabled="isResendingCode"
        >
          {{ isResendingCode ? 'Envoi en cours...' : 'Renvoyer un code' }}
        </button>

        <button 
          @click="showVerificationPrompt = false"
          class="cancel-btn"
        >
          ← Retour
        </button>
      </div>

      <form v-if="!showVerificationPrompt" @submit.prevent="loginUser" class="form-grid">
        <input
          type="email"
          class="input-login"
          @focus="showPassword = true"
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
          :disabled="isLoading"
        >
          {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>

      <p v-if="!showVerificationPrompt" class="mt-4 text-sm text-gray-600 text-center">
        Pas encore inscrit ?
        <span @click="$emit('open-Register'); $emit('close-Login')" class="link">Créer un compte</span>
      </p>

      <button v-if="!showVerificationPrompt" type="button" class="google-button">
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
import { useRouter } from "vue-router";

const showPassword = ref(false);

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      email: "",
      password: "",
      message: { text: "", type: "" },
      showVerificationPrompt: false,
      isLoading: false,
      isResendingCode: false
    };
  },
  methods: {
    async loginUser() {
      this.message = { text: "", type: "" };
      
      if (!this.email || !this.password) {
        this.message = { 
          text: "Email et mot de passe requis", 
          type: "error" 
        };
        return;
      }

      try {
        this.isLoading = true;
        const res = await api.post(
          `/auth/login`,
          { 
            email: this.email, 
            password: this.password 
          }
        );

        this.message = { text: "Connexion réussie ✅", type: "success" };
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        setTimeout(() => {
          this.$router.push("/");
          window.location.reload();
        }, 1200);

      } catch (err) {
        const errorData = err.response?.data;
        const statusCode = err.response?.status;

        console.log('DEBUG Login Error:');
        console.log('Status:', statusCode);
        console.log('Data:', errorData);
        console.log('requiresVerification:', errorData?.requiresVerification);

        if (statusCode === 403 && errorData?.requiresVerification === true) {
          console.log('✅ Affichage de l\'écran de vérification');
          this.showVerificationPrompt = true;
          this.message = { 
            text: errorData.message, 
            type: "error" 
          };
        } else {
          this.message = { 
            text: errorData?.message || "Erreur de connexion ❌", 
            type: "error" 
          };
        }
      } finally {
        this.isLoading = false;
      }
    },

    async goToVerification() {
      localStorage.setItem("verifyEmail", this.email);
      this.$emit("close-Login");
      this.$router.push("/verify-account");
    },

    async requestNewVerificationCode() {
      try {
        this.isResendingCode = true;
        this.message = { text: "", type: "" };

        const res = await api.post(
          `/auth/resend-code`,
          { email: this.email }
        );

        this.message = { 
          text: res.data.message + " ✅", 
          type: "success" 
        };

      } catch (err) {
        this.message = { 
          text: err.response?.data?.message || "Erreur lors du renvoi du code ❌", 
          type: "error" 
        };
      } finally {
        this.isResendingCode = false;
      }
    }
  }
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

  .input-login:focus {
    border-color: #0d1b2a;
    box-shadow: 0 0 5px #0d1b2a;
    outline: none;
  }

  .btn {
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
    font-weight: 600;
    width: 100%;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

  .link:hover{
    border-bottom: solid;
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

  .verification-prompt {
    display: grid;
    gap: 15px;
    width: 100%;
    padding: 10px 0;
  }

  .verify-redirect-btn {
    background: #2563eb;
    font-size: 14px;
  }

  .resend-verification-btn {
    background: #10b981;
    font-size: 14px;
  }

  .cancel-btn {
    background: none;
    border: none;
    color: #0d1b2a;
    cursor: pointer;
    font-size: 14px;
    padding: 8px;
    transition: all 0.2s ease;
    text-decoration: none;
    font-weight: 500;
    justify-self: center;
    width: auto;
  }

  .cancel-btn:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  .google-button {
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
    width: 100%;
  }

  .mt-4 {
    margin-top: 1rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-gray-600 {
    color: #666;
  }

  .text-center {
    text-align: center;
  }
</style>