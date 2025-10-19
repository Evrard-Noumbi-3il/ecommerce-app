<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement obligatoire des controllers et éléments
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend);

const props = defineProps({
  labels: { type: Array, default: () => [] },
  values: { type: Array, default: () => [] },
  label: { type: String, default: 'Dataset' },
  color: { type: String, default: '#3b82f6' },
});

const chartCanvas = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (chartInstance) chartInstance.destroy(); // détruit l'ancienne instance

  chartInstance = new Chart(chartCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.values,
          borderColor: props.color,
          backgroundColor: props.color + '33', // couleur transparente
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { display: true } },
    },
  });
};

onMounted(renderChart);

// Mettre à jour le graphique si les props changent
watch([() => props.labels, () => props.values], renderChart);

// Nettoyage à la destruction
onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>
