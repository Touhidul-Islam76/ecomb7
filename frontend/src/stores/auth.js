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
          error.response?.data?.massage?.[0] ||
          "Failed to send OTP";

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

          localStorage.setItem(
            "access_token",
            accessToken
          );

          // Save user
          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );

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
            console.error(
              "Failed to refresh cart after login:",
              error
            );
          }

          // =========================
          // REFRESH WISHLIST
          // =========================
          try {
            const wstore = useWishlistStore();

            if (
              wstore &&
              typeof wstore.fetchAll === "function"
            ) {
              await wstore.fetchAll();
            }
          } catch (error) {
            console.error(
              "Failed to refresh wishlist after login:",
              error
            );
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

        this.message =
          error.response?.data?.massage?.[0] ||
          "Invalid OTP";

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
        console.error(
          "Failed to clear cart store on logout:",
          error
        );
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
        console.error(
          "Failed to clear wishlist store on logout:",
          error
        );
      }

      // Redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    },
  },
});