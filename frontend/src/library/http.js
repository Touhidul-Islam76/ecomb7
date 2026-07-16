// professionally the folder name should be "services" and the file name should be "axiosClient.js"


import axios from 'axios';

const http = axios.create({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    headers: {'Accept' : 'application/json'}, 
});


http.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default http;