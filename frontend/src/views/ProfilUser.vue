<template>
  <div class="app-container">
    <!-- Menu latéral -->
    <div class="menu">
      <button :class="{'active': currentPage === 'profil'}" @click="currentPage = 'profil'">
        <i class="fas fa-user"></i> Mon Profil
      </button>
      <button :class="{'active': currentPage === 'messages'}" @click="currentPage = 'messages'">
        <i class="fas fa-envelope"></i> Mes Messages
      </button>
      <button :class="{'active': currentPage === 'notifications'}" @click="currentPage = 'notifications'">
        <i class="fas fa-bell"></i> Mes Notifications
      </button>
    </div>

    <!-- Contenu principal -->
    <div class="content">
      <!-- Profil -->
      <div v-if="currentPage === 'profil'" class="profile-wrapper">
        <div class="profile-card">
          <!-- En-tête avec photo -->
          <div class="profile-header">
            <div class="profile-image-container">
              <div v-if="!user.profileImage" class="default-avatar">
                <i class="fas fa-user"></i>
              </div>
              <img v-else :src="user.profileImage" alt="Photo de profil" class="profile-image">
              <input type="file" @change="handleImageUpload" class="file-input" accept="image/*" />
              <button class="upload-btn" @click="triggerFileInput">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <h2 class="profile-name">{{ user.name }}</h2>
            <p class="profile-email">{{ user.email }}</p>
          </div>

          <!-- Infos -->
          <div class="profile-body">
            <h3>Informations personnelles</h3>
            <p><strong>Nom :</strong> {{ user.name }}</p>
            <p><strong>Email :</strong> {{ user.email }}</p>
            <p><strong>Numéro :</strong> {{ user.phone }}</p>
            <p><strong>Adresse :</strong> {{ user.address }}</p>
          </div>

          <!-- Actions -->
          <div class="profile-footer">
            <button @click="saveProfile" class="save-btn"><i class="fas fa-save"></i> Modifier</button>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div v-if="currentPage === 'messages'">
        <h2 class="section-title"><i class="fas fa-envelope"></i> Mes Messages</h2>
        <p>Bienvenue dans votre boîte de réception. Aucun nouveau message.</p>
      </div>

      <!-- Notifications -->
      <div v-if="currentPage === 'notifications'">
        <h2 class="section-title"><i class="fas fa-bell"></i> Mes Notifications</h2>
        <p>Vous n’avez aucune notification pour l’instant.</p>
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
      user: {
        name: '',
        email: '',
        phone: '',
        address: '',
        profileImage: null 
      },
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
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async saveProfile() {
      try {
        await axios.put('/api/user/me', {
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
          address: this.user.address
        });
        alert('Profil sauvegardé avec succès !');
      } catch (err) {
        alert('Erreur lors de la sauvegarde du profil');
      }
    },
    async fetchUser() {
      try {

        const token = localStorage.getItem("token");
        const id = token && (JSON.parse(atob(token.split('.')[1]))._id);
        const res = await axios.get('/api/user/me');
        const data = res.data;

        this.user.name = data.name;
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.app-container {
  display: flex;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  background-color: #f0f3f7;
  margin-top: 50px;
}

.menu {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.menu button {
  background: none;
  border: none;
  color: #ecf0f1;
  text-align: left;
  padding: 15px 25px;
  margin: 5px 0;
  font-size: 16px;
  cursor: pointer;
  border-left: 4px solid transparent;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: 0.3s;
}

.menu button:hover {
  background-color: #34495e;
  border-left-color: #5dade2;
}

.menu button.active {
  background: #34495e;
  border-left-color: #5dade2;
  font-weight: 500;
  color: #5dade2;
}

.content {
  flex: 1;
  padding: 40px;
}

.section-title {
  font-size: 1.8em;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.profile-header {
  background: linear-gradient(135deg, #9cb6c8ff, #5f6a71ff);
  color: white;
  padding: 30px 20px;
  text-align: center;
}

.profile-image-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 15px auto;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.default-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  border: 3px solid white;
  margin: 0 auto;
}

.file-input {
  display: none;
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  color: #4a4d4fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name {
  font-size: 22px;
  font-weight: 700;
}

.profile-email {
  font-size: 14px;
  opacity: 0.9;
}

.profile-body {
  padding: 20px;
}

.profile-body h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: #2c3e50;
}

.profile-body p {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

.profile-footer {
  display: flex;
  justify-content: center;
  padding: 15px;
  border-top: 1px solid #eee;
}

.save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

.save-btn:hover {
  background-color: #2e86c1;
}
</style>
