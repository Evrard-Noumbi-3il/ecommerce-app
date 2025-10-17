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
    </nav>

    <main class="content">
      <div class="content-scroll">

        <!-- PROFIL -->
        <section v-if="currentPage === 'profil'" class="profile-layout-v4">
          <h2 class="page-title-v4"><i class="fas fa-user-shield"></i> Mon Profil</h2>

          <div class="main-profile-card">
            
            <transition name="fade-slide" mode="out-in">
              <div v-if="!isEditing" key="view-mode" class="profile-view-card">
                
                <header class="profile-header-v5">
                  <div class="info-main">
                    <div class="profile-image-view-container">
                        <img v-if="user.photo" :src="user.photo" alt="Photo de profil" class="profile-image-view">
                        <div v-else class="profile-image-view default-avatar-view" aria-label="Avatar par défaut">
                            <i class="fas fa-user-circle" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="user-titles">
                        <h1>
                            <span class="user-name-highlight">{{ user.firstname }}</span>
                            <span class="user-name-highlight bold-name">{{ user.name.toUpperCase() }}</span>
                        </h1>
                        <p class="role-tag-v5">{{ user.role.toUpperCase() }}</p>
                    </div>
                  </div>
                  
                  <button @click="isEditing = true" class="btn-edit-v5" title="Modifier le profil">
                    <i class="fas fa-edit" aria-hidden="true"></i> Modifier
                  </button>
                </header>

                <div class="profile-details-v5">
                  <div class="detail-item-v5">
                    <i class="fas fa-envelope icon-v5" aria-hidden="true"></i>
                    <div>
                      <span class="detail-label">Email</span>
                      <p class="detail-value">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="detail-item-v5">
                    <i class="fas fa-phone-alt icon-v5" aria-hidden="true"></i>
                    <div>
                      <span class="detail-label">Téléphone</span>
                      <p class="detail-value">{{ user.phone || "Non renseigné" }}</p>
                    </div>
                  </div>
                  <div class="detail-item-v5 full-width-v4">
                    <i class="fas fa-map-marker-alt icon-v5" aria-hidden="true"></i>
                    <div>
                      <span class="detail-label">Adresse</span>
                      <p class="detail-value">{{ user.address || "Non renseignée" }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </transition>

            <transition name="fade-slide" mode="out-in">
              <div v-if="isEditing" key="edit-mode" class="edit-profile-form-container">
                <form @submit.prevent="saveProfile" class="form-grid">
                  
                  <div class="photo-and-info-header">
                    <div class="profile-image-container-v4">
                      <img v-if="user.profileImage || user.photo" :src="user.profileImage || user.photo" alt="Photo de profil actuelle" class="profile-image-v4">
                      <div v-else class="default-avatar-v4" aria-label="Avatar par défaut">
                        <i class="fas fa-user-circle" aria-hidden="true"></i>
                      </div>
                      
                      <input type="file" @change="handleImageUpload" id="file-upload" class="file-input" accept="image/*" hidden />
                      <button class="upload-btn-v4" @click="triggerFileInput" type="button" title="Changer de photo">
                        <i class="fas fa-camera" aria-hidden="true"></i>
                      </button>
                    </div>
                    
                    <div class="role-display-v4">
                      <h3>Statut : {{ user.role.toUpperCase() }}</h3>
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
                      <input type="password" id="profile-password" class="profile-input password-field" disabled title="Utiliser un autre formulaire pour modifier le mot de passe" value="********" />
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
            </transition>

          </div>
        </section>

        <div v-if="products.length === 0">Aucun produit en vente.</div>
        <div v-else class="products-grid">
          <div v-for="product in products" :key="product._id" class="product-card">
            <div class="product-info">
              <p class="product-name">{{ product.titre }}</p>
              <p class="product-desc">{{ product.description || "Pas de description" }}</p>
              <p class="product-price">{{ product.prix }} €</p>
              <img :src="product.images?.[0] || 'https://via.placeholder.com/150'" alt="Image produit" class="product-image" />

            </div>
          </div>
        </div>

        <section v-if="currentPage === 'notifications'">
          <h2 class="page-title-v4">
            <i class="fas fa-bell"></i> Mes Notifications
          </h2>

          <div v-if="!notifications || notifications.length === 0" class="no-notifications">
            Vous n'avez aucune nouvelle notification.
          </div>

          <div v-else class="notifications-list">
            <div
              v-for="notification in notifications"
              :key="notification._id || notification.id"
              :class="['notification-item', notification.state, notification.type]"
            >
              <i :class="getNotificationIcon(notification.type)" aria-hidden="true"></i>
              <div class="notification-content">
                <p class="notification-message">{{ notification.message }}</p>
                <div class="notification-meta">
                  <span class="notification-from">{{ notification.from.toUpperCase() }}</span>
                  <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
                </div>
              </div>
              <button
                v-if="notification.state === 'unread'"
                @click="markAsRead(notification)"
                class="btn-mark-read"
                title="Marquer comme lu"
              >
                <i class="fas fa-check" aria-hidden="true"></i>
              </button>
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
        role: "user",
        photo: null,
        profileImage: null
      },
      products: [],
      notifications: [],
      userFile: null
    };
  },
  created() {
    this.fetchUser();
    this.getMyProducts();
    this.getNotifications();
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
    async updateProfilePhoto(token) {
      if (!this.userFile) return true;

      const formData = new FormData();
      formData.append("photo", this.userFile);

      try {
        const res = await axios.patch("http://localhost:3000/api/user/me/photo", formData, {
          headers: {  
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`  
          }
        });
        if (res.data.photoUrl) {
          this.user.photo = res.data.photoUrl;
          this.user.profileImage = res.data.photoUrl;
          this.userFile = null;
        }
        return true;
      } catch (err) {
        console.error("Erreur lors de l'upload de la photo :", err);
        return false;
      }
    },
   
async getMyProducts() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utilisateur non connecté");

    const userId = JSON.parse(atob(token.split(".")[1])).id;

    const res = await axios.get(`http://localhost:3000/api/users/${userId}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    this.products = res.data; // Tableau de produits
    console.log("Produits récupérés :", this.products);
  } catch (err) {
    console.error("Erreur lors du chargement des produits :", err);
  }
},
    async saveProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Utilisateur non connecté");

        if (this.userFile) {
          await this.updateProfilePhoto(token);
        }

        const payload = {
          name: this.user.name,
          firstname: this.user.firstname,
          phone: this.user.phone,
          address: this.user.address,
        };

        await axios.put("http://localhost:3000/api/user/me", payload, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });

        alert("Profil sauvegardé avec succès !");
        this.isEditing = false;
      } catch (err) {
        console.error("Erreur lors de la sauvegarde du profil :", err);
        alert("Erreur lors de la sauvegarde du profil. Voir la console pour les détails.");
      }
    },
    async getNotifications() {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Utilisateur non connecté");

            const userId = JSON.parse(atob(token.split(".")[1])).id;

            // Endpoint basé sur votre structure backend (req.params.userId)
            const res = await axios.get(`http://localhost:3000/api/notifications/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            this.notifications = res.data;
        } catch (err) {
            console.error("Erreur lors du chargement des notifications :", err);
        }
    },
    getNotificationIcon(type) {
        switch (type) {
            case 'warning':
                return 'fas fa-exclamation-triangle';
            case 'alert':
                return 'fas fa-shield-alt';
            case 'info':
            default:
                return 'fas fa-info-circle';
        }
    },
    async fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const id = JSON.parse(atob(token.split(".")[1])).id;
        const endpoint = `http://localhost:3000/api/user/me/${id}`;
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;

        this.user.name = data.name || "";
        this.user.firstname = data.firstname || "";
        this.user.email = data.email || "";
        this.user.phone = data.phone || data.phonenumber || "";
        this.user.address = data.address || data.adresse || "";
        this.user.role = data.role || "user";
        this.user.photo = data.photo || null;
        this.user.profileImage = data.photo || null;
        this.products = Array.isArray(data.misEnVente) ? data.misEnVente : [];
      } catch (err) {
        console.error("Erreur récupération profil:", err);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

:root {
  --main-color: #047857;
  --accent-color: #facc15;
  --secondary-color: #f9fafb;
  --text-dark: #1f2937;
  --text-muted: #6b7280;
  --card-bg: white;
  --shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.app-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--secondary-color);
  font-family: 'Poppins', sans-serif;
  margin-top: 100px;
}

.menu {
  width: 250px;
  background-color: var(--card-bg);
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

.main-profile-card {
  max-width: 800px;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.profile-view-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease-in-out;
}

.profile-header-v5 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.info-main {
    display: flex;
    align-items: center;
    gap: 20px;
}

.profile-image-view-container {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
}

.profile-image-view, .default-avatar-view {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent-color);
    box-shadow: 0 0 0 2px var(--main-color);
}

.default-avatar-view {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    color: var(--main-color);
    background: #e6e6e6;
}

.user-titles h1 {
    font-size: 1.5em;
    margin: 0 0 5px 0;
    color: var(--text-dark);
}

.user-name-highlight {
    color: var(--main-color);
    font-weight: 700;
}

.user-name-highlight.bold-name {
    font-weight: 900;
}

.role-tag-v5 {
    display: inline-block;
    background: var(--main-color);
    color: white;
    padding: 3px 12px;
    border-radius: 15px;
    font-size: 0.8em;
    font-weight: 600;
}

.btn-edit-v5 {
  background: var(--accent-color);
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.btn-edit-v5:hover {
  background: #fbbf24;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.profile-details-v5 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px 40px;
}

.detail-item-v5 {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px 0;
}

.icon-v5 {
    font-size: 1.5em;
    color: var(--main-color);
    flex-shrink: 0;
}

.detail-label {
    display: block;
    font-size: 0.85em;
    color: var(--text-muted);
    font-weight: 500;
}

.detail-value {
    font-size: 1em;
    color: var(--main-color);
    font-weight: 600;
    margin: 2px 0 0 0;
}

.edit-profile-form-container {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease-in-out;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
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
  width: 35px;
  height: 35px;
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
  gap: 25px 30px;
  padding-top: 5px;
}

.detail-item-v4 label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 5px;
}

.profile-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1em;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: white;
  transition: all 0.3s;
}

.profile-input:focus {
  outline: none;
  border-color: var(--main-color);
  box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1);
}

