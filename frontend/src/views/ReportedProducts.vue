<template>
  <div class="reported-products">
    <h1>🚩 Produits signalés</h1>

    <div v-if="products.length === 0" class="empty">Aucun produit signalé pour le moment.</div>

    <table class="admin-table" v-else>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Vendeur</th>
          <th>État</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p._id">
          <td>{{ p.titre }}</td>
          <td>{{ p.seller?.email || "Inconnu" }}</td>
          <td>
            <span :class="['status', p.status]">
              {{ p.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-validate" @click="validateProduct(p._id)">✅ Valider</button>
            <button class="btn btn-delete" @click="deleteProduct(p._id)">❌ Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:3000/api/admin/reported-products");
  products.value = data;
};

const validateProduct = async (id) => {
  await axios.put(`http://localhost:3000/api/admin/products/${id}/validate`);
  fetchProducts();
};

const deleteProduct = async (id) => {
  await axios.delete(`http://localhost:3000/api/admin/products/${id}`);
  fetchProducts();
};

onMounted(fetchProducts);
</script>

<style scoped>
.reported-products {
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

.status {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status.pending {
  background-color: #facc15;
  color: #78350f;
}
.status.validated {
  background-color: #4ade80;
  color: #065f46;
}
.status.rejected {
  background-color: #f87171;
  color: #7f1d1d;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.btn-validate {
  background-color: #16a34a;
  color: white;
}
.btn-validate:hover {
  background-color: #15803d;
}

.btn-delete {
  background-color: #dc2626;
  color: white;
}
.btn-delete:hover {
  background-color: #b91c1c;
}
</style>
