import { defineStore } from "pinia";
import http from "../../library/http";
import Toastify from "toastify-js";
import router from "../../router";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    allCart: [],
    message: "",
    access_token: localStorage.getItem("access_token") || null,
  }),
  getters: {
    is_authenticated: (check) => !!check.access_token,
    count: (cart)=> cart.allCart ? cart.allCart.length : 0,
    subtotal: (cart)=> cart.allCart && cart.allCart.length ? cart.allCart.reduce((sum, i)=> sum + i.quantity*i.price, 0) : 0
  },
  actions: {
    async addCart(product) {
      try {
        const res = await http.post("cart/add", {
          product_id: product,
          quantity: 1,
          color: "white",
          size: "m",
        });

        if (res && this.is_authenticated) {
          console.log(res);
          Toastify({
            text: res.data.massage ? res.data.massage[0] : 'Added to cart',
            duration: 1000,
          }).showToast();

          // refresh local cart state so UI updates immediately
          await this.allCarts();
          return this.allCart;
        }
      } catch (e) {
        this.message = "Something went wrong!!!";
      }
    },
    async allCarts() {
      try {
        const res = await http.get("/cart");
        if (res) {
          this.allCart = res.data.data;
          console.log("fetched cart:", res.data.data);
          return this.allCart;
        }
      } catch (e) {
        this.message = "SOmething went wrong";
      }
    },

    async allCartDelete(){
      try{
        const res = await http.post("/cart/flush");
        if(res){
          this.allCart = [];
          Toastify({
            text: res.data.massage ? res.data.massage[0] : 'Added to cart',
            duration: 2000,
          }).showToast();

          setTimeout(() => {
            router.push('/')
          },500);
        }
      }catch(e){
        this.message = "Something went wrong";
      }
    }

  },
});