.full-width-v4 {
  grid-column: 1 / -1;
}

.password-field {
  background-color: #f3f4f6;
  cursor: not-allowed;
  color: var(--text-muted);
}

.card-footer-v4.button-group {
  text-align: right;
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.action-btn-v4, .cancel-btn-v4 {
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.primary-btn {
  background-color: var(--main-color);
  color: var(--accent-color);
}

.primary-btn:hover {
  background-color: #059669;
  transform: translateY(-1px);
}

.secondary-btn {
  background-color: #e5e7eb;
  color: var(--text-dark);
}

.secondary-btn:hover {
  background-color: #d1d5db;
  transform: translateY(-1px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .details-grid-v4 {
    grid-template-columns: 1fr;
  }

  .profile-header-v5 {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-main {
    flex-direction: column;
    margin-bottom: 20px;
    gap: 10px;
  }

  .btn-edit-v5 {
    width: 100%;
    justify-content: center;
  }

  .profile-details-v5 {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .photo-and-info-header {
    flex-direction: column;
    text-align: center;
  }
}
/* --- SECTION PRODUITS --- */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.product-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background-color: #f3f4f6;
}

.product-info {
  padding: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-weight: 700;
  color: var(--text-dark);
  font-size: 1em;
  margin-bottom: 8px;
}

.product-desc {
  color: var(--text-muted);
  font-size: 0.85em;
  margin-bottom: auto;
}

.product-price {
  font-size: 1em;
  color: var(--main-color);
  font-weight: 600;
  margin-top: 10px;
  text-align: right;
}

/* Responsive mobile */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .product-image {
    height: 120px;
  }

  .product-name {
    font-size: 0.95em;
  }

  .product-desc {
    font-size: 0.8em;
  }

  .product-price {
    font-size: 0.9em;
  }
}

</style>