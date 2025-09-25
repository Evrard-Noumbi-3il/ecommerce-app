<template>
  <div class="product-info">

    <div class="product-card">

      <div class="image-box">
        <span class="badge">NEUF</span>
        <img :src="product.images[0]" alt="Produit">
        <button class="fav">♥</button>
      </div>

      <div class="info-box">
        <div>
          Levendeur
         <br><small>Particulier</small>
        </div>
        
        <p>Note</p>
        <h2>2,9 ★</h2>

        <div class="actions">
          <button>Évaluer</button>
          <button>Contacter</button>
        </div>

      </div>

    </div>
    
    <div class="product-info-details">

      <div class="product-title-theme">
        <h1>{{ product.titre }}</h1>
        <p>{{ product.theme }} -> test</p>
      </div>
      
      <div class="product-buy-row">
        
        <div class="product-direct-buy-row">
          <h2 class="product-price">{{ product.prix }} €</h2>
          <button class="direct-buy-button">Payer</button>
        </div>
        <button class="offer-button">faire une offre</button>
      </div>

      <div class="product-delivery-publish-info">
        <p>Publié le {{ new Date(product.date).toLocaleDateString() }} - {{ product.location }}</p>
        <p>Livraison estimée en 2-3 jours ouvrables*</p>
      </div>

      <h2>Description</h2>
      <p>{{ product.description }}</p>

      
    </div>

  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap');
*{
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.product-info {
  display: flex;  
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 60%;  
}
.product-card {
  display: grid;
  grid-template-columns: 75% 25%;
  width: 100%;
  height: auto;
  border-radius:20px ;
  background: #FDBF37;
}

.product-title-theme{
  line-height: 0.3;
  p{
    padding-left: 5px;
    color :#777777;
  }
}


.product-buy-row{
  display: flex;
  gap : 6%;
  margin-top: 20px; 
  .product-direct-buy-row{
    display: flex;
    
    border-radius: 45px;
    background-color: #0d1c2b;

  
    .product-price{
      color : #0D1B2A;
      background-color: #FABA20;
      
      margin:0;
      border-radius:  45px ;
      padding: 10px 20px;

    }

    .direct-buy-button{
      background: none;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1;

      height: 100%;
      align-self: center;
      padding: 10px 20px;
    
    }

 }

 .offer-button{
    border: none;

    color : white;
    background-color: #0D1B2A;

    border-radius: 45px;
    padding: 10px;

    cursor: pointer;

  }

}


.product-delivery-publish-info{
  line-height: 0.3;
  p{
    padding-left: 5px;
    color :#777777;
  }
}

/* Partie image */
.image-box {
  position: relative;
  background: #FDBF37;
  border-radius:20px ;

  box-shadow: 0 0 8px rgba(0, 0, 0); 
  height: 250px;
}
.image-box img {
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 20px;
  object-fit: cover;
}
.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #FDBF37;
  border-radius: 12px;
  padding: 5px 11px;
  font-size: 12px;
}
.fav {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FDBF37;
  border: none;
  border-radius: 50%;
  padding: 5;
  cursor: pointer;
}

/* Partie jaune */
.info-box {
  background: #FDBF37;
  display: flex;
  padding: 30px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
}
.info-box h3 {
  margin: 0;
}
.info-box small {
  font-size: 12px;
  color: #444;
}
.info-box h2 {
  font-size: 40px;
  margin: 5px 0;
}
.actions {
  margin-top: auto;
  display: flex;
  gap: 10px;
}
.actions button {
  background: #0d2235;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  cursor: pointer;
}


</style>
