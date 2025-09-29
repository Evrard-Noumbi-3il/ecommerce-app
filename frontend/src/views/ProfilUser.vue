<template>
  <div class="app-container">
    <!-- Menu latéral -->
    <div class="menu">
      <button :class="{'active': currentPage === 'profil'}" @click="currentPage = 'profil'">
        <i class="fas fa-id-card"></i> Mon Profil
      </button>
      <button :class="{'active': currentPage === 'messages'}" @click="currentPage = 'messages'">
        <i class="fas fa-comment-dots"></i> Messages
      </button>
      <button :class="{'active': currentPage === 'notifications'}" @click="currentPage = 'notifications'">
        <i class="fas fa-exclamation-circle"></i> Alertes
      </button>
    </div>

    <!-- Contenu principal -->
    <div class="content">
      <div class="content-scroll">
        
        <!-- Page Profil -->
        <div v-if="currentPage === 'profil'" class="profile-layout-v4">
          <h2 class="page-title-v4"><i class="fas fa-user-shield"></i> Mon Profil</h2>

          <div class="main-profile-card">
            <div class="card-content-v4">

              <!-- Mode Carte de Visite -->
              <div v-if="!isEditing" class="business-card">
                <div class="card-header-v4">
                  <div class="profile-image-container-v4">
                    <img v-if="user.profileImage" :src="user.profileImage" alt="Photo de profil" class="profile-image-v4">
                    <div v-else class="default-avatar-v4">
                      <i class="fas fa-user-circle"></i>
                    </div>
                  </div>
                  <div class="profile-text-v4">
                    <h1 class="profile-name-v4">{{ user.name }}</h1>
                    <p><i class="fas fa-phone"></i> {{ user.phone || 'Non renseigné' }}</p>
                    <p><i class="fas fa-map-marker-alt"></i> {{ user.address || 'Non renseigné' }}</p>
                  </div>
                </div>
                <div class="card-footer-v4">
                  <button @click="isEditing = true" class="action-btn-v4">
                    <i class="fas fa-edit"></i> Modifier
                  </button>
                </div>
              </div>

              <!-- Mode Edition (Formulaire complet) -->
              <div v-else>
                <div class="card-header-v4">
                  <div class="profile-image-container-v4">
                    <img v-if="user.profileImage" :src="user.profileImage" alt="Photo de profil" class="profile-image-v4">
                    <div v-else class="default-avatar-v4">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <input type="file" @change="handleImageUpload" class="file-input" accept="image/*" />
                    <button class="upload-btn-v4" @click="triggerFileInput" title="Changer de photo">
                      <i class="fas fa-camera"></i>
                    </button>
                  </div>
                </div>

                <div class="details-grid-v4">
                  <div class="detail-item-v4">
                    <label><i class="fas fa-user"></i> Nom/Pseudo</label>
                    <input type="text" v-model="user.name" class="profile-input" />
                  </div>
                  <div class="detail-item-v4">
                    <label><i class="fas fa-envelope"></i> E-mail</label>
                    <input type="email" v-model="user.email" class="profile-input" />
                  </div>
                  <div class="detail-item-v4">
                    <label><i class="fas fa-phone"></i> Téléphone</label>
                    <input type="text" v-model="user.phone" class="profile-input" />
                  </div>
                  <div class="detail-item-v4 full-width-v4">
                    <label><i class="fas fa-map-marker-alt"></i> Adresse</label>
                    <input type="text" v-model="user.address" class="profile-input" />
                  </div>
                </div>

                <div class="card-footer-v4">
                  <button @click="saveAndClose" class="action-btn-v4">
                    <i class="fas fa-save"></i> Sauvegarder
                  </button>
                  <button @click="isEditing = false" class="cancel-btn-v4">
                    <i class="fas fa-times"></i> Annuler
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Page Messages -->
        <div v-if="currentPage === 'messages'">
          <h2 class="page-title-v4"><i class="fas fa-comment-dots"></i> Mes Messages</h2>
          <div class="empty-state-v4">
            <p>Pas de nouveaux messages. Gardez l'œil ouvert !</p>
          </div>
        </div>

        <!-- Page Notifications -->
        <div v-if="currentPage === 'notifications'">
          <h2 class="page-title-v4"><i class="fas fa-exclamation-circle"></i> Mes Alertes</h2>
          <div class="empty-state-v4">
            <p>Vous n'avez aucune alerte importante en attente.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProfileUser",
  data() {
    return {
      currentPage: 'profil',
      isEditing: false,
      user: {
        name: 'toto',
        email: '',
        phone: '',
        address: '',
        profileImage: null 
      },
      userFile: null, 
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    triggerFileInput() {
      this.$el.querySelector('.file-input').click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.userFile = file; 
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profileImage = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    },
    async saveAndClose() {
      await this.saveProfile();
      this.isEditing = false;
    },
    async saveProfile() {
      try {
        const formData = new FormData();
        formData.append('name', this.user.name);
        formData.append('email', this.user.email);
        formData.append('phone', this.user.phone);
        formData.append('address', this.user.address);
        if (this.userFile) {
          formData.append('profilePhoto', this.userFile); 
        }
        await axios.put('http://localhost:3000/api/user/me', formData, {});
        alert('Profil sauvegardé avec succès !');
        this.userFile = null; 
      } catch (err) {
        console.error('Erreur lors de la sauvegarde du profil:', err);
        alert('Erreur lors de la sauvegarde du profil');
      }
    },
    async fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const id = token && (JSON.parse(atob(token.split('.')[1])).id);
        const res = await axios.get(`http://localhost:3000/api/user/me/${id}`);
        const data = res.data;
        this.user.name = data.name || "titi";
        this.user.email = data.email;
        this.user.phone = data.phonenumber || '';
        this.user.address = data.adresse?.rue || '';
        this.user.profileImage = data.photo || null;
      } catch (err) {
        console.error('Erreur récupération profil:', err);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

:root {
  --main-color: #047857;
  --secondary-color: #f9fafb;
  --text-dark: #1f2937; 
  --text-muted: #6b7280;
}

.app-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--secondary-color);
  font-family: 'Poppins', sans-serif;
  margin-top:40px;
  mrgin:100px;
}

