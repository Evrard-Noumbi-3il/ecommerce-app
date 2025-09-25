<template>
  <div class="orders">
    <h1>📦 Commandes</h1>

    <div v-if="orders.length === 0" class="empty">
      Aucune commande trouvée.
    </div>

    <table class="admin-table" v-else>
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Total</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.user?.email || 'Inconnu' }}</td>
          <td>{{ order.total.toFixed(2) }} €</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>
            <select v-model="order.status" @change="updateStatus(order)">
              <option value="pending">En attente</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </td>
          <td>
            <button class="btn view" @click="viewOrder(order)">🔍 Voir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);

const fetchOrders = async () => {
  const { data } = await axios.get("http://localhost:3000/api/admin/orders");
  orders.value = data;
};

const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric"
  });
};

const updateStatus = async (order) => {
  await axios.put(`http://localhost:3000/api/admin/orders/${order._id}/status`, {
    status: order.status
  });
  // Optionnel : refetch ou notif
};

const viewOrder = (order) => {
  console.log("Commande :", order);
  alert(`Commande #${order._id}\nTotal: ${order.total}€\nStatut: ${order.status}`);
};

onMounted(fetchOrders);
</script>

<style scoped>
.orders {
  padding: 20px;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #1e293b;
}

.empty {
  background: #fef3c7;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  color: #92400e;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.admin-table th,
.admin-table td {
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

.admin-table th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #334155;
}

select {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  font-weight: 500;
}

.btn.view {
  padding: 6px 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn.view:hover {
  background: #1d4ed8;
}
</style>
