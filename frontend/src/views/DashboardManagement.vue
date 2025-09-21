<template>
  <div class="dashboard-container">
    <h1>📊 Tableau de bord</h1>

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
    </div>

    <div class="charts">
      <h3>Évolution des publications</h3>
      <canvas id="productsChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

const stats = ref({ users: 0, products: 0, reported: 0 });

onMounted(async () => {
  const { data } = await axios.get("http://localhost:3000/api/admin/stats");
  stats.value = data;

  // Exemple graphique
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
          fill: false,
        },
      ],
    },
  });
});
</script>

<style scoped>
.dashboard-container {
  margin: 20px 0 0 200px;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}
.stats {
  display: flex;
  gap: 20px;
}
.card {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.charts {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
