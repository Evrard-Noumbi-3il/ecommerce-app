<template>
  <div class="app-container">
    <nav class="menu">
      <button :class="{'active': currentPage === 'profil'}" @click="currentPage = 'profil'">
        <i class="fas fa-id-card" aria-hidden="true"></i> Mon Profil
      </button>
      <button :class="{'active': currentPage === 'messages'}" @click="currentPage = 'messages'">
        <i class="fas fa-comment-dots" aria-hidden="true"></i> Messages
      </button>
      <button :class="{'active': currentPage === 'notifications'}" @click="currentPage = 'notifications'">
        <i class="fas fa-bell" aria-hidden="true"></i> Notifications
      </button>
      <button :class="{'active': currentPage === 'annonces'}" @click="currentPage = 'annonces'">
        <i class="fas fa-bullhorn" aria-hidden="true"></i> Annonces
      </button>
      <button :class="{'active': currentPage === 'produitEnVente'}" @click="currentPage = 'produitEnVente'">
        <i class="fas fa-tag" aria-hidden="true"></i> Produits
      </button>
    </nav>

    <main class="content">
      <div class="content-scroll">

        <section v-if="currentPage === 'profil'" class="profile-layout-v4">
          <h2 class="page-title-v4">
            <i class="fas fa-user-shield" aria-hidden="true"></i> Mon Profil
          </h2>

          <div class="main-profile-card">

            <div v-if="!isEditing" class="identity-card">
              <div class="identity-header">
                <img v-if="user.photo" :src="user.photo" alt="Photo de profil" class="identity-photo">
                <div v-else class="identity-photo default-avatar" aria-label="Avatar par défaut">
                  <i class="fas fa-user-circle" aria-hidden="true"></i>
                </div>
                <h2>{{ user.name }} {{ user.firstname }}</h2>
                <p class="role-tag">{{ user.role.toUpperCase() }}</p>
              </div>

              <div class="identity-details">
                <p><i class="fas fa-envelope" aria-hidden="true"></i> {{ user.email }}</p>
                <p><i class="fas fa-phone" aria-hidden="true"></i> {{ user.phone || "Non renseigné" }}</p>
                <p><i class="fas fa-map-marker-alt" aria-hidden="true"></i> {{ user.address || "Non renseignée" }}</p>
                <p><i class="fas fa-lock" aria-hidden="true"></i> ********</p>
              </div>

              <div class="identity-footer">
                <button @click="isEditing = true" class="btn-edit">
                  <i class="fas fa-edit" aria-hidden="true"></i> Modifier
                </button>
              </div>
            </div>

            <div v-else class="edit-profile-form-container">
              <form @submit.prevent="saveProfile" class="form-grid">
                
                <div class="photo-and-info-header">
                  <div class="profile-image-container-v4">
                    <img v-if="user.photo || user.profileImage" :src="user.profileImage || user.photo" alt="Photo de profil actuelle" class="profile-image-v4">
                    <div v-else class="default-avatar-v4" aria-label="Avatar par défaut">
                      <i class="fas fa-user-circle" aria-hidden="true"></i>
                    </div>
                    
                    <input type="file" @change="handleImageUpload" id="file-upload" class="file-input" accept="image/*" hidden />
                    <button class="upload-btn-v4" @click="triggerFileInput" type="button" title="Changer de photo">
                      <i class="fas fa-camera" aria-hidden="true"></i>
                    </button>
                  </div>
                  
                  <div class="role-display-v4">
                    <h3>Statut : **{{ user.role.toUpperCase() }}**</h3>
                    <p class="email-display"><i class="fas fa-envelope-open-text"></i> {{ user.email }}</p>
                  </div>
                </div>

                <div class="details-grid-v4">
                  
                  <div class="detail-item-v4">
                    <label for="profile-name"><i class="fas fa-user-tag" aria-hidden="true"></i> Nom</label>
                    <input type="text" id="profile-name" v-model="user.name" class="profile-input" required />
                  </div>

                  <div class="detail-item-v4">
                    <label for="profile-firstname"><i class="fas fa-user-edit" aria-hidden="true"></i> Prénom</label>
                    <input type="text" id="profile-firstname" v-model="user.firstname" class="profile-input" />
                  </div>

                  <div class="detail-item-v4">
                    <label for="profile-phone"><i class="fas fa-phone-alt" aria-hidden="true"></i> Téléphone</label>
                    <input type="tel" id="profile-phone" v-model="user.phone" class="profile-input" />
                  </div>

                  <div class="detail-item-v4">
                    <label for="profile-password"><i class="fas fa-lock" aria-hidden="true"></i> Mot de passe</label>
                    <input type="password" id="profile-password" v-model="user.password" class="profile-input password-field" disabled title="Utiliser un autre formulaire pour modifier le mot de passe" />
                  </div>

                  <div class="detail-item-v4 full-width-v4">
                    <label for="profile-address"><i class="fas fa-map-marked-alt" aria-hidden="true"></i> Adresse</label>
                    <input type="text" id="profile-address" v-model="user.address" class="profile-input" />
                  </div>
                </div>

                <footer class="card-footer-v4 button-group full-width-v4">
                  <button type="submit" class="action-btn-v4 primary-btn">
                    <i class="fas fa-save" aria-hidden="true"></i> Sauvegarder
                  </button>
                  <button type="button" @click="isEditing = false" class="cancel-btn-v4 secondary-btn">
                    <i class="fas fa-times" aria-hidden="true"></i> Annuler
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ProfileUser",
  data() {
    return {
      currentPage: "profil",
      isEditing: false,
      user: {
        name: "",
        firstname: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        password: "",
        photo: null,
        profileImage: null
      },
      userFile: null
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    triggerFileInput() {
      this.$el.querySelector(".file-input").click();
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
    async saveProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Utilisateur non connecté");

        const payload = {
          name: this.user.name,
          firstname: this.user.firstname,
          email: this.user.email,
          phone: this.user.phone,
          address: this.user.address,
          password:this.user.password
        };

        await axios.put("http://localhost:3000/api/user/me", payload, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });

        alert("Profil sauvegardé avec succès !");
        this.isEditing = false;
      } catch (err) {
        console.error("Erreur lors de la sauvegarde du profil :", err);
        alert("Erreur lors de la sauvegarde du profil");
      }
    },
    async fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const id = token && JSON.parse(atob(token.split(".")[1])).id;

        const res = await axios.get(`http://localhost:3000/api/user/me/${id}`);
        const data = res.data;

        this.user.name = data.name || "";
        this.user.firstname = data.firstname || "";
        this.user.email = data.email || "";
        this.user.phone = data.phonenumber || "";
        this.user.address = data.adresse || "";
        this.user.role = data.role || "user";
        this.user.password=data.password || "";
        this.user.photo = data.photo || null;
      } catch (err) {
        console.error("Erreur récupération profil:", err);
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
  margin: 1px;
}

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

