<template>
  <div class="dashboard-container">
    <h1>Tableau de bord admin</h1>

    <div v-if="loading" class="loading">Chargement des statistiques...</div>

    <div v-else>
      <!-- Stats principales -->
      <div class="stats">
        <div class="card"><h2>{{ stats.ca }} €</h2><p>Chiffre d'affaires total</p></div>
        <div class="card"><h2>{{ stats.ventes.jour }}</h2><p>Ventes du jour</p></div>
        <div class="card"><h2>{{ stats.newUsers.today }}</h2><p>Nouveaux utilisateurs aujourd'hui</p></div>
        <div class="card"><h2>{{ stats.abandonmentRate.toFixed(2) }}%</h2><p>Taux d'abandon d'annonce</p></div>
      </div>

      <!-- Graphiques -->
      <div class="charts">
        <h3>📊 Évolution des ventes par mois</h3>
          <LineChart 
            :labels="stats.salesByMonth.labels"
            :values="stats.salesByMonth.values"
            label="Ventes"
            color="#10b981"
          />

          <h3>🕒 Heures de trafic élevé</h3>
          <LineChart 
            :labels="stats.trafficByHour.labels"
            :values="stats.trafficByHour.values"
            label="Vues"
            color="#f59e0b"
          />

          <h3>📂 Catégories les plus populaires</h3>
          <ul>
            <li v-for="cat in stats.topCategories" :key="cat._id">
              {{ cat.nom }} - {{ cat.totalProduits }} produits
            </li>
          </ul>

          <h3>🔔 Types de notifications reçues</h3>
          <ul>
            <li v-for="n in stats.notificationsStats" :key="n._id">
              {{ n._id }} - Total: {{ n.total }}, Non lu: {{ n.unread }}, Lu: {{ n.read }}
            </li>
          </ul>

          <h3>👤 Top vendeurs</h3>
          <ul>
            <li v-for="seller in stats.topSellers" :key="seller._id">
              {{ seller.name }} ({{ seller.totalProduits }} annonces)
            </li>
          </ul>
      </div>
    </div>

    <div v-if="error" class="error">
      ❌ Une erreur est survenue lors du chargement du dashboard.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from '../auth/axios.js'
import LineChart from '../components/LineChart.vue';

const stats = ref({
  ca: 0,
  ventes: { jour: 0, semaine: 0, mois: 0 },
  newUsers: { today: 0, week: 0 },
  salesByMonth: { labels: [], values: [] },
  topCategories: [], // [{ nom: 'Électronique', totalProduits: 10 }]
  trafficByHour: { labels: [], values: [] }, // labels = heures
  topSellers: [], // [{ name: 'John', totalProduits: 5 }]
  abandonmentRate: 0,
  notificationsStats: [], // [{ _id: 'info', total: 5, unread: 2, read: 3 }]
});
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const { data } = await api.get('/admin/dashboard-stats');

    stats.value.ca = data.data.totalRevenue;
    stats.value.ventes = data.data.ventes;
    stats.value.newUsers = data.data.newUsers;
    stats.value.abandonmentRate = data.data.abandonmentRate;

    // Graphique ventes par mois
    stats.value.salesByMonth.labels = data.data.salesByMonth.map(d => `${d._id.month}/${d._id.year}`);
    stats.value.salesByMonth.values = data.data.salesByMonth.map(d => d.totalVentes);

    // Top catégories
    stats.value.topCategories = data.data.topCategories;

    // Traffic par heure
    stats.value.trafficByHour.labels = data.data.trafficByHour.map(d => `${d._id}h`);
    stats.value.trafficByHour.values = data.data.trafficByHour.map(d => d.vues);

    // Notifications
    stats.value.notificationsStats = data.data.notificationsStats;

    // Top vendeurs
    stats.value.topSellers = data.data.topSellers;

  } catch (err) {
    console.error("Erreur de chargement du dashboard:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});

</script>

<style scoped>
.dashboard-container { padding: 20px; background: #f9fafb; min-height: 100vh; }
h1 { font-size: 2rem; margin-bottom: 20px; color: #1f2937; }
.stats { display: flex; flex-wrap: wrap; gap: 20px; }
.card { flex: 1 1 200px; padding: 20px; background: white; border-radius: 10px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.card h2 { font-size: 2rem; color: #2563eb; }
.card p { margin-top: 8px; font-weight: 500; color: #64748b; }
.charts { margin-top: 30px; display: flex; flex-direction: column; gap: 30px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.loading, .error { margin-top: 20px; padding: 12px; border-radius: 6px; text-align: center; }
.loading { background: #fef9c3; color: #92400e; }
.error { background: #fee2e2; color: #991b1b; }
</style>
