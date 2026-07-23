import { defineStore } from "pinia";
import http from "../../library/http";

export const productStore = defineStore("productStore", {
  state: () => ({
    products: [], 
    message: "",
  }),
  getters: {

    allProducts: (state) => state.products,
  },
  actions: {
    async getProduct() {
      try {
        const response = await http.get("products");

        if (response) {

          this.products = response.data.data.data; 
          this.message = "Product fetched successfully";
          
          return response.data.data.data; 
        }
      } catch (e) {
        this.message = 'Something went wrong';
      }
    },
  },
});