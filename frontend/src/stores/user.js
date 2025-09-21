import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, 
  }),
  actions: {
    setUser(data) {
      this.user = data;
    },
    logout() {
      this.user = null;
    },
  },
  getters: {
    isAdmin: (state) => state.user?.role === "admin",
    isModerator: (state) => state.user?.role === "moderator",
  },
});
