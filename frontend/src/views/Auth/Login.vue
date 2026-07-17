<template>
  <div class="login-wrapper">
    <div class="form-card">
      <div class="card-header">
        <h2>Welcome Back</h2>
        <p>Login securely with a One-Time Password (OTP)</p>
      </div>

      <form class="form-section">
        <div class="input-group">
          <label for="email">Email Address</label>
          <div class="input-wrapper">
            <span class="input-icon">✉</span>
            <input 
              id="email"
              type="email" 
              required
              v-model="email"
              placeholder="you@example.com" 
              class="custom-input"
            />
          </div>
        </div>
        {{ auth.message }}
        <button :disabled="auth.sending" @click="send" class="btn btn-secondary">
          {{ auth.sending ? "sending" : "sent otp" }}
        </button>
      </form>

      <div class="divider">
        <span>Verification</span>
      </div>

      <form  class="form-section">
        <div class="input-group">
          <label for="otp">Enter OTP</label>
          <div class="input-wrapper">
            <span class="input-icon">🔑</span>
            <input 
              id="otp"
              type="text" 
              required

              inputmode="numeric"

              placeholder="4-digit code" 
              class="custom-input otp-input"
            />
          </div>
        </div>
        <button  class="btn btn-primary">
          Verify & Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth';

const auth = useAuth();
const email = ref(auth.email || '');
const otp = ref();


const send = () => {
  auth.sendOtp(email.value);
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.login-wrapper {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  padding: 20px;
}

.form-card {
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 8px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.3s ease;
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.card-header p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* form tags are now styled directly as sections */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  font-size: 16px;
}

.custom-input {
  width: 100%;
  padding: 12px 14px 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  color: #1e293b;
  outline: none;
  background-color: #f8fafc;
  transition: all 0.25s ease;
}

.custom-input::placeholder {
  color: #94a3b8;
}

.custom-input:focus {
  border-color: #4f46e5;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.otp-input {
  letter-spacing: 2px;
  font-weight: 600;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 25px 0;
  color: #cbd5e1;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
}

/* button design */
.btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

/* Send OTP */
.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

/* Verify & Login */
.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
}

.btn-primary:active {
  transform: translateY(1px);
}

/* mobile display */
@media (max-width: 480px) {
  .form-card {
    padding: 30px 20px;
  }
  
  .card-header h2 {
    font-size: 22px;
  }
}
</style>