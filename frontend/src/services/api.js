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

// 🔥 Request Interceptor - Add token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔐 Token added to request:', config.url);
        } else {
            console.log('⚠️ No token for request:', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🔥 Response Interceptor - Handle 401 Unauthorized
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            console.log('🔴 401 Unauthorized - Token expired or invalid');
            
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Remove authorization header
            delete api.defaults.headers.common['Authorization'];
            
            // Redirect to login if not already there
            if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Public APIs
export const getServices = () => api.get('/services');
export const getFAQs = () => api.get('/faqs');
export const getGalleries = () => api.get('/galleries');

// Hero Settings APIs
export const getHeroSettings = () => api.get('/hero');
export const updateHeroSettings = (id, data) => api.put(`/admin/hero/${id}`, data);

// Process Settings APIs
export const getProcessSettings = () => api.get('/process');
export const updateProcessSettings = (id, data) => api.put(`/admin/process/${id}`, data);

// Why Choose Us APIs
export const getWhyChooseUs = () => api.get('/why-choose-us');
export const updateWhyChooseUs = (id, data) => api.put(`/admin/why-choose-us/${id}`, data);

// About Settings APIs
export const getAboutSettings = () => api.get('/about');
export const updateAboutSettings = (id, data) => api.put(`/admin/about/${id}`, data);

// 🔥 Footer Settings APIs
export const getFooterSettings = () => api.get('/footer');
export const updateFooterSettings = (id, data) => api.put(`/admin/footer/${id}`, data);

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

// Auth APIs
export const login = (data) => api.post('/login', data);
export const register = (data) => api.post('/register', data);
export const logout = () => api.post('/logout');
export const getMe = () => api.get('/me');

// Export API_BASE_URL for use in other components (like Gallery)
export { API_BASE_URL };

export default api;