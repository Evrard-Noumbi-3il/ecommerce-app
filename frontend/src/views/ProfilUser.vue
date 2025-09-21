<template>
  <div class="app-container">
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

    <div class="content">
      <div v-if="currentPage === 'profil'">
        <h2 class="section-title"><i class="fas fa-user-circle"></i> Mon Profil</h2>
        <div class="profile-card">
          <div class="profile-image-container">
            <img :src="user.profileImage" alt="Photo de profil" class="profile-image">
            <input type="file" @change="handleImageUpload" class="file-input" accept="image/*" />
            <button class="upload-btn" @click="triggerFileInput"><i class="fas fa-camera"></i></button>
          </div>
          <div class="profile-info">
            <div class="info-group">
              <label>Nom :</label>
              <input type="text" v-model="user.name" class="info-input">
            </div>
            <div class="info-group">
              <label>Email :</label>
              <input type="email" v-model="user.email" class="info-input">
            </div>
            <div class="actions">
              <button @click="saveProfile" class="save-btn"><i class="fas fa-save"></i> Modifier profile</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentPage === 'messages'">
        <h2 class="section-title"><i class="fas fa-envelope"></i> Mes Messages</h2>
        <p>Bienvenue dans votre boîte de réception. Aucun nouveau message.</p>
      </div>

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
        name: 'kabso',
        email: 'kabso@yema.com',
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
      alert('Profil enregistré avec succès !');
    },
    resetProfile() {
      this.user = { ...this.originalUser };
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.app-container {
  display: flex;
  min-height: 80vh;
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7f9;
  margin-top: 40px;
}

.menu {
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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
  transition: background 0.3s, color 0.3s;
  border-left: 4px solid transparent;
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu button:hover {
  background-color: #34495e;
  border-left-color: #1abc9c;
}

.menu button.active {
  background: #34495e;
  border-left-color: #1abc9c;
  font-weight: 500;
  color: #1abc9c;
}

.menu button i {
  width: 20px;
  text-align: center;
}

.content {
  flex: 1;
  padding: 40px;
  background: #f4f7f9;
}

.section-title {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-card {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1abc9c;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.file-input {
  display: none;
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #16a085;
}

.profile-info {
  width: 100%;
  max-width: 500px;
}

.info-group {
  margin-bottom: 20px;
}

.info-group label {
  display: block;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

.info-input, .info-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.info-input:focus, .info-textarea:focus {
  outline: none;
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(26, 188, 156, 0.3);
}

.info-textarea {
  resize: vertical;
  min-height: 100px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.save-btn, .cancel-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;
}

.save-btn {
  background-color: #1abc9c;
  color: white;
}

.save-btn:hover {
  background-color: #16a085;
  transform: translateY(-2px);
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

html, body {
  overflow: hidden;
  height: 100%;
}
</style>
