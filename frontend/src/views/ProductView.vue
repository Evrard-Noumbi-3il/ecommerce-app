<template>

  <div class="product-view">

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">{{ error }}</div>
    <ProductCard v-else
     :product="product"
     :userSeller="userSeller"
     :category="category"
     :avis="avis"
     @open-contact="showContact = true"
    />
  </div>

  <ContactModal  v-if="showContact"  @close-Contact="showContact = false"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import ProductCard from "../components/ProductCard.vue";
import ContactModal from "../components/ContactModal.vue";

const route = useRoute();
const productId = route.params.id;

const product = ref(null);
const userSeller = ref(null);
const category = ref(null);
const showContact = ref(false);
const avis = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/${id}`);
    product.value = response.data
  } catch (error) {
    console.error("Produit introuvable : ", error)
  }finally {
        loading.value = false;
    }
};

const fetchUserProductSeller = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/user/${id}`);
    userSeller.value = response.data;
    const responseAvis = await axios.get(`http://localhost:3000/api/avis/user/${userSeller.value._id}`);
    avis.value = responseAvis.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

const fetchProductCategory = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/category/${id}`);
    category.value = response.data;

  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
};



onMounted(() => {
  fetchProductCategory(productId);
  fetchUserProductSeller(productId);
  fetchProduct(productId);
})
</script>

<style scoped>
.product-view {
  padding-top: 120px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-self: center;
}
</style>
