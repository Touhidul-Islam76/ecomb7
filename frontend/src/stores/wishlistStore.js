import { defineStore } from 'pinia';
import http from '../library/http';
import Toastify from 'toastify-js';

export const useWishlistStore = defineStore('wishlistStore', {
  state: () => ({
    wishlists: [],
    message: '',
  }),
  actions: {
    async fetchAll() {
      try {
        const res = await http.get('wishlist');
        if (res) {
          this.wishlists = res.data.data;
        }
      } catch (e) {
        this.message = 'Failed to fetch wishlist';
      }
    },
    async add(product_id) {
      try {
        const res = await http.post('wishlist/add', { product_id });
        if (res) {
          Toastify({ text: res.data.massage[0] || 'Added to wishlist', duration: 2000 }).showToast();
          await this.fetchAll();
          return res;
        }
      } catch (e) {
        this.message = 'Failed to add to wishlist';
      }
    },
    async remove(product_id) {
      try {
        const res = await http.post('wishlist/delete', { product_id });
        if (res) {
          // update local state without reload
          this.wishlists = this.wishlists.filter(item => item.product.id !== product_id && item.id !== product_id);
          Toastify({ text: res.data.massage[0] || 'Removed from wishlist', duration: 2000 }).showToast();
          return res;
        }
      } catch (e) {
        this.message = 'Failed to remove from wishlist';
      }
    },
    async flush() {
      try {
        const res = await http.post('wishlist/flush');
        if (res) {
          this.wishlists = [];
          Toastify({ text: res.data.massage[0] || 'Wishlist cleared', duration: 2000 }).showToast();
          return res;
        }
      } catch (e) {
        this.message = 'Failed to clear wishlist';
      }
    }
  }
});
