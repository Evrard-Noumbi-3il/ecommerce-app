<template>
  <div class="product-view">
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">{{ error }}</div>
    <ProductCard
      v-else
      :product="product"
      :userSeller="userSeller"
      :category="category"
      :avis="avis"
      @open-contact="showContactModal"
      @open-evaluation="showEvaluationModal"
      @open-paiement="showPaiementModal"
    />
  </div>

  <EvaluationModal
    v-if="showEvaluation"
    :userSeller="userSeller"
    @close-evaluation="showEvaluation = false"
  />
  <PaiementModal
    v-if="showPaiement"
    :product="product"
    @close-paiement="showPaiement = false"
  />
  <ContactModal
    :userSellerId="userSeller._id"
    v-if="showContact"
    @close-Contact="showContact = false"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import ProductCard from "../components/ProductCard.vue";
import ContactModal from "../components/ContactModal.vue";
import EvaluationModal from "@/components/EvaluationModal.vue";
import PaiementModal from "@/components/PaiementModal.vue";
import OfferModal from "@/components/OfferModal.vue";

const route = useRoute();
const productId = route.params.id;

const product = ref(null);
const userSeller = ref(null);
const category = ref(null);
const avis = ref([]);

const message = ref({
  text: "",
  type: "",
});

const showContact = ref(false);
const showOffer = ref(false);
const showEvaluation = ref(false);
const showPaiement = ref(false);

const loading = ref(true);
const error = ref(null);

const fetchProduct = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );
    console.log("Réponse product :", response.data);
    product.value = response.data;
  } catch (error) {
    console.error("Produit introuvable : ", error);
  } finally {
    loading.value = false;
  }
};

const fetchUserProductSeller = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/user/${id}`
    );
    console.log("Réponse userSeller :", response.data);
    userSeller.value = response.data;
    console.log("ID du vendeur :", userSeller.value._id);

    const responseAvis = await axios.get(
      `http://localhost:3000/api/avis/user/${userSeller.value._id}`
    );
    avis.value = responseAvis.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

const fetchProductCategory = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/category/${id}`
    );
    console.log("Réponse cate :", response.data);
    category.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
};

const verifyToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

const showContactModal = () => {
  if (!verifyToken()) {
    message.value = {
      text: "Vous devez être connecté pour contacter le vendeur.",
      type: "error",
    };
    setTimeout(() => {
      message.value = { text: "", type: "" };
    }, 1200);
  } else {
    showContact.value = true;
  }
};

const showEvaluationModal = () => {
  if (!verifyToken()) {
    message.value = {
      text: "Vous devez être connecté pour laisser une évaluation.",
      type: "error",
    };
    setTimeout(() => {
      message.value = { text: "", type: "" };
    }, 1200);
  } else {
    showEvaluation.value = true;
  }
};
const showPaiementModal = () => {
  if (!verifyToken()) {
    message.value = {
      text: "Vous devez être connecté pour effectuer un paiement.",
      type: "error",
    };
    setTimeout(() => {
      message.value = { text: "", type: "" };
    }, 1200);
  } else {
    showPaiement.value = true;
  }
};

onMounted(async () => {
  await Promise.all([fetchProductCategory(productId), fetchProduct(productId)]);
  await fetchUserProductSeller(productId);
});
</script>

<style scoped>
.all {
  justify-content: center;
  .notConnected-message {
    position: fixed;
    top: 20px;
    z-index: 10001;
    left: 50%;
    transform: translateX(-50%);
  }
}
.product-view {
  padding-top: 120px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-self: center;
}

.notConnected-message {
  padding: 10px 14px;
  border-radius: 7px;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  display: inline-block;
}
.notConnected-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}
.notConnected-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}
</style>
