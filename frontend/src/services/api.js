import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

// Public APIs
export const getServices = () => api.get('/services');
export const getFAQs = () => api.get('/faqs');
export const getGalleries = () => api.get('/galleries');

// Contact & Quote
export const submitContact = (data) => api.post('/contact', data);
export const submitQuote = (data) => api.post('/quotes', data);
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(`${API_BASE_URL}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Auth APIs - YEH ADD KIYA
export const login = (data) => api.post('/login', data);
export const register = (data) => api.post('/register', data);
export const logout = () => api.post('/logout');
export const getMe = () => api.get('/me');  // YEH LINE IMPORTANT HAI

export default api;