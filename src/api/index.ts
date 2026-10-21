//import axios
import axios, { type InternalAxiosRequestConfig } from 'axios';

const Api = axios.create({
    //set default endpoint API
    baseURL: 'http://localhost:8000/api'
});

Api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');

    // Jika token ada, sisipkan ke Header Authorization
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    },
    (error) => {
    return Promise.reject(error);
    }
);

export default Api
