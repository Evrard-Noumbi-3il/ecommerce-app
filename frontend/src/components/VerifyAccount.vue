<template>
  <div class="container" @click.self="$emit('close-verify')">
    <div class="card-register">
      <h3>VÉRIFICATION DE COMPTE</h3>

      
      <div v-if="message.text" :class="['register-message', message.type]">
        {{ message.text }}
      </div>

      <form @submit.prevent="verifyCode" class="form-grid">
        <div class="input-group">
          <label class="verify-label">Code de vérification</label>
          <input
            type="text"
            v-model="code"
            maxlength="6"
            placeholder="Entrez le code 6 chiffres"
            class="input-register code-input"
            required
            :disabled="isLoading"
            @input="formatCode"
          />
          <p class="helper-text">Un email contenant le code a été envoyé à : <strong>{{ userEmail }}</strong></p>
        </div>

        <button
          type="submit"
          class="btn verify-btn"
          :disabled="isLoading || code.length < 6"
        >
          {{ isLoading ? 'Vérification en cours...' : 'Valider' }}
        </button>
      </form>

      <div class="resend-section">
        <p class="resend-text">Vous n'avez pas reçu le code ?</p>
        <button
          @click="resendCode"
          class="resend-btn"
          :disabled="isResending || countdown > 0"
        >
          {{ countdown > 0 ? `Renvoyer dans ${countdown}s` : 'Renvoyer le code' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()


const code = ref('')
const message = ref({ text: '', type: '' })
const isLoading = ref(false)
const isResending = ref(false)
const countdown = ref(0)
const userEmail = ref('')
const resendAttempts = ref(0)


onMounted(() => {
  
  let urlEmail = route.query.email
  const urlCode = route.query.code

  if (urlEmail && urlCode) {
    
    try {
      userEmail.value = decodeURIComponent(urlEmail)
    } catch (e) {
      userEmail.value = urlEmail
    }
    code.value = urlCode
    console.log('✅ Email et code pré-remplis depuis le lien:', userEmail.value)
  } else {
   
    userEmail.value = localStorage.getItem('verifyEmail') || ''
  }
  
  if (!userEmail.value) {
    message.value = { 
      text: 'Erreur : Email introuvable. Veuillez vous réinscrire.', 
      type: 'error' 
    }
  }

  
  if (code.value && code.value.length === 6) {
    console.log('💡 Code détecté automatiquement, prêt à vérifier')
  }
})


let countdownInterval = null


const formatCode = (e) => {
  code.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
}


const verifyCode = async () => {
  if (code.value.length !== 6) {
    message.value = { 
      text: 'Le code doit contenir 6 chiffres', 
      type: 'error' 
    }
    return
  }

  try {
    isLoading.value = true
    message.value = { text: '', type: '' }

    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/auth/verify`,
      {
        email: userEmail.value,
        code: code.value
      }
    )

    message.value = { text: response.data.message + ' ✅', type: 'success' }
    

    setTimeout(() => {
      localStorage.removeItem('verifyEmail')
      router.push("/");
    }, 1500)

  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Erreur lors de la vérification'
    message.value = { text: errorMsg + ' ❌', type: 'error' }
    console.error('Erreur lors de la vérification du code :', error)
  } finally {
    isLoading.value = false
  }
}


const resendCode = async () => {
  try {
    isResending.value = true
    message.value = { text: '', type: '' }

    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/auth/resend-code`,
      { email: userEmail.value }
    )

    message.value = { text: response.data.message + ' ✅', type: 'success' }
    code.value = '' 

    resendAttempts.value++

    const delaySeconds = 30 * resendAttempts.value
    countdown.value = delaySeconds
    
    countdownInterval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownInterval)
      }
    }, 1000)

  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Erreur lors du renvoi du code'
    message.value = { text: errorMsg + ' ❌', type: 'error' }
    console.error('Erreur lors du renvoi du code de vérification :', error)
  } finally {
    isResending.value = false
  }
}


onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.container {
  padding-bottom: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial;
  z-index: 9999;
  background: rgba(214, 173, 173, 0.5);
  backdrop-filter: blur(2px);
}


.card-register {
  border-radius: 15px;
  padding: 40px 50px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 25%;
  min-width: 350px;
  max-width: 500px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h3 {
  font-family: 'Poppins', sans-serif;
  color: #0d1b2a;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.5rem;
  font-weight: 700;
}


.register-message {
  margin-bottom: 18px;
  padding: 12px 14px;
  border-radius: 7px;
  font-size: 0.95rem;
  text-align: center;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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


.form-grid {
  display: grid;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.input-group {
  text-align: left;
}

.verify-label {
  display: block;
  font-weight: 600;
  color: #0d1b2a;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.input-register {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  text-align: center;
}

.input-register:focus {
  border-color: #0d1b2a;
  box-shadow: 0 0 5px rgba(13, 27, 42, 0.3);
  outline: none;
}

.input-register:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.code-input {
  font-size: 24px;
  letter-spacing: 8px;
  font-weight: bold;
}

.helper-text {
  font-size: 0.85rem;
  color: #666;
  margin-top: 8px;
  line-height: 1.4;
}


.btn, .verify-btn {
  justify-self: center;
  justify-content: center;
  padding: 12px 30px;
  border-radius: 10px;
  background: #0d1b2a;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.btn:hover:not(:disabled), .verify-btn:hover:not(:disabled) {
  background: #1a2a3a;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:disabled, .verify-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}


.resend-section {
  margin: 25px 0;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.resend-text {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.resend-btn {
  background: #2563eb;
  padding: 10px 20px;
  font-size: 14px;
  width: auto;
  justify-self: center;
}

.resend-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.resend-btn:disabled {
  background: #cbd5e1;
  color: white;
  cursor: not-allowed;
}


@media (max-width: 768px) {
  .card-register {
    width: 90%;
    padding: 30px 25px;
    min-width: auto;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  .input-register {
    font-size: 18px;
    padding: 12px;
  }

  .code-input {
    font-size: 20px;
    letter-spacing: 4px;
  }

  .btn, .verify-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .card-register {
    width: 95%;
    padding: 25px 20px;
  }

  h3 {
    font-size: 1.1rem;
  }

  .input-register {
    font-size: 16px;
  }

  .helper-text {
    font-size: 0.8rem;
  }

  .code-input {
    font-size: 18px;
    letter-spacing: 3px;
  }
}
</style>