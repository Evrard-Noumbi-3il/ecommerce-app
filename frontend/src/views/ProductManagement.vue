<template>
  <div class="admin-container">
    <h1>🛒 Produits</h1>
    <ProductTable :products="products"  @delete="deleteProduct"  @view="viewProduct" @toggle="toggleProduct"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductTable from "@/components/ProductTable.vue";

const products = ref([]);

// 🔄 Récupération des produits
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/admin/products");
    if (!response.ok) throw new Error("Erreur réseau");
    products.value = await response.json();
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
    const response = await fetch(`http://localhost:3000/api/admin/products/${id}/toggle`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif: nouveauStatut })
    });

    if (!response.ok) throw new Error('Erreur lors du changement de statut');

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
    const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Échec de la suppression");

    // Mise à jour locale
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
</style>
