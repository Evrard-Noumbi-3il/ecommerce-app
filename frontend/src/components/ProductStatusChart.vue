<template>
  <div class="chart-card">
    <h3>Statut des produits</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement, CategoryScale, LinearScale,
  Title, Tooltip, Legend
} from 'chart.js'
import api from '../auth/axios.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Produits',
    data: [],
    backgroundColor: ['#4caf50', '#ffc107', '#f44336']
  }]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Statut des produits'
    }
  }
})

onMounted(async () => {
  const res = await api.get('/admin/stats/products-by-status')
  const data = res.data

  chartData.value.labels = data.map(item => item._id)
  chartData.value.datasets[0].data = data.map(item => item.count)
})
</script>
