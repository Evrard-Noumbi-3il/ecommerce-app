<template>
  <div class="overlay">
    <div class="modal">
      <h3>Session expirée</h3>
      <p>Votre session a expiré. Veuillez vous reconnecter.</p>
      <button @click="$emit('close')">Se reconnecter</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal {
  background: white;
  border-radius: 10px;
  padding: 30px 40px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}
button {
  margin-top: 20px;
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  background: #1e40af;
}
</style>
