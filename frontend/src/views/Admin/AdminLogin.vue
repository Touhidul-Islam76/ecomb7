<template>
  <main>
    <div class="admin-auth">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-3">Administrator Sign In</h4>

          <p class="note mb-3">This is a static demo login. Replace with server-side authentication in production.</p>

          <form @submit.prevent="handleSendOtp">
            <div class="mb-3">
              <label for="adminEmail" class="form-label small">Email</label>
              <input id="adminEmail" v-model="email" type="email" class="form-control" placeholder="admin@example.com"
                required>
            </div>





            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                Send OTP
              </button>
            </div>
          </form>


          <form @submit.prevent="handleVerifyOtp">
            <div class="mb-3">
              <label for="adminEmail" class="form-label small">Otp</label>
              <input id="adminEmail" type="text" v-model="otps" class="form-control" placeholder="admin@example.com"
                required>
            </div>



            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="adminRemember">
                <label class="form-check-label small" for="adminRemember">Remember me</label>
              </div>
              <a href="#" class="small">Forgot password?</a>
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                Verify otp
              </button>
            </div>
          </form>
          <hr class="my-3">

          <div class="small text-muted text-center">
            Admin demo account: admin@example.com / password (static demo only)
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth';
import Toastify from "toastify-js";
import http from '../../library/http';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuth();
const email = ref('');
const otps = ref('');

const handleSendOtp = async () => {
  const res = await auth.sendOtp(email.value);

  if (res) {
    Toastify({
      text: auth.message,
      duration: 3000,
    }).showToast();


  }

};

const handleVerifyOtp = async () => {
  await auth.checkAuth(otps.value);
};

</script>