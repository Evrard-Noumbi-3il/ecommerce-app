<template>
  <div class="chart-card">
    <h3>Catégories les plus populaires</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement, CategoryScale, LinearScale,
  Tooltip, Legend
} from 'chart.js'
import api from '../auth/axios.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Top catégories',
    data: [],
    backgroundColor:  ['#FF6384', '#36A2EB', '#FFCE56']
  }]
})

const chartOptions = ref({
  indexAxis: 'y', // pour barres horizontales
  responsive: true
})

onMounted(async () => {
  const res = await api.get('/admin/stats/top-categories')
  const data = await res.data

  chartData.value.labels = data.map(item => item.categoryName)
  chartData.value.datasets[0].data = data.map(item => item.count)
})
</script>
