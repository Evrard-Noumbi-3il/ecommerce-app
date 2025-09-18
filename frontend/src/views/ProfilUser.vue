<template>
  <div class="user-profile-container">
    <header class="profile-header">
      <h1 class="main-title">Votre compte</h1>
    </header>
    <main class="profile-main">
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône commandes" />
          </div>
          <div class="card-content">
            <h3>Vos commandes</h3>
            <p>Voir mes commandes</p>
          </div>
        </div>
      </a>
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône sécurité" />
          </div>
          <div class="card-content">
            <h3>Informations </h3>
            <p>Modifier l'adresse mail et mon tel </p>
          </div>
        </div>
      </a>
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône adresses" />
          </div>
          <div class="card-content">
            <h3>Mon adresse </h3>
            <p> Adresses de livraison </p>
          </div>
        </div>
      </a>
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône paiements" />
          </div>
          <div class="card-content">
            <h3>Vos paiements</h3>
            <p>listes de mes paiements </p>
          </div>
        </div>
      </a>
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône cartes cadeaux" />
          </div>
          <div class="card-content">
            <h3>Mes favoris</h3>
            <p>Acceder a la liste de mes favoris </p>
          </div>
        </div>
      </a>
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône messagerie" />
          </div>
          <div class="card-content">
            <h3>Ma messagerie</h3>
            <p>Consulter vos messages</p>
          </div>
        </div>
      </a>
      <a href="#" class="card-link">
        <div class="card">
          <div class="card-icon">
            <img src="#" alt="Icône contact" />
          </div>
          <div class="card-content">
            <h3>Nous contacter</h3>
            <p>Contacter nouss</p>
          </div>
        </div>
      </a>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ProfilUser',
};
</script>

<style scoped>
.user-profile-container {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.profile-header {
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 2.2em;
  font-weight: 500;
  color: #111;
  margin: 0;
}

.profile-main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px; /* Augmentation de l'espace entre les cartes */
  padding: 40px; /* Espace autour de la grille entière */
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block; /* S'assure que le lien occupe tout l'espace de la carte */
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  align-items: center;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  height: 100%; /* S'assure que toutes les cartes ont la même hauteur dans la même rangée */
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.card-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: #d4f0f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border: 1px solid #8cc5e9;
}

.card-icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  font-size: 1.1em;
  font-weight: 600;
  color: #007bff;
  margin: 0 0 5px 0;
}

.card-content p {
  font-size: 0.9em;
  color: #555;
  margin: 0;
  line-height: 1.4;
}

/* Styles pour la version mobile */
@media (max-width: 768px) {
  .profile-header {
    padding: 20px;
  }
  .main-title {
    font-size: 1.8em;
  }
  .profile-main {
    padding: 20px;
    grid-template-columns: 1fr; /* Une seule colonne sur mobile */
    gap: 16px; /* Ajustement de l'espace pour les petits écrans */
  }
}
</style>