import { defineStore } from "pinia";
import http from "../library/http";
import router from "../router";
import { cartStore } from "./Product/cartStore";
import { useWishlistStore } from "./wishlistStore";

export const useAuth = defineStore("auth", {
  state: () => ({
    email: "",
    access_token: localStorage.getItem("access_token") || null,
    sending: false,
    message: "",
    verifying: false,
    otp: "",
  }),

  getters: {
    isAuthenticated: (check) => !!check.access_token,
  },

  actions: {
    async sendOtp(email) {
      this.sending = true;
      this.message = ""; // clearing old messages
      try {
        const response = await http.post("login/otpSend", { email });

        console.log("OTP Send Response:", response); // checking response structure in console


        if (response) {
          this.email = email;
          sessionStorage.setItem("email", email); // setting email value in sessionStorage
          

          // getting message from response
          const apiMessage = response.data.data.massage ;
 
          if (Array.isArray(apiMessage)) {
            this.message = apiMessage[0];
          } else {
            this.message = "OTP Sent Successfully";
          }
        }
      } catch (error) {
        console.error("OTP send error:", error);
        this.message =
          error.response?.data?.massage?.[0] || "Failed to send OTP";
      } finally {
        this.sending = false;
      }
    },

    async verifyOtp(otps) {
      this.verifying = true;
      this.message = "";
      try {
        const response = await http.post("login", {
          email: sessionStorage.getItem("email"),
          otp: otps,
        });

        if (response && response.data) {
          sessionStorage.clear();

          // the token is inside of response.data.accessToken
          this.access_token = response.data.data.accessToken;
          localStorage.setItem("access_token", this.access_token);

          // this.message = "Login success";
                    // getting message from response
          const apiMessage = response.massage || response.data?.massage;

          if (Array.isArray(apiMessage)) {
            this.message = apiMessage[0];
          } else {
            this.message = "OTP Sent Successfully";
          }


          // re-directing to the dashboard page after 1.2 seconds  
          // refresh other stores (cart, wishlist) so UI immediately reflects logged-in state
          try {
            const cstore = cartStore();
            if (cstore) {
              // cstore.access_token = this.access_token;
              await cstore.allCarts();
            }
          } catch (e) {
            console.error('Failed to refresh cart store after login', e);
          }

          try {
            const wstore = useWishlistStore();
            if (wstore && typeof wstore.fetchAll === 'function') {
              await wstore.fetchAll();
            }
          } catch (e) {
            console.error('Failed to refresh wishlist store after login', e);
          }

          setTimeout(() => {
            router.push('/dashboard/my-account')
          },1200);

          

          // will be redirected to dashboard after login
          // router.push({ name: 'Dashboard' });
        } else {
          this.message = "Something went wrong. Please try again";
        }
      } catch (error) {
        this.message = error.response?.data?.massage[0] || "Invalid OTP";
      } finally {
        this.verifying = false;
      }
    },
    logout(){
      // remove token
      localStorage.removeItem("access_token");
      this.access_token = null;
      this.message = "Logout successful";

      // clear cart store state so UI updates immediately after logout
      try {
        const cstore = cartStore();
        if (cstore) {
          cstore.allCart = [];
          cstore.access_token = null;
        }
      } catch (e) {
        console.error('Failed to clear cart store on logout', e);
      }

      // clear wishlist store state as well
      try {
        const wstore = useWishlistStore();
        if (wstore) {
          wstore.wishlists = [];
        }
      } catch (e) {
        console.error('Failed to clear wishlist store on logout', e);
      }

      setTimeout(() => {
        router.push("/login");
      }, 1200);

    },
  },
});
