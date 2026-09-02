import axios from "axios";
import getCookie from "./cookie";
import { endpoints } from "@/lib/endpoints";
import { toast } from "sonner";
import { API_URL } from "@/config";



const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Set CSRF token header dynamically
api.interceptors.request.use((config) => {
    const csrfToken = getCookie("csrf_token");
    if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
    }
    return config;
});

api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    async (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 401) {
                try {
                    await fetch(`${API_URL}${endpoints.auth.logout}`, {
                        method: "POST",
                        credentials: "include"
                    });
                    toast.error(response.data.message)
                    window.localStorage.clear();
                    window.location.href = "/login";
                } catch {
                    toast.error("Logout request failed");
                    return Promise.reject(response.data)
                }
            } else {
                return Promise.reject(response.data)
            }
        } else {
            return Promise.reject({
                message: "Network error try again"
            })
        }
    }
);

export default api;