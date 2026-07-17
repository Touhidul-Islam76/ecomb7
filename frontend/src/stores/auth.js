import { defineStore } from "pinia";
import http from "../library/http";
import router from "../router";

export const useAuth = defineStore('auth', {
    state: () =>({
        email:'',
        access_token: localStorage.getItem('access_token') || null,
        sending: false,
        message:'',
        verifing: false,
    }),

    getters: {
        isAuthenticated: (check) => check.access_token ? true : false,
    },

    actions: {
        async sendOtp(email){
            this.sending = true;

            try{

                const data = http.post('login/otpSend', {email});
                this.email = email;
                this.message = data?.massage;

            }catch(error){}
        }
    }
});