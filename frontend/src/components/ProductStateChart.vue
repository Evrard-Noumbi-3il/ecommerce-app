<template>
  <div class="dashboard-container">
    <h1>Tableau de bord</h1>

    <div v-if="loading" class="loading">
      Chargement des statistiques...
    </div>

    <div v-else>
      <div class="stats">
        <div class="card">
          <h2>{{ stats.users }}</h2>
          <p>Utilisateurs</p>
        </div>
        <div class="card">
          <h2>{{ stats.products }}</h2>
          <p>Produits</p>
        </div>
        <div class="card">
          <h2>{{ stats.reported }}</h2>
          <p>Signalements</p>
        </div>
        <div class="card">
          <h2>{{ stats.orders }}</h2>
          <p>Commandes</p>
        </div>
      </div>

      <div class="dashboard-grid">
        <ProductTrendChart
          :chartData="trendChartData"
          :chartOptions="trendChartOptions"
        />
        <ProductStatusChart
          :chartData="statusChartData"
          :chartOptions="statusChartOptions"
        />
        <ProductStateChart
          :chartData="stateChartData"
          :chartOptions="stateChartOptions"
        />
        <ProductSellerTypeChart
          :chartData="sellerTypeChartData"
          :chartOptions="sellerTypeChartOptions"
        />
        <TopCategoriesChart
          :chartData="topCategoriesChartData"
          :chartOptions="topCategoriesChartOptions"
        />
      </div>
    </div>

    <div v-if="error" class="error">
      ❌ Une erreur est survenue lors du chargement du tableau de bord.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from '../auth/axios.js';

import ProductTrendChart from '../components/ProductTrendChart.vue';
import ProductStatusChart from '../components/ProductStatusChart.vue';
import ProductStateChart from '../components/ProductStateChart.vue';
import ProductSellerTypeChart from '../components/ProductSellerTypeChart.vue';
import TopCategoriesChart from '../components/TopCategoriesChart.vue';

const stats = ref({
  users: 0,
  products: 0,
  reported: 0,
  orders: 0,
});
const loading = ref(true);
const error = ref(false);

// Initialisation des données pour chaque graphique
const trendChartData = ref({
  labels: [],
  datasets: [{
    label: 'Produits ajoutés',
    data: [],
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
    fill: true,
    tension: 0.3
  }]
});
const trendChartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Évolution des produits publiés' }
  }
});

const statusChartData = ref({
  labels: [],
  datasets: [{
    label: 'Statut des produits',
    data: [],
    backgroundColor: ['#4caf50', '#ffc107', '#f44336']
  }]
});
const statusChartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Produits par statut' }
  }
});

const stateChartData = ref({
  labels: [],
  datasets: [{
    label: 'État des produits',
    data: [],
    backgroundColor: ['#4bc0c0', '#ff6384']
  }]
});
const stateChartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Produits neufs vs occasion' }
  }
});

const sellerTypeChartData = ref({
  labels: [],
  datasets: [{
    label: 'Type de vendeur',
    data: [],
    backgroundColor: ['#36a2eb', '#ff6384']
  }]
});
const sellerTypeChartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Particulier vs Professionnel' }
  }
});

const topCategoriesChartData = ref({
  labels: [],
  datasets: [{
    label: 'Produits',
    data: [],
    backgroundColor: '#42a5f5'
  }]
});
const topCategoriesChartOptions = ref({
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Catégories les plus populaires' }
  }
});

onMounted(async () => {
  try {
    // 1. Statistiques globales
    const { data: statsData } = await api.get('/api/admin/stats/summary');
    stats.value = statsData;

    // 2. Produits ajoutés par jour
    const { data: trendData } = await api.get('/api/admin/stats/products-by-day');
    trendChartData.value.labels = trendData.map(item => item._id);
    trendChartData.value.datasets[0].data = trendData.map(item => item.count);

    // 3. Produits par statut
    const { data: statusData } = await api.get('/api/admin/stats/products-by-status');
    statusChartData.value.labels = statusData.map(item => item._id);
    statusChartData.value.datasets[0].data = statusData.map(item => item.count);

    // 4. Produits par état
    const { data: stateData } = await api.get('/api/admin/stats/products-by-state');
    stateChartData.value.labels = stateData.map(item => item._id);
    stateChartData.value.datasets[0].data = stateData.map(item => item.count);

    // 5. Produits par type de vendeur
    const { data: sellerTypeData } = await api.get('/api/admin/stats/products-by-seller-type');
    sellerTypeChartData.value.labels = sellerTypeData.map(item => item._id);
    sellerTypeChartData.value.datasets[0].data = sellerTypeData.map(item => item.count);

    // 6. Top catégories
    const { data: topCatData } = await api.get('/api/admin/stats/top-categories');
    topCategoriesChartData.value.labels = topCatData.map(item => item.categoryName);
    topCategoriesChartData.value.datasets[0].data = topCatData.map(item => item.count);

  } catch (err) {
    console.error("Erreur de chargement :", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}
h1 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 20px;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  flex: 1 1 200px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.card h2 {
  font-size: 2rem;
  color: #2563eb;
}
.card p {
  margin-top: 8px;
  font-weight: 500;
  color: #64748b;
}
.loading,
.error {
  margin-top: 20px;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
}
.loading {
  background: #fef9c3;
  color: #92400e;
}
.error {
  background: #fee2e2;
  color: #991b1b;
}
</style>
