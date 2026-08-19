<script setup>

import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BaseLayout from './components/layout/BaseLayout.vue';
import AdminLayout from './components/layout/admin/AdminLayout.vue';

const route = useRoute();

const isAdminLogin = computed(() => route.path === '/admin/login');
const isAdminRoute = computed(() => route.path.startsWith('/admin') && !isAdminLogin.value);
</script>

<template>

  <RouterView v-if="isAdminLogin"/>


  <AdminLayout v-else-if="isAdminRoute">
    <RouterView></RouterView>
  </AdminLayout>

  <!-- Dynamic pages will be shown here using RouterView -->
   <BaseLayout v-else>
      <RouterView></RouterView>
  </BaseLayout>

</template>
