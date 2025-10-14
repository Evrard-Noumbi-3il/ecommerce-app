import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favoris", () => {

  const favoris = ref(JSON.parse(localStorage.getItem("favoris")) || []);

  
  const isFavorite = (id) => favoris.value.some(p => p._id === id);

  const toggleFavorite = (product) => {
    if (isFavorite(product._id)) {
      favoris.value = favoris.value.filter(p => p._id !== product._id);
    } else {
      favoris.value.push(product);
    }

    localStorage.setItem("favoris", JSON.stringify(favoris.value));
  };

  return { favoris, isFavorite, toggleFavorite };
});
