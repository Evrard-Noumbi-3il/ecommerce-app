<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">🔍</div>
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p class="description">
        Désolé, la page que vous recherchez n'existe pas ou a été supprimée.
      </p>

      <div class="search-box">
        <input 
          type="text" 
          placeholder="Rechercher..."
          @keyup.enter="handleSearch"
          v-model="searchQuery"
          class="search-input"
        />
        <button @click="handleSearch" class="search-btn">Rechercher</button>
      </div>

      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">
          Accueil
        </router-link>
        <router-link to="/search" class="btn btn-secondary">
          Parcourir les annonces
        </router-link>
      </div>

      <p class="back-link" @click="goBack">
        ← Retour à la page précédente
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value }
    })
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.not-found-content {
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

.not-found-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

h1 {
  font-size: 80px;
  color: #667eea;
  margin: 0;
  font-weight: bold;
}

h2 {
  font-size: 32px;
  color: #0d1b2a;
  margin: 10px 0 15px 0;
  font-family: 'Poppins', sans-serif;
}

.description {
  font-size: 16px;
  color: #666;
  margin: 0 0 30px 0;
  line-height: 1.6;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.search-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.search-btn {
  padding: 12px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.search-btn:hover {
  background: #5568d3;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
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

.back-link {
  cursor: pointer;
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: text-decoration 0.2s;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .not-found-content {
    padding: 40px 20px;
  }

  h1 {
    font-size: 60px;
  }

  h2 {
    font-size: 24px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>