.identity-card {
  max-width: 400px;
  margin: auto;
  background: linear-gradient(135deg, #047857, #10b981);
  color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
}

.identity-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.identity-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  margin-bottom: 15px;
}

.default-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  background: rgba(255,255,255,0.2);
}

.identity-details {
  margin-top: 15px;
  text-align: left;
  background: rgba(255,255,255,0.1);
  padding: 15px;
  border-radius: 12px;
}

.identity-details p {
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95em;
}

.role-tag {
  background: rgba(255,255,255,0.2);
  padding: 5px 15px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: bold;
}

.identity-footer {
  margin-top: 15px;
}

.btn-edit {
  background: #facc15;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  color: #1f2937;
  cursor: pointer;
  transition: 0.2s;
}

.btn-edit:hover {
  background: #fbbf24;
}

.edit-profile-form-container {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.photo-and-info-header {
  display: flex;
  align-items: center;
  gap: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.role-display-v4 h3 {
  margin: 0 0 5px 0;
  color: var(--main-color);
  font-size: 1.2em;
}

.email-display {
  color: var(--text-muted);
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-image-container-v4 {
  position: relative;
  flex-shrink: 0;
  width: 120px;
  height: 120px;
}

.profile-image-v4, .default-avatar-v4 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid var(--secondary-color);
  box-shadow: 0 0 0 2px var(--main-color);
  object-fit: cover;
}

.default-avatar-v4 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: var(--main-color);
  background: #e6e6e6;
}

.upload-btn-v4 {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--main-color);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-btn-v4:hover {
  background-color: #059669;
}

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

.password-field {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.card-footer-v4.button-group {
  text-align: right;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

.action-btn-v4 {
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  background-color: var(--main-color);
  color: #facc15;
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