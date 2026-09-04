import { defineStore } from "pinia";
import http from "../library/http";

import { cartStore } from "./Product/cartStore";
import { useWishlistStore } from "./wishlistStore";
import Toastify from "toastify-js";
import router from "../router";

export const useAuth = defineStore("auth", {
  state: () => ({
    email: "",
    access_token: localStorage.getItem("access_token") || null,
    sending: false,
    message: "",
    verifying: false,
    otp: "",
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  }),

  getters: {
    isAuthenticated: (check) => !!check.access_token,
    isAdmin: (check) => check.user?.role === 'admin' || (Array.isArray(check.user?.roles) && check.user.roles.includes('admin')),
    hasPermission: (check)=>{
      return (permission) => {
        if (!check.user || !check.user.permissions) {
          return false;
        }
        return check.user.permissions.includes(permission);
      }
    }
  },

  actions: {
    // =========================
    // SEND OTP
    // =========================
    async sendOtp(email) {
      this.sending = true;
      this.message = "";

      try {
        const response = await http.post("login/otpSend", {
          email: email,
        });

        console.log("OTP Send Response:", response);

        // Save email
        this.email = email;
        sessionStorage.setItem("email", email);

        // Backend response:
        // {
        //   data: null,
        //   massage: ["OTP successfully sent to your email"],
        //   code: 200
        // }

        const apiMessage = response.data?.massage;

        if (Array.isArray(apiMessage) && apiMessage.length > 0) {
          this.message = apiMessage[0];
        } else {
          this.message = "OTP successfully sent to your email";
        }

        return true;
      } catch (error) {
        console.error("OTP send error:", error);

        this.message =
          error.response?.data?.massage?.[0] || "Failed to send OTP";

        return false;
      } finally {
        this.sending = false;
      }
    },

    // =========================
    // VERIFY OTP / LOGIN
    // =========================
    async verifyOtp(otps) {
      this.verifying = true;
      this.message = "";

      try {
        const email = sessionStorage.getItem("email");

        if (!email) {
          this.message = "Email not found. Please send OTP again.";
          return false;
        }

        const response = await http.post("login", {
          email: email,
          otp: otps,
        });

        console.log("OTP Verify Response:", response);

        // Check successful response
        if (response?.data?.data) {
          const accessToken = response.data.data.accessToken;
          const user = response.data.data.user;

          // Save token
          this.access_token = accessToken;

          localStorage.setItem("access_token", accessToken);

          // Save user
          localStorage.setItem("user", JSON.stringify(user));

          // Get backend message
          const apiMessage = response.data?.massage;

          if (Array.isArray(apiMessage) && apiMessage.length > 0) {
            this.message = apiMessage[0];
          } else {
            this.message = "Login successful";
          }

          // Clear temporary email/OTP session
          sessionStorage.removeItem("email");

          // =========================
          // REFRESH CART
          // =========================
          try {
            const cstore = cartStore();

            if (cstore) {
              await cstore.allCarts();
            }
          } catch (error) {
            console.error("Failed to refresh cart after login:", error);
          }

          // =========================
          // REFRESH WISHLIST
          // =========================
          try {
            const wstore = useWishlistStore();

            if (wstore && typeof wstore.fetchAll === "function") {
              await wstore.fetchAll();
            }
          } catch (error) {
            console.error("Failed to refresh wishlist after login:", error);
          }

          // Redirect to dashboard
          setTimeout(() => {
            router.push("/dashboard/my-account");
          }, 1200);

          return true;
        }

        this.message =
          response.data?.massage?.[0] ||
          "Something went wrong. Please try again.";

        return false;
      } catch (error) {
        console.error("OTP verification error:", error);

        this.message = error.response?.data?.massage?.[0] || "Invalid OTP";

        return false;
      } finally {
        this.verifying = false;
      }
    },

    // =========================
    // LOGOUT
    // =========================
    logout() {
      // Remove token
      localStorage.removeItem("access_token");

      // Remove user
      localStorage.removeItem("user");

      // Reset auth state
      this.access_token = null;
      this.email = "";
      this.otp = "";
      this.message = "Logout successful";

      // =========================
      // CLEAR CART
      // =========================
      try {
        const cstore = cartStore();

        if (cstore) {
          cstore.allCart = [];
          cstore.access_token = null;
        }
      } catch (error) {
        console.error("Failed to clear cart store on logout:", error);
      }

      // =========================
      // CLEAR WISHLIST
      // =========================
      try {
        const wstore = useWishlistStore();

        if (wstore) {
          wstore.wishlists = [];
        }
      } catch (error) {
        console.error("Failed to clear wishlist store on logout:", error);
      }

      // Redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    },

    async checkAuth(otps) {
      const res = await http.post("login", {
        email: sessionStorage.getItem("email"),
        otp: otps,
      });

      const response = res.data.data;

      if (response) {
        console.log("adminlogin =", res.data.data);

        sessionStorage.removeItem("email");
        this.access_token = response.accessToken;
        localStorage.setItem("access_token", response.accessToken);

        const user = response.user;
        this.user = user;
        const isAdmin =
          user.role === "admin" ||
          (Array.isArray(user.roles) && user.roles.includes("admin"));

        // Save user
        localStorage.setItem("user", JSON.stringify(user));

        if (isAdmin) {
          Toastify({
            text: "Login successful",
            duration: 3000,
          }).showToast();
          // setTimeout(() => {
          //   router.push("/admin/dashboard-acc");
          // }, 1500);

          router.push("/admin/dashboard-acc");
        } else {
          Toastify({
            text: "Access denied. You are not an admin.",
            duration: 3000,
          }).showToast();
          setTimeout(() => {
            router.push("/admin/login");
          }, 1500);
        }
      }
    },
  },
});
