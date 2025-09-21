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
              <img :src="user.profileImage" alt="Photo de profil" class="profile-image">
              <input type="file" @change="handleImageUpload" class="file-input" accept="image/*" />
              <button class="upload-btn" @click="triggerFileInput">
                <i class="fas fa-camera"></i>
              </button>
            </div>
            <h2 class="profile-name">{{ user.name }}</h2>
            <p class="profile-email">{{ user.email }}</p>
          </div>

          <!-- Infos -->
          <div class="profile-body">
            <h3>Informations personnelles</h3>
            <div class="info-group">
              <label>Nom :</label>
              <input type="text" v-model="user.name" class="info-input">
            </div>
            <div class="info-group">
              <label>Email :</label>
              <input type="email" v-model="user.email" class="info-input">
            </div>
            <div class="info-group">
              <label>Numero de téléphone :</label>
              <input type="text" v-model="user.phone" class="info-input">
            </div>
            <div class="info-group">
              <label>Adresse :</label>
              <input type="text" v-model="user.address" class="info-input">
            </div>
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
export default {
  name: "App",
  data() {
    return {
      currentPage: 'profil',
      user: {
        name: 'Kabso',
        email: 'kabso@yema.com',
        phone: '+33 612345678',
        address: '12 rue de Paris, 87000 Limoges',
        profileImage: 'https://via.placeholder.com/150'
      },
      originalUser: {},
    };
  },
  created() {
    this.originalUser = { ...this.user };
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
    saveProfile() {
      this.originalUser = { ...this.user };
      alert('Profil sauvegardé avec succès !');
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
  margin-top: 40px; /* ✅ Décale sous la nav-bar */
}

/* Menu latéral */
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

/* Contenu */
.content {
  flex: 1;
  padding: 40px;
}

/* Section titre */
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

/* Profil */
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background: #ffffff;
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.profile-header {
  background: linear-gradient(135deg, #5dade2, #3498db);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.profile-image-container {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto 15px auto;
}

.profile-image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.file-input {
  display: none;
}

.upload-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #fff;
  color: #3498db;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
}

.profile-email {
  font-size: 14px;
  opacity: 0.9;
}

/* Corps */
.profile-body {
  padding: 30px;
}

.profile-body h3 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #2c3e50;
}

.info-group {
  margin-bottom: 20px;
}

.info-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
}

.info-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

/* Pied */
.profile-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 30px;
  border-top: 1px solid #eee;
}

.save-btn {
  padding: 12px 25px;
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
