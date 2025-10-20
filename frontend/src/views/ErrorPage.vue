<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-code">{{ errorCode }}</div>
      <h1>{{ errorTitle }}</h1>
      <p class="error-message">{{ errorMessage }}</p>
      
      <p class="error-details" v-if="errorDetails">
        <small>{{ errorDetails }}</small>
      </p>

      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">
          Retour à l'accueil
        </router-link>
        <button @click="goBack" class="btn btn-secondary">
          Retour précédent
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  errorCode: String,
  errorMessage: String,
  errorDetails: String
})

const errorCode = computed(() => props.errorCode || route.query.code || '500')
const errorMessage = computed(() => props.errorMessage || route.query.message || '')
const errorDetails = computed(() => props.errorDetails || route.query.details || null)

const errorConfig = {
  '400': {
    title: 'Mauvaise requête',
    defaultMessage: 'La requête envoyée n\'est pas valide. Veuillez vérifier les informations saisies.'
  },
  '401': {
    title: 'Non authentifié',
    defaultMessage: 'Vous devez être connecté pour accéder à cette page.'
  },
  '403': {
    title: 'Accès refusé',
    defaultMessage: 'Vous n\'avez pas les permissions nécessaires.'
  },
  '404': {
    title: 'Page non trouvée',
    defaultMessage: 'La page que vous recherchez n\'existe pas ou a été supprimée.'
  },
  '500': {
    title: 'Erreur serveur',
    defaultMessage: 'Une erreur est survenue. Veuillez réessayer plus tard.'
  },
  '503': {
    title: 'Service indisponible',
    defaultMessage: 'Le service est actuellement indisponible.'
  }
}

const errorTitle = computed(() => {
  return errorConfig[errorCode.value]?.title || 'Erreur'
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.error-content {
  background: white;
  padding: 60px 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 600px;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #667eea;
  margin: 0;
  line-height: 1;
}

h1 {
  font-size: 32px;
  color: #0d1b2a;
  margin: 20px 0 15px 0;
  font-family: 'Poppins', sans-serif;
}

.error-message {
  font-size: 16px;
  color: #666;
  margin: 0 0 30px 0;
  line-height: 1.6;
}

.error-details {
  font-size: 12px;
  color: #999;
  margin: 0 0 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

@media (max-width: 600px) {
  .error-content {
    padding: 40px 20px;
  }

  .error-code {
    font-size: 80px;
  }

  h1 {
    font-size: 24px;
  }

  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>