/* MENU LATÉRAL */
.menu {
  width: 250px;
  background-color: white;
  padding: 30px 0;
  box-shadow: 4px 0 10px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.menu button {
  background: none;
  border: none;
  color: var(--text-dark);
  text-align: left;
  padding: 18px 30px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 15px;
  cursor: pointer;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.menu button:hover {
  background-color: #f3f4f6;
}

.menu button.active {
  background-color: #e6e6e6;
  border-left-color: var(--main-color);
  color: var(--main-color);
  font-weight: 600;
}

/* CONTENU PRINCIPAL */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-scroll {
  padding: 40px;
  overflow-y: auto;
}

.page-title-v4 {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

/* CARTE DE VISITE */
.business-card {
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.business-card .card-header-v4 {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-image-container-v4 {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  flex-shrink: 0;
}

.profile-image-v4 {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-avatar-v4 {
  font-size: 70px;
  color: var(--main-color);
}

.profile-text-v4 {
  flex: 1;
}

.profile-name-v4 {
  font-size: 1.6em;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--text-dark);
}

.profile-text-v4 p {
  margin: 5px 0;
  color: var(--text-muted);
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* FORMULAIRE */
.details-grid-v4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.detail-item-v4 label {
  display: block;
  font-size: 0.9em;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 5px;
}

.profile-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1em;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: white;
  transition: box-shadow 0.2s;
}

.profile-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px #c7d2fe;
}

.full-width-v4 {
  grid-column: 1 / -1;
}

/* BOUTONS */
.action-btn-v4 {
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  background-color: var(--main-color);
  color: #facc15; /* texte jaune */
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 5px;
}

.action-btn-v4:hover,
.action-btn-v4:active {
  transform: scale(0.97);
}

/* bouton annuler gris avec texte blanc */
.cancel-btn-v4 {
  background-color: #6b7280;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 5px;
}

.cancel-btn-v4:hover,
.cancel-btn-v4:active {
  transform: scale(0.97);
}
</style>
