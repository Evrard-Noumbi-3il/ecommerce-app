<template>
  <div v-if="product" class="product-info">

    <div class="product-card">

      <div class="image-box">
        <span class="badge"> <strong> {{ product.state }}</strong></span>
        <img v-if="product.images && product.images.length > 0"
          :src="product.images[0]"
          alt="Produit"
        />
        <img v-else-if="imagePreview && imagePreview.length > 0"
          :src="imagePreview[0]"
          alt="Produit preview"
          class="product-image"
        />
        <button class="fav" @click.stop="toggleFavorite(product._id)" >
            <svg viewBox="0 0 24 19" width="20" height="20">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
        </button>
      </div>

      <div class="info-box">
        <div v-if="userSeller">
          {{userSeller.name}} {{ userSeller.firstname }}
        <br><small>{{ product.sellerType }}</small>
        </div>

        <p>Note</p>
        <h2>2,9 ★</h2>

        <div class="actions">
          <button>Évaluer</button>
          <button
          @click="$emit('open-contact')"
          >
          Contacter
        </button>
        </div>

      </div>

    </div>

    <div class="product-info-details">

      <div class="product-info-without-comments">
        <div v-if="category" class="product-title-theme">
          <h1>{{ product.titre }}</h1>
          <p>{{ product.theme }} ->  {{ category.nom }}</p>
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
        <div class="product-description">
        </div>
        <h2>Description</h2>
        <p>{{ product.description }}</p>
      </div>

      <div class="comments-seller">
        <div class="content-comments" >
          <h2>Avis</h2>
          <div v-if ="avis !== null && avis.length > 0">
            <div 
              class="user-comments"
              v-for ="avisItem in avis"
              :key="avisItem._id"
              >
              <div class="username-and-rating">
                <p>{{avisItem.userSend.name}} {{ avisItem.userSend.firstname }}</p>
                <p>{{avisItem.note}}★   {{formatDateParts(avisItem.createdAt).date}}</p>
              </div>
              <div class="message-comments">
                  <p>{{ avisItem.comments }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Aucun avis pour le moment.</p>
          </div>
        </div>
      </div>

  </div>

</div>
</template>

<script setup>
 import axios from "axios";

defineProps({
  product: {
    type: Object,
    required: true,
  },
  imagePreview: {
    type: Object,

  },
  userSeller: {
    type: Object,
    required: true,
  },
  category: {
    type: Object,
    required: true,
  },
<<<<<<< HEAD

})


  const toggleFavorite = (id) => {
    console.log("Toggle favorite for:", id);
=======
  avis:{
    type : Array,
    required : true,
  }

})

  const toggleFavorite = async (id) => {
    try {
      
      const token = localStorage.getItem("token");
      const idUser = JSON.parse(atob(token.split('.')[1])).id;
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/favoris/addFavori`, {id_produit: id , id : idUser});
      console.log(response.data.message);
      
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
      
    }
    
>>>>>>> ce8299a39dbbcf5fc591b87957b1da59e0a323e3
  };

  const formatDateParts = async (dateStr) => {
        const date = new Date(dateStr);
        const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return {
            date: date.toLocaleDateString('fr-FR', optionsDate)
        };
    }





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
  grid-template-columns: 75% 35%;
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
  gap : 23%;
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

.product-description{
  border-top: 1px solid #0D1B2A;
  width: 30%;
  margin-left: 14%;
  margin-top: 30px;
}


.product-info-details{
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.comments-seller{
  border-left: 1px solid #0D1B2A;
  margin-top : 30px;


  .content-comments{
    padding-left: 40px;
     .username-and-rating{
      line-height: 0.3;
     }
     .message-comments{
      border-bottom-left-radius: 45px;
      border-bottom-right-radius: 45px;
      border-top-right-radius: 45px;
      padding: 10px;
      width: 300px;
      height: auto;
      word-wrap: break-word;
      background-color: #D9D9D9;

    }


  }
}

.product-delivery-publish-info{
  line-height: 0.3;
  margin-top: 20px;
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
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  padding: 5;
  cursor: pointer;
}

.fav:hover{
  background: white;
  color: #FDBF37;
  transform: scale(1.1);
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
