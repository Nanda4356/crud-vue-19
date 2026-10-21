<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

const checkAuth = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const handleLogout = () => {
  // 1. Hapus token
  localStorage.removeItem('token');

  // 2. Beritahu aplikasi kalau status login berubah
  window.dispatchEvent(new Event('auth-change'));

  // 3. Arahkan kembali ke halaman login
  router.push('/login');
};

onMounted(() => {
  checkAuth(); // Cek status pas pertama kali halaman dimuat
  window.addEventListener('auth-change', checkAuth); // Dengarkan perubahan token
});

onUnmounted(() => {
  window.removeEventListener('auth-change', checkAuth); // Bersihkan event listener
});
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">HOME</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/products" class="nav-link active" aria-current="page">PRODUCTS</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/kategori" class="nav-link active" aria-current="page">KATEGORI</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
            <li>
              <button v-if="isLoggedIn" class="btn btn-success" @click="handleLogout">
                Logout
              </button>
              <router-link v-else to="/login" class="btn btn-success" aria-current="page">
                LOGIN
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!--- render router view -->
    <router-view />

  </div>
</template>
