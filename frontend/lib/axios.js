import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://backend-chat-app-three.vercel.app/api',
    withCredentials: true,
});