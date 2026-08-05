import { defineStore } from "pinia";
import http from "../../library/http";
import Toastify from "toastify-js";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    allCart: [],
    message: "",
    access_token: localStorage.getItem("access_token") || null,
  }),
  getters: {
    is_authenticated: (check) => !!check.access_token,
    count: (cart)=> cart.allCart ? cart.allCart.length : [],
    subtotal: (cart)=> cart.allCart.reduce((sum, i)=> sum + i.quantity*i.price, 0)
  },
  actions: {
    async addCart(product) {
      try {
        const res = await http.post("cart/add", {
          product_id: product,
          quantity: 1,
          size: "m",
          size: "white",
        });

        if (res && this.is_authenticated) {
          // this.allCart = res.data.data
          console.log(res);
          Toastify({
            text: res.data.massage[0],

            duration: 1000,
          }).showToast();
        }
      } catch (e) {
        this.message = "Something went wrong!!!";
      }
    },
    async allCarts() {
      try {
        const res = await http.get("/cart");
        if (res) {
          ((this.allCart = res.data.data),
            console.log("fetched cart:", res.data.data));
        }
      } catch (e) {
        this.message = "SOmething went wrong";
      }
    },
    // async remove(product) {
    //   try {
    //     const res = await http.post("cart/delete", { cart_id: product });
    //     if (res) {
    //       Toastify({
    //         text: res.data.massage[0],

    //         duration: 1000,
    //       }).showToast();
    //     }
    //   } catch (e) {
    //     this.message = "something went wrong";
    //   }
    // },
  },
});
