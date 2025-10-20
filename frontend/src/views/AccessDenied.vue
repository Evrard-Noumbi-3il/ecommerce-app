<template>
  <div class="access-denied-container">
    <div class="access-denied-content">
      <div class="lock-icon">🔒</div>
      <h1>Accès refusé</h1>
      <p class="subtitle">Vous n'avez pas les permissions nécessaires</p>
      
      <div class="reason-box" v-if="reason">
        <p>{{ reason }}</p>
      </div>

      <div v-if="!reason" class="reason-box default-reason">
        <p>Cette ressource est réservée aux administrateurs ou utilisateurs autorisés.</p>
      </div>

      <div class="admin-info" v-if="requiredRole">
        <strong>Rôle requis :</strong> {{ requiredRole }}
      </div>

      <div class="error-actions">
        <router-link to="/" class="btn btn-danger">
          Retour à l'accueil
        </router-link>
        <router-link to="/profile" class="btn btn-secondary">
          Mon profil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  reason: String,
  requiredRole: String
})

const reason = computed(() => props.reason || route.query.reason || null)
const requiredRole = computed(() => props.requiredRole || route.query.role || null)
</script>

<style scoped>
.access-denied-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.access-denied-content {
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

.lock-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

h1 {
  font-size: 32px;
  color: #0d1b2a;
  margin: 0 0 10px 0;
  font-family: 'Poppins', sans-serif;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin: 0 0 30px 0;
}

.reason-box {
  background: #fee2e2;
  border-left: 4px solid #f5576c;
  padding: 15px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: left;
  color: #991b1b;
}

.reason-box.default-reason {
  background: #fef3c7;
  border-left-color: #f59e0b;
  color: #92400e;
}

.reason-box p {
  margin: 0;
  line-height: 1.5;
}

.admin-info {
  background: #f0f1f2;
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #333;
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

.btn-danger {
  background: #f5576c;
  color: white;
}

.btn-danger:hover {
  background: #e04452;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(245, 87, 108, 0.3);
}

.btn-secondary {
  background: white;
  color: #f5576c;
  border: 2px solid #f5576c;
}

.btn-secondary:hover {
  background: #f5576c;
  color: white;
}

@media (max-width: 600px) {
  .access-denied-content {
    padding: 40px 20px;
  }

  .lock-icon {
    font-size: 60px;
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