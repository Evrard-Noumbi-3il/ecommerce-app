<template>
  <div class="dashboard-container">
    <h1> Tableau de bord</h1>

    <div v-if="loading" class="loading">Chargement des statistiques...</div>
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

      <div class="charts">
        <h3>📈 Évolution des publications</h3>
        <canvas id="productsChart"></canvas>
      </div>
    </div>

    <div v-if="error" class="error">
      ❌ Une erreur est survenue lors du chargement du tableau de bord.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

const stats = ref({
  users: 0,
  products: 0,
  reported: 0,
  orders: 0,
});
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/admin/stats");
    stats.value = data;

    // Affichage du graphique
    const ctx = document.getElementById("productsChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.chart.labels,
        datasets: [
          {
            label: "Produits publiés",
            data: data.chart.values,
            borderColor: "#3b82f6",
            backgroundColor: "#dbeafe",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
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
.charts {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.loading,
.error {
  margin-top: 20px;
  background: #fef9c3;
  color: #92400e;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
}
.error {
  background: #fee2e2;
  color: #991b1b;
}
</style>
