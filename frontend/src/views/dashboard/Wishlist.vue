<template>
  <div class="wishlist-page">
    <!-- Breadcrumb Section -->
    <div class="breadcrumb-section">
      <div class="container breadcrumb-content">
        <h1 class="page-title">My Wishlist</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link>
          <span>/</span>
          <span>Wishlist</span>
        </div>
      </div>
    </div>

<!-- Main Content: Wishlist -->
<main class="container">
  <div class="wishlist-wrapper">
    
    <!-- Table View when Items exist -->
    <div v-if="wishlist.wishlists.length > 0">
      <div class="wishlist-table-container">
        <table class="wishlist-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Stock Status</th>
              <th>Action</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in wishlist.wishlists" :key="item.product.id">
              <td>
                <div class="product-col">
                  <img :src="item.product.image" :alt="item.product.title" class="product-img" />
                  <a href="#" class="product-title">{{ item.product.title }}</a>
                </div>
              </td>
              <td>
                <span class="price-current">${{ item.product.price }}</span>
              </td>
              <td>
                <span 
                  class="stock-badge" 
                  :class="item.inStock ? 'stock-in' : 'stock-out'"
                >
                  {{ item.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </td>
              <td>
                <button 
                  v-if="item.inStock"
                  class="btn btn-primary"
                  @click="addToCart(item)"
                  :disabled="isProcessing"
                >
                  <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
                <button v-else class="btn btn-disabled" disabled>
                  <i class="fa-solid fa-cart-shopping"></i> Out of Stock
                </button>
              </td>
              <td>
                <button 
                  class="action-remove" 
                  @click="removeFromWishlist(item.product.id)" 
                  title="Remove Item"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Actions Footer -->
      <div class="wishlist-actions">
        <router-link to="/shop" class="btn btn-outline">
          <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </router-link>
        <button class="btn btn-outline" @click="flush">
          <i class="fa-solid fa-trash"></i> Clear Wishlist
        </button>
      </div>
    </div>

    <!-- Empty View when No Items exist -->
    <div v-else class="empty-wishlist">
      <i class="fa-regular fa-heart"></i>
      <h3>You haven't added any product in your wishlist yet.</h3>

    </div>

  </div>
</main>

    <!-- Footer -->

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from '../../stores/auth';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useRouter } from 'vue-router';

const auth = useAuth();
const wishlist = useWishlistStore();
const router = useRouter();
const isProcessing = ref(false);

onMounted(async () => {
  if (!auth.isAuthenticated) {
    // redirect unauthenticated users
    router.push('/login');
    return;
  }

  await wishlist.fetchAll();
});

const flush = async () => {
  if (!auth.isAuthenticated) return;
  await wishlist.flush();
  router.push('/');
};

const removeFromWishlist = async (wishlistId) => {
  if (!auth.isAuthenticated) return;
  await wishlist.remove(wishlistId);
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.wishlist-page {
  font-family: 'Poppins', sans-serif;
  background-color: #f7f8fb;
  color: #333333;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Top Bar */
.top-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
  font-size: 13px;
  padding: 8px 0;
  color: #687188;
}

.top-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-header-left,
.top-header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.top-header select {
  border: none;
  background: transparent;
  color: #687188;
  font-size: 13px;
  cursor: pointer;
  outline: none;
}

/* Navbar */
.navbar {
  background-color: #ffffff;
  padding: 18px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 26px;
  font-weight: 700;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  color: #FF324D;
  font-size: 28px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-link {
  font-weight: 500;
  font-size: 15px;
  color: #333333;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.nav-link:hover,
.router-link-active {
  color: #FF324D;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 18px;
}

.icon-btn {
  position: relative;
  font-size: 18px;
  color: #333333;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -7px;
  right: -10px;
  background-color: #FF324D;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Breadcrumb */
.breadcrumb-section {
  background-color: #f2f3f8;
  padding: 35px 0;
  margin-bottom: 40px;
}

.breadcrumb-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.breadcrumbs {
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: #687188;
}

/* Wishlist Box */
.wishlist-wrapper {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 25px;
  margin-bottom: 60px;
}

.wishlist-table-container {
  width: 100%;
  overflow-x: auto;
}

.wishlist-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.wishlist-table th {
  background-color: #f8f9fa;
  color: #333333;
  font-weight: 600;
  font-size: 14px;
  padding: 16px;
  border-bottom: 2px solid #e9ecef;
  text-transform: uppercase;
}

.wishlist-table td {
  padding: 18px 16px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.product-col {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.product-title {
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
}

.product-title:hover {
  color: #FF324D;
}

.price-current {
  font-weight: 600;
  color: #FF324D;
  font-size: 16px;
}

.price-old {
  text-decoration: line-through;
  color: #687188;
  font-size: 13px;
  margin-left: 6px;
}

.stock-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.stock-in {
  background-color: #e6f4ea;
  color: #137333;
}

.stock-out {
  background-color: #fce8e6;
  color: #c5221f;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn-primary {
  background-color: #FF324D;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #e02b43;
  box-shadow: 0 4px 12px rgba(255, 50, 77, 0.3);
}

.btn-disabled {
  background-color: #e0e0e0;
  color: #888;
  cursor: not-allowed;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #e9ecef;
  color: #333333;
}

.btn-outline:hover {
  border-color: #FF324D;
  color: #FF324D;
}

.action-remove {
  color: #888;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  border: none;
}

.action-remove:hover {
  color: #FF324D;
}

.wishlist-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  flex-wrap: wrap;
  gap: 15px;
}

/* Empty View */
.empty-wishlist {
  text-align: center;
  padding: 50px 20px;
}

.empty-wishlist i {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

/* Footer */
footer {
  background-color: #202325;
  color: #abb2ba;
  padding: 50px 0 20px 0;
  margin-top: 60px;
  font-size: 14px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.footer-col h4 {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
}

.footer-col h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #FF324D;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #333;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 768px) {
  .top-header, .nav-menu { display: none; }
  .breadcrumb-content { flex-direction: column; align-items: flex-start; gap: 10px; }
  .wishlist-table th:nth-child(3), .wishlist-table td:nth-child(3) { display: none; }
}
</style>