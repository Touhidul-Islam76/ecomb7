<template>
  <header class="bg-white border-bottom">
    <div class="container d-flex justify-content-between align-items-center py-3">
      <div class="d-flex align-items-center gap-3">
        <a class="h5 mb-0 text-decoration-none" href="admin_dashboard.html">Admin</a>
        <span class="muted-small">/ Dashboard</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <a class="btn btn-outline-secondary btn-sm" href="index.html" role="button">View site</a>
        <button  class="btn btn-outline-danger btn-sm" type="button" @click="logout">Logout</button>
      </div>
    </div>
  </header>

  <main class="admin-wrap">
    <div class="container">
      <div class="row g-4">
        <!-- Sidebar -->
        <aside class="col-lg-3 sidebar">
          <div class="card">
            <div class="card-body">
              <h6 class="mb-1">Administrator</h6>
              <p class="mb-0 muted-small">admin@example.com</p>
            </div>
          </div>

          <nav class="list-group mt-3">
            <a href="#" class="list-group-item list-group-item-action active">Dashboard</a>
            <a href="#" class="list-group-item list-group-item-action">Users</a>
            <a href="#" class="list-group-item list-group-item-action">Orders</a>
            <a href="#" class="list-group-item list-group-item-action">Categories</a>
            <a href="#" class="list-group-item list-group-item-action">Products</a>
            <a href="#" class="list-group-item list-group-item-action">Settings</a>
          </nav>
        </aside>

        <!-- Main content -->
        <section class="col-lg-9 main">
          <slot></slot>
        </section>
      </div>
    </div>
  </main>

  <footer class="bg-light py-3 mt-5">
    <div class="container text-center small">
      &copy; 2025 SimpleShop Admin
    </div>
  </footer>
</template>

<script setup>
import { useAuth } from '../../../stores/auth';
import { useRouter } from 'vue-router';
const auth = useAuth();
const router = useRouter();

const logout = async() =>{
  await auth.logout();
  router.push("/admin/login");

}
</script>

<style>
.admin-wrap {
  padding: 2.5rem 0;
}

.sidebar {
  min-width: 220px;
}

.stat {
  padding: 1rem;
}

.table-actions {
  min-width: 140px;
}

.muted-small {
  color: #6c757d;
  font-size: .9rem;
}

@media (max-width: 767px) {
  .sidebar {
    order: 2;
  }

  .main {
    order: 1;
  }
}
</style>