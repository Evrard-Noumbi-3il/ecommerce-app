<template>
  <div>
    <h1>🚩 Produits signalés</h1>

    <table class="table">
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
          <td>{{ p.status }}</td>
          <td>
            <button class="btn validate" @click="validateProduct(p._id)">✅ Valider</button>
            <button class="btn delete" @click="deleteProduct(p._id)">❌ Supprimer</button>
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
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table th, .table td {
  border: 1px solid #ccc;
  padding: 10px;
}
.btn {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}
.validate {
  background: #16a34a;
  color: white;
}
.delete {
  background: #dc2626;
  color: white;
}
</style>
