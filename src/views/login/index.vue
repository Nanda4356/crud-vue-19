<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Api from '../../api/index'

const router = useRouter();
const email = ref("");
const password = ref("");



const handleLogin = async () => {
    try {
        // Tembak endpoint login dengan membawa data email dan password
        const response = await Api.post('/auth/login', {
            email: email.value,
            password: password.value
        })
        // Di dalam try { ... }
        const token = response.data.data.access_token

        // Simpan token ke localStorage
        localStorage.setItem('token', token)
        window.dispatchEvent(new Event('auth-change'));

        router.push('/products');
    } catch (error) {
        console.error('Login Error:', error)
    }
}
</script>

<template>
    <div style="padding: 20px; max-width: 320px; margin: 50px auto; border: 1px solid #ccc; border-radius: 8px;">
        <h2>Login Tester</h2>

        <!-- Tampilkan pesan error di sini jika login gagal -->
        <div style="color: red; margin-bottom: 10px;">
            <!-- e.g. {{ errorMessage }} -->
        </div>

        <!-- Hubungkan event submit form ke fungsi login kamu -->
        <form @submit.prevent="">
            <div style="margin-bottom: 12px;">
                <label for="email">Email:</label><br />
                <input v-model="email" id="email" type="email" required placeholder="nandarezqy@gmail.com"
                    style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 15px;">
                <label for="password">Password:</label><br />
                <input v-model="password" id="password" type="password" required placeholder="nn12305"
                    style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <button @click="handleLogin" type="button" style="width: 100%; padding: 10px; cursor: pointer;">
                Login
            </button>
        </form>
    </div>
</template>