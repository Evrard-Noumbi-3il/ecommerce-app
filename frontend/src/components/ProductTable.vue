<template>
  <table class="admin-table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Statut</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.titre }}</td>
        <td>{{ product.prix.toFixed(2) }} €</td>
        <td>
          <span :class="product.status=='active' ? 'status-active' : 'status-inactive'">
            {{ product.status=='active' ? 'Actif' : 'Inactif' }}
          </span>
        </td>
        <td class="actions">
          <button @click="$emit('view', product.id)" title="Voir détails">🔍</button>
          <button @click="$emit('toggle', product.id)" title="Activer/Désactiver">
            {{ product.actif ? '🔴' : '🟢' }}
          </button>
          <button @click="$emit('delete', product.id)" title="Supprimer">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['products']);
defineEmits(['edit', 'delete', 'view', 'toggle']);
</script>

<style scoped>
.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
}

.admin-table th,
.admin-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.admin-table tbody tr:hover {
  background-color: #f9fafb;
}

.actions button {
  margin-right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.actions button:hover {
  transform: scale(1.2);
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}
</style>