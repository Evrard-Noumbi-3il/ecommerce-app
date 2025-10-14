<template>
  <div class="admin-container">
    <h1>🛒 Produits</h1>
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
            <span :class="product.actif ? 'status-active' : 'status-inactive'">
              {{ product.actif ? 'Actif' : 'Inactif' }}
            </span>
          </td>
          <td class="actions">
            <button @click="viewProduct(product.id)" title="Voir détails">🔍</button>
            <button @click="toggleProduct(product.id)" title="Activer/Désactiver">
              {{ product.actif ? '🔴' : '🟢' }}
            </button>
            <button @click="deleteProduct(product.id)" title="Supprimer">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../auth/axios.js";

const products = ref([]);

// 🔄 Récupération des produits
const fetchData = async () => {
  try {
    const response = await api.get('/admin/products');
    products.value = response.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
  }
};

const viewProduct = (id) => {
  const product = products.value.find(p => p.id === id);
  if (product) {
    alert(`Produit : ${product.titre}\nPrix : ${product.prix} €`);
    // ou afficher dans une section dédiée
  }
};

const toggleProduct = async (id) => {
  const product = products.value.find(p => p.id === id);
  if (!product) return;

  const nouveauStatut = !product.actif;

  try {
    const response = await api.patch(`/admin/products/${id}/toggle`, { actif: nouveauStatut });
    if (response.status !== 200) throw new Error('Erreur lors du changement de statut');
    product.actif = nouveauStatut; // mise à jour locale
  } catch (error) {
    console.error('Erreur toggle:', error);
  }
};

// 🗑️ Supprimer un produit
const deleteProduct = async (id) => {
  const confirmDelete = window.confirm("Confirmer la suppression du produit ?");
  if (!confirmDelete) return;

  try {
    const response = await api.delete(`/admin/products/${id}`);
    if (response.status !== 200) throw new Error("Échec de la suppression");
    products.value = products.value.filter(p => p.id !== id);
    console.log("Produit supprimé avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.admin-container {
  margin-top: 50px;
}

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