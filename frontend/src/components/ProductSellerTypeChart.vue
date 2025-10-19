<template>
  <div class="chart-card">
    <h3>Type de vendeur</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend
} from 'chart.js'
import api from '../auth/axios.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = ref({
  labels: ['Particulier', 'Professionnel'],
  datasets: [{
    label: 'Vendeur',
    data: [],
    backgroundColor: ['#36a2eb', '#ff6384']
  }]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Répartition par type de vendeur'
    }
  }
})

onMounted(async () => {
  const res = await api.get('/admin/stats/products-by-seller-type')
  const data = res.data

  chartData.value.datasets[0].data = data.map(item => item.count)
})
</script>
