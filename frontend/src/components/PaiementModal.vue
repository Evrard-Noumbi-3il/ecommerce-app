<template>
  <div class="container" @click.self="$emit('close-paiement')">
    <div class="modal-content">
      <h2>Paiement</h2>
      <div class="checkout-form">
        <div class="customer-info">
          <h2>Informations client</h2>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="votre@email.com"
            />
            <div class="error-message" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
        </div>

        <div class="payment-section">
          <h2>Paiement</h2>
          <!-- Stripe Payment Element will be inserted here -->
          <div id="payment-element" ref="paymentElement"></div>
          <div class="error-message" v-if="paymentError">
            {{ paymentError }}
          </div>

          <button
            class="pay-button"
            @click="handleSubmit"
            :disabled="isPaymentProcessing"
          >
            <div class="spinner" v-if="isPaymentProcessing"></div>
            <span v-if="isPaymentProcessing">Traitement...</span>
            <span v-else>Payer {{ product.prix }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripe = ref(null);
const elements = ref(null);
const clientSecret = ref("");
const email = ref("");
const isPaymentProcessing = ref(false);
const paymentError = ref("");
const errors = ref({
  email: "",
});

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  // 1. Charger Stripe.js
  stripe.value = await loadStripe(
    "pk_test_51SJj8k2XxI6uv09mhTeZcAaJASiERreKW4cPjWC5fazmDKeRRvYOcuwsS4V77seK8U7PPhNZEXOcMJm8lxIv1G0U008df0uH5i"
  );

  // 2. Créer une session de paiement sur votre serveur
  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/paiement/create-checkout-session`,
      {
        titre: props.product.titre,
        description: props.product.description,
        prix: props.product.prix,
        location: props.product.location,
        currency: "eur",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await response.data;
    clientSecret.value = data.clientSecret;

    // 3. Initialiser les éléments Stripe avec le client secret
    elements.value = stripe.value.elements({
      clientSecret: clientSecret.value,
      appearance: {
        theme: "stripe",
        variables: {
          colorPrimary: "#6772e5",
          colorBackground: "#ffffff",
          colorText: "#32325d",
          colorDanger: "#df1b41",
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          borderRadius: "4px",
        },
      },
    });

    // 4. Monter l'élément de paiement
    const paymentElement = elements.value.create("payment", {
      layout: "tabs",
    });

    paymentElement.mount("#payment-element");
  } catch (error) {
    console.error("Erreur d'initialisation:", error);
    paymentError.value =
      "Impossible de charger le formulaire de paiement. Veuillez réessayer.";
  }
});

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    errors.value.email = "L'email est requis";
  } else if (!emailRegex.test(email)) {
    errors.value.email = "Veuillez entrer un email valide";
  } else {
    errors.value.email = "";
  }
};

const handleSubmit = async () => {
  if (errors.value.email) {
    return;
  }

  isPaymentProcessing.value = true;
  paymentError.value = "";

  try {
    if (!stripe.value || !elements.value) {
      throw new Error("Stripe n'est pas initialisé correctement");
    }

    // Mise à jour de l'email sur la session
    await elements.value.submit();

    // Soumettre le paiement
    const { paymentIntent, error } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        receipt_email: email.value,
      },
      redirect: "if_required",
    });

    // S'il y a une erreur immédiate lors de la confirmation
    if (error) {
      throw new Error(error.message);
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      alert("✅ Paiement réussi !");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (paymentIntent && paymentIntent.status === "processing") {
      alert("⏳ Paiement en cours de traitement...");
    } else if (
      paymentIntent &&
      paymentIntent.status === "requires_payment_method"
    ) {
      alert("❌ Le paiement a échoué. Veuillez réessayer.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert(`⚠️ Statut inattendu : ${paymentIntent?.status}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } catch (error) {
    console.error("Erreur de paiement:", error);
    paymentError.value =
      error.message ||
      "Une erreur s'est produite lors du traitement du paiement.";
    isPaymentProcessing.value = false;
  }
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.container {
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  overflow-y: scroll;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  margin-top: 10%;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.checkout-form {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.customer-info {
  margin-bottom: 30px;
}

.customer-info h2 {
  color: #32325d;
  font-size: 18px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #525f7f;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 16px;
}

.payment-section h2 {
  color: #32325d;
  font-size: 18px;
  margin-bottom: 15px;
}

#payment-element {
  margin-bottom: 24px;
}

.pay-button {
  background-color: #fdbf37;
  color: #0d1c2b;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  width: 100%;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.pay-button:hover {
  background-color: #5469d4;
}

.pay-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #df1b41;
  font-size: 14px;
  margin-top: 5px;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
