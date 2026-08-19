<template>
  <main>
    <div class="admin-auth">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-3">Administrator Sign In</h4>

          <p class="note mb-3">This is a static demo login. Replace with server-side authentication in production.</p>

          <form>
            <div class="mb-3">
              <label for="adminEmail" class="form-label small">Email</label>
              <input 
                id="adminEmail"
                type="email" 
                class="form-control" 
                placeholder="admin@example.com" 
                required>
            </div>

            <!-- OTP input (Static Display) -->
            <div class="mb-3">
              <label for="adminOtp" class="form-label small">OTP</label>
              <input 
                id="adminOtp"
                type="text" 
                class="form-control" 
                placeholder="Enter the otp" 
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
              <button 
                type="button" 
                class="btn btn-primary">
                Verify and Login
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

</script>