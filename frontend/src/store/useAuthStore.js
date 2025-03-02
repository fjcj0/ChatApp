import { create } from 'zustand';
import { axiosInstance } from '../../lib/axios.js';
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            console.log(response.data);
            set({ authUser: response.data });
        } catch (error) {
            console.log(error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {

    }
